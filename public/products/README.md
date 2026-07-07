Drop your product photos here, then reference them in `data/products.ts`:

```ts
{
  id: "p01",
  slug: "monstera-deliciosa-floor-tree",
  ...
  images: ["/products/monstera-deliciosa-floor-tree-1.jpg", "/products/monstera-deliciosa-floor-tree-2.jpg"],
}
```

- Recommended: square or 4:5 photos, at least 1000px on the shorter side, JPG or WEBP.
- The first image in the array is used everywhere (shop grid, cart, category tiles); extras only show as a thumbnail gallery on the product detail page.
- Products without an `images` field keep using the generated placeholder — nothing breaks if you add photos gradually.
