
function uploadExcel() {
  const fileInput = document.getElementById('excelFile');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheetName = workbook.SheetNames[0]; // Read the first sheet
    const sheet = workbook.Sheets[sheetName];
    
    const jsonData = XLSX.utils.sheet_to_json(sheet); // Excel → JSON

    // Save to localStorage
    localStorage.setItem("excelData", JSON.stringify(jsonData));
    alert("Data saved to localStorage!");

    // Optional: Console log it
    console.log(jsonData);
  };

  reader.readAsArrayBuffer(file);
}

