const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Button submit
// In your submit event handler, show the spinner and generate the QR code
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      showScanner();

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        const saveUrl = qr.querySelector("canvas").toDataURL();
        createSaveBtn(saveUrl); // Show the "Save Image" button
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// hide  scanner
const showScanner = () => {
  const scanner = document.getElementById("qrCodeContainer");
  scanner.style.display = "block";
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.style.backgroundColor = "#EF4444"; // Background color
  link.style.color = "#ffffff"; // Text color
  link.style.fontWeight = "bold"; // Font weight
  link.style.padding = "0.75rem 1rem"; // Padding
  link.style.borderRadius = "0.375rem"; // Border radius
  link.style.width = "33.33%"; // Width
  link.style.margin = "0 auto"; // Margin
  link.style.marginTop = "1.25rem"; // Margin top
  link.style.textAlign = "center"; // Text alignment
  link.style.textDecoration = "none"; // Text decoration
  link.innerHTML = "Save Image";

  link.href = saveUrl;
  link.download = "qrcode.png";

  const generatedDiv = document.getElementById("generated");
  generatedDiv.appendChild(link);

    // Show the button
    link.style.display = "block"; // Show the button after creating it
};



hideSpinner();

form.addEventListener("submit", onGenerateSubmit);


// Show loading container
const showLoading = () => {
  document.getElementById("loading-container").style.display = "block";
};

// Hide loading container
const hideLoading = () => {
  document.getElementById("loading-container").style.display = "none";
};
