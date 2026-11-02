# Angular Mini Apps

Small single-purpose Angular apps, one per folder.

## Apps

| Folder | What it does | Stack |
|---|---|---|
| photo to pdf converter/image-converter | Pick an image, fit it centred on an A4 page, download as PDF with a custom file name | Angular 21, jsPDF, Less |

## Run

```bash
cd "photo to pdf converter/image-converter"
npm install
npm start
```

## Notes

Image is scaled to fit A4 (210 x 297 mm) keeping aspect ratio:

```ts
const ratio = Math.min(210 / img.width, 297 / img.height);
const w = img.width * ratio, h = img.height * ratio;
doc.addImage(src, 'PNG', (210 - w) / 2, (297 - h) / 2, w, h);
```

## TODO

- Remove commented v1 code and console.logs
- Rename folder to `photo-to-pdf` (no spaces)
