import { neon } from "@neondatabase/serverless";

export type OrderStatus =
  | "new"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cod" | "jazzcash_easypaisa";

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  notes: string | null;
  items: OrderItem[];
  subtotal: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentReference: string | null;
}

export interface NewOrder {
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
}

function getConnectionString(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING;
  if (!url) {
    throw new Error(
      "No database connection string found. Set DATABASE_URL (or link Vercel Postgres) to enable order storage."
    );
  }
  return url;
}

function sql() {
  return neon(getConnectionString());
}

let schemaReady: Promise<void> | null = null;

async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const db = sql();
    schemaReady = (async () => {
      await db`
        CREATE TABLE IF NOT EXISTS orders (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          created_at timestamptz NOT NULL DEFAULT now(),
          customer_name text NOT NULL,
          phone text NOT NULL,
          address text NOT NULL,
          notes text,
          items jsonb NOT NULL,
          subtotal numeric NOT NULL,
          status text NOT NULL DEFAULT 'new'
        )
      `;
      // Added after the initial release — safe to re-run on an existing table.
      await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'cod'`;
      await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_reference text`;
      await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number serial`;
      await db`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'orders_order_number_key'
          ) THEN
            ALTER TABLE orders ADD CONSTRAINT orders_order_number_key UNIQUE (order_number);
          END IF;
        END $$;
      `;
    })();
  }
  return schemaReady;
}

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    orderNumber: Number(row.order_number),
    createdAt: (row.created_at as Date).toString(),
    customerName: row.customer_name as string,
    phone: row.phone as string,
    address: row.address as string,
    notes: (row.notes as string | null) ?? null,
    items: row.items as OrderItem[],
    subtotal: Number(row.subtotal),
    status: row.status as OrderStatus,
    paymentMethod: row.payment_method as PaymentMethod,
    paymentReference: (row.payment_reference as string | null) ?? null,
  };
}

export async function insertOrder(
  order: NewOrder
): Promise<{ id: string; orderNumber: number }> {
  await ensureSchema();
  const db = sql();
  const rows = await db`
    INSERT INTO orders (customer_name, phone, address, notes, items, subtotal, payment_method, payment_reference)
    VALUES (
      ${order.customerName},
      ${order.phone},
      ${order.address},
      ${order.notes ?? null},
      ${JSON.stringify(order.items)}::jsonb,
      ${order.subtotal},
      ${order.paymentMethod},
      ${order.paymentReference ?? null}
    )
    RETURNING id, order_number
  `;
  return {
    id: rows[0].id as string,
    orderNumber: Number(rows[0].order_number),
  };
}

export async function findOrdersForCustomer(
  phone: string,
  orderNumber?: number
): Promise<Order[]> {
  await ensureSchema();
  const digits = phone.replace(/\D/g, "");
  if (!digits) return [];
  const db = sql();
  const rows = orderNumber
    ? await db`
        SELECT * FROM orders
        WHERE regexp_replace(phone, '\D', '', 'g') = ${digits}
        AND order_number = ${orderNumber}
        ORDER BY created_at DESC
      `
    : await db`
        SELECT * FROM orders
        WHERE regexp_replace(phone, '\D', '', 'g') = ${digits}
        ORDER BY created_at DESC
      `;
  return rows.map(rowToOrder);
}

export async function listOrders(): Promise<Order[]> {
  await ensureSchema();
  const db = sql();
  const rows = await db`SELECT * FROM orders ORDER BY created_at DESC`;
  return rows.map(rowToOrder);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<void> {
  await ensureSchema();
  const db = sql();
  await db`UPDATE orders SET status = ${status} WHERE id = ${id}`;
}
