function parseCSV() {
  // Hardcoded CSV file name
  var csvFile = "data.csv";

  // Fetch the CSV file using AJAX
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var csv = xhr.responseText;
        var lines = csv.split("\n");
        var tableHTML = "<table>";
        for (var i = 0; i < lines.length; i++) {
          if (lines[i]) {
            // Check if line is not empty
            tableHTML += "<tr>";
            var cells = lines[i].split(",");
            for (var j = 0; j < cells.length; j++) {
              // Remove double inverted commas
              var cellData = cells[j].replace(/"/g, "");
              tableHTML += "<td>" + cellData + "</td>";
            }
            tableHTML += "</tr>";
          }
        }
        tableHTML += "</table>";
        document.getElementById("csvTable").innerHTML = tableHTML;
      } else {
        alert("Failed to load CSV file.");
      }
    }
  };
  xhr.open("GET", csvFile, true);
  xhr.send();
}
