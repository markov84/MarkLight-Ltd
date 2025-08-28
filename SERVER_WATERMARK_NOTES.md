# Watermark & Uploads

- All uploaded images (and images downloaded via URL) get a semi-transparent diagonal text watermark.
- Configure the watermark text with `APP_WATERMARK` in your `.env` (defaults to **MarkLight**).
- Endpoints affected:
  - `POST /api/admin/products` – create product (files `image`, `images[]`, `localImage[]` + optional `image`/`imagesUrls[]` URLs)
  - `PUT  /api/admin/products/:id` – edit product (same)
  - `POST /api/admin/watermark-preview` – quick preview for a single uploaded image (form field `image`)
- Static files served from `/uploads/`.

## Example curl

```bash
curl -X POST http://localhost:5000/api/admin/products \

  -H "Authorization: Bearer <TOKEN>" \

  -F "name=Demo" \

  -F "price=123" \

  -F "image=@/path/to/file.jpg"
```
