const pdfUrl = "pds_2025.pdf"; // <-- CHANGE TO YOUR PDF FILE

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const container = document.getElementById("pdf-container");

// Load the PDF
pdfjsLib.getDocument(pdfUrl).promise
  .then(pdf => {
    console.log(`PDF loaded with ${pdf.numPages} pages.`);

    // Render each page
    for (let i = 1; i <= pdf.numPages; i++) {
      pdf.getPage(i).then(page => {
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        container.appendChild(canvas);

        page.render({
          canvasContext: context,
          viewport: viewport
        });
      });
    }
  })
  .catch(error => {
    console.error("Error loading PDF:", error);
    container.innerHTML = `
      <p style="color:red;">
        Failed to load PDF: ${error.message}
      </p>
    `;
  });
