# PDF Merger

A lightweight web application to add a cover or back page to one or multiple PDFs and download the results packaged as a ZIP file.

## Features

- 📁 **Drag-and-drop** or click to select multiple main PDFs
- 📄 **Drag-and-drop** or click to select a single PDF to use as a cover or back page
- 🔀 **Choose insertion position**: First Page or Last Page
- 📦 **Batch processing**: Generate a ZIP file with all processed PDFs ready to download
- ⚡ **Client-side processing**: All work happens in your browser—no uploads to external servers

## How It Works

1. Select or drag one or multiple PDFs into the **"Main PDFs"** section
2. Select or drag a PDF into the **"PDF to Insert"** section (this will be your cover/back page)
3. Choose the insertion position: **"First Page"** or **"Last Page"**
4. Click **"Merge PDFs"** and download the ZIP file with your processed PDFs

## Live Demo & Screenshots

This is a simple web interface contained in a single `index.html` file with styling in `style.css` and logic in `script.js`. Open `index.html` in a modern browser to get started.

## Dependencies

The application uses two libraries loaded via CDN:

- **[pdf-lib](https://pdf-lib.js.org/)** — JavaScript library for manipulating PDFs in the browser
- **[JSZip](https://stuk.github.io/jszip/)** — JavaScript library for creating and reading ZIP files

Both are included automatically in `index.html`.

## Installation & Local Setup

This is a static project with no build step required. To serve it locally and avoid browser file access restrictions, use a simple HTTP server:

### Using Python 3

```bash
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

### Using Node.js

```bash
npx http-server
```

### Using PHP

```bash
php -S localhost:8000
```

## Usage Tips

- **File size**: Works best with reasonably sized PDFs. Processing happens in the browser, so performance depends on available memory.
- **Batch processing**: For very large or many files, consider processing them in smaller batches.
- **Browser compatibility**: Works in modern browsers that support ES6 and the File API.

## Limitations & Notes

- **Client-side only**: All processing happens in your browser. No data is sent to external servers.
- **Performance**: Maximum file size and performance depend on your browser and available system memory.
- **PDF validation**: The app assumes uploaded files are valid PDFs. Invalid files may produce unexpected results.
- **Single cover/back page**: Currently, each batch can only use one PDF as the cover/back page across all main PDFs.

## Contributing

We welcome contributions! If you'd like to improve PDF Merger:

1. **Fork** this repository
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** and test them locally
4. **Commit with a clear message**: `git commit -m "Add feature description"`
5. **Push to your fork**: `git push origin feature/your-feature-name`
6. **Open a Pull Request** and describe your changes

### Ideas for Contributions

- Add support for inserting a page at any position (not just first/last)
- Implement compression options for the generated ZIP
- Add support for batch processing with different covers per file
- Improve error handling and user feedback
- Add keyboard shortcuts or other UX improvements
- Write unit tests
- Add multi-language support

## License

This project is open source and available under the [MIT License](LICENSE). Feel free to use it in your projects!

## Support & Feedback

If you encounter any issues or have suggestions:

- 🐛 **Report a bug**: Open an issue and describe what went wrong
- 💡 **Suggest a feature**: Open an issue with your idea and why it would be useful
- 💬 **Ask a question**: Check existing issues first, then open a new one

## About

Created with ❤️ for anyone who needs to batch-process PDFs in the browser.

---

**Happy merging!** 🚀
