const mainPdfsInput = document.getElementById('main-pdfs');
const insertPdfInput = document.getElementById('insert-pdf');
const mergeButton = document.getElementById('merge-button');
const downloadLink = document.getElementById('download-link');
const dropZone = document.getElementById('drop-zone');
const fileList = document.getElementById('file-list');
const insertDropZone = document.getElementById('insert-drop-zone');
const insertFileList = document.getElementById('insert-file-list');
const helpButton = document.getElementById('help-button');
const helpModal = document.getElementById('help-modal');
const closeHelpButton = document.getElementById('close-help');

let mainPdfFiles = [];
let insertPdfFile = null;

// Help modal event listeners
helpButton.addEventListener('click', () => {
    helpModal.classList.remove('hidden');
});

closeHelpButton.addEventListener('click', () => {
    helpModal.classList.add('hidden');
});

// Close modal when clicking outside of it
helpModal.addEventListener('click', (e) => {
    if (e.target === helpModal) {
        helpModal.classList.add('hidden');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !helpModal.classList.contains('hidden')) {
        helpModal.classList.add('hidden');
    }
});

// Handle file selection from input
mainPdfsInput.addEventListener('change', () => {
    addFiles(mainPdfsInput.files);
});

insertPdfInput.addEventListener('change', () => {
    setInsertFile(insertPdfInput.files[0]);
});

// Drag and drop event listeners for main PDFs
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    addFiles(e.dataTransfer.files);
});

dropZone.addEventListener('click', () => {
    mainPdfsInput.click();
});

// Drag and drop event listeners for insert PDF
insertDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    insertDropZone.classList.add('dragover');
});

insertDropZone.addEventListener('dragleave', () => {
    insertDropZone.classList.remove('dragover');
});

insertDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    insertDropZone.classList.remove('dragover');
    setInsertFile(e.dataTransfer.files[0]);
});

insertDropZone.addEventListener('click', () => {
    insertPdfInput.click();
});

function addFiles(files) {
    for (const file of files) {
        if (file.type === 'application/pdf' && !mainPdfFiles.some(f => f.name === file.name)) {
            mainPdfFiles.push(file);
        }
    }
    renderFileList();
    checkMergeButtonVisibility();
}

function setInsertFile(file) {
    if (file.type === 'application/pdf') {
        insertPdfFile = file;
        renderInsertFileList();
        insertDropZone.style.display = 'none';
        checkMergeButtonVisibility();
    }
}

function renderFileList() {
    fileList.innerHTML = '';
    mainPdfFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <button data-index="${index}">&times;</button>
        `;
        fileList.appendChild(fileItem);
    });
}

function renderInsertFileList() {
    insertFileList.innerHTML = '';
    if (insertPdfFile) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${insertPdfFile.name}</span>
            <button data-role="remove-insert">&times;</button>
        `;
        insertFileList.appendChild(fileItem);
    }
}

fileList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.dataset.index;
        mainPdfFiles.splice(index, 1);
        renderFileList();
        checkMergeButtonVisibility();
    }
});

insertFileList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.role === 'remove-insert') {
        insertPdfFile = null;
        renderInsertFileList();
        insertDropZone.style.display = 'block';
        checkMergeButtonVisibility();
    }
});

function checkMergeButtonVisibility() {
    if (mainPdfFiles.length > 0 && insertPdfFile) {
        mergeButton.classList.remove('hidden');
    } else {
        mergeButton.classList.add('hidden');
    }
}

mergeButton.addEventListener('click', async () => {
    if (mainPdfFiles.length === 0 || !insertPdfFile) {
        alert('Please select main PDFs and a PDF to insert.');
        return;
    }

    const { PDFDocument } = PDFLib;
    const zip = new JSZip();

    const mainPdfBytesArray = await Promise.all(
        mainPdfFiles.map(file => file.arrayBuffer())
    );
    const insertPdfBytes = await insertPdfFile.arrayBuffer();

    const position = document.querySelector('input[name="position"]:checked').value;

    for (let i = 0; i < mainPdfBytesArray.length; i++) {
        const mainPdfBytes = mainPdfBytesArray[i];
        const mergedPdf = await PDFDocument.create();
        const insertPdf = await PDFDocument.load(insertPdfBytes);

        if (position === 'first') {
            const copiedPages = await mergedPdf.copyPages(insertPdf, insertPdf.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        const mainPdf = await PDFDocument.load(mainPdfBytes);
        const copiedPages = await mergedPdf.copyPages(mainPdf, mainPdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));

        if (position === 'last') {
            const insertPdfDoc = await PDFDocument.load(insertPdfBytes);
            const copiedPages = await mergedPdf.copyPages(insertPdfDoc, insertPdfDoc.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        zip.file(`${mainPdfFiles[i].name.replace('.pdf', '')}_merged.pdf`, mergedPdfBytes);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);

    downloadLink.href = url;
    downloadLink.download = 'merged_pdfs.zip';
    downloadLink.textContent = 'Download Merged PDFs (zip)';
    downloadLink.style.display = 'block';
});