function parseCSV() {
  var csvFile = "data.csv";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var csv = xhr.responseText;
        var lines = csv.split("\n");
        var tableHTML = "<table>";
        for (var i = 0; i < lines.length; i++) {
          if (lines[i]) {
            tableHTML += "<tr>";
            var cells = lines[i].split(",");
            for (var j = 0; j < cells.length; j++) {
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

function searchTable() {
  document.getElementsByTagName("table")[0].setAttribute("id", "dataTable");
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput").value.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.textContent.toUpperCase().indexOf(input) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
document.getElementById("searchInput").addEventListener("keyup", searchTable);
