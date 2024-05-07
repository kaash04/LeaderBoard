let total = 0;

function parseCSV() {
  let csvFile = "data.csv";
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let csv = xhr.responseText;
        let lines = csv.split("\n");
        let tableHTML = "<table>";
        for (let i = 0; i < lines.length; i++) {
          if (lines[i]) {
            tableHTML += "<tr>";
            let cells = lines[i].split(",");
            for (let j = 0; j < cells.length; j++) {
              let cellData = cells[j].replace(/"/g, "");
              tableHTML += "<td>" + cellData + "</td>";
            }
            tableHTML += "</tr>";
          }
        }
        tableHTML += "</table>";
        document.getElementById("csvTable").innerHTML = tableHTML;
        loader();
      } else {
        console.error("Failed to load CSV file.");
      }
    }
  };
  xhr.open("GET", csvFile, true);
  xhr.send();
}

function searchTable() {
  let input, filter, table, tr, td, i;
  input = document.getElementById("searchInput").value.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
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

function removeColumn(colIndex) {
  let table = document.getElementById("dataTable");
  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].deleteCell(colIndex);
  }
}

function drawCircleProgress(start, percent) {
  if(start > percent){
    return;
  }
  const canvas = document.getElementById("circle-progress");
  const context = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 70;
  const startAngle = -0.5 * Math.PI;
  const endAngle = startAngle + (start / 100) * (2 * Math.PI);

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.lineWidth = 10;
  context.strokeStyle = "#ddd";
  context.stroke();

  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.lineWidth = 10;
  context.strokeStyle = "#4CAF50";
  context.stroke();

  context.font = '1.5rem Ubuntu';
  context.fillStyle = '#000';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(start + '/80', centerX, centerY);
  setTimeout(function() {
    drawCircleProgress(start+1, percent);
  }, 15);
}

function betterTable() {
  let table = document.getElementById("dataTable");
  var rows = table.getElementsByTagName("tr");

  // renames
  rows[0].getElementsByTagName("td")[5].innerHTML = "All 3 Pathways Completed";
  rows[0].getElementsByTagName("td")[6].innerHTML = "Code Redemption Status";

  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    let cellText = cells[1].textContent.trim();
    let img = document.createElement("img");
    cells[0].style.textAlign = "left";
    if (cellText === "All Good") {
      img.src = "check.png";
      img.alt = "Check";
    } else {
      img.src = "warning.png";
      img.alt = "Warn";
    }
    cells[1].innerHTML = "";
    img.style.width = "1.2rem";
    cells[1].appendChild(img);

    let forMedal = cells[5].textContent.trim();
    let img2 = document.createElement("img");
    if (forMedal === "Yes") {
      img2.src = "medal.png";
      img2.alt = "";
      img2.style.width = "1.2rem";
      img2.style.marginLeft = "0.5rem";
      cells[0].appendChild(img2);
      total++;
    }
  }
  drawCircleProgress(0, (total/80)*100);
}

function rankEntries() {
  let table = document.getElementById("dataTable");
  let rows = table.getElementsByTagName("tr");
  let header = rows[0];
  let sortedRows = [];

  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    let firstCellContent = cells[0].innerHTML.toLowerCase();
    if (firstCellContent.includes("<img")) {
      sortedRows.unshift(rows[i]);
    } else {
      sortedRows.push(rows[i]);
    }
  }

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  table.appendChild(header);
  for (let j = 0; j < sortedRows.length; j++) {
    table.appendChild(sortedRows[j]);
  }
}

function loader() {
  const header = document.getElementsByTagName("tr")[0];
  header.childNodes.forEach((d) => {
    d.style.color = "#fff";
    d.style.paddingTop = "1rem";
    d.style.paddingBottom = "1rem";
  });
  header.style.backgroundColor = "#4285F4";
  document.getElementsByTagName("table")[0].setAttribute("id", "dataTable");
  removeColumn(1);
  removeColumn(1); //skillboost url & mail remove

  // For mobiles
  betterTable();
  if (window.innerWidth < 768) {
    removeColumn(2);
    removeColumn(2);
    removeColumn(2);
    removeColumn(3);
  }
  rankEntries();
}

document.getElementById("searchInput").addEventListener("keyup", searchTable);


