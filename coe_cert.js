/* ===============================
   PDF RENDERING
   =============================== */

const pdfUrl = "coe_cert.pdf"; // <-- CHANGE IF NEEDED

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const container = document.getElementById("pdf-container");

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  for (let i = 1; i <= pdf.numPages; i++) {
    pdf.getPage(i).then(page => {
      const viewport = page.getViewport({ scale: 1.5 });

      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.width = "90%";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      wrapper.appendChild(canvas);

      /* WATERMARK */
      const wm = document.createElement("div");
      wm.className = "watermark";
      wm.style.top = "40%";
      wm.style.left = "20%";
      wm.textContent = "PROTECTED CONTENT";
      wrapper.appendChild(wm);

      container.appendChild(wrapper);

      page.render({
        canvasContext: ctx,
        viewport
      });
    });
  }
});

/* ===============================
   🔒 PROTECTION FEATURES
   =============================== */

document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());

document.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();

  if ((e.ctrlKey || e.metaKey) && ["p", "s", "u"].includes(key)) {
    e.preventDefault();
    alert("This action is disabled.");
  }

  if (e.key === "F12") {
    e.preventDefault();
  }
});

/* Anti-screenshot overlay */
window.addEventListener("blur", () => {
  document.getElementById("antisnap").style.display = "block";
});

window.addEventListener("focus", () => {
  document.getElementById("antisnap").style.display = "none";
});

/* Block print programmatically */
window.print = function () {
  alert("Printing is disabled.");
};
