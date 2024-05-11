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
  let input, table, tr, td, i;
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
  if (start > percent) {
    return;
  }
  const canvas = document.getElementById("circle-progress");
  const context = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 70;
  const startAngle = -0.5 * Math.PI;
  const endAngle = startAngle + (start / 80) * (2 * Math.PI);
  let color;

  if (start <= 30) {
    color = interpolateColor("#FFA500", "#FFFF00", start / 30);
  } else if (start <= 60) {
    color = interpolateColor("#FFFF00", "#46e346", (start - 30) / 30);
  } else {
    color = interpolateColor("#46e346", "#32CD32", (start - 60) / 20);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.lineWidth = 10;
  context.strokeStyle = "#ddd";
  context.stroke();

  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.lineWidth = 10;
  context.strokeStyle = color;
  context.stroke();

  if (start == 80) {
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, 2 * Math.PI);
    context.lineWidth = 10;
    context.strokeStyle = "#32CD32";
    context.stroke();

    context.font = "1.5rem Ubuntu";
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(percent, centerX, centerY);
    return;
  }
  context.font = "1.5rem Ubuntu";
  context.fillStyle = "#000";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(start, centerX, centerY);
  setTimeout(function () {
    drawCircleProgress(start + 1, percent);
  }, 15);
}

function interpolateColor(color1, color2, ratio) {
  color1 = color1.replace("#", "");
  color2 = color2.replace("#", "");

  var r = Math.round(
    parseInt(color1.substring(0, 2), 16) * (1 - ratio) +
      parseInt(color2.substring(0, 2), 16) * ratio
  );
  var g = Math.round(
    parseInt(color1.substring(2, 4), 16) * (1 - ratio) +
      parseInt(color2.substring(2, 4), 16) * ratio
  );
  var b = Math.round(
    parseInt(color1.substring(4, 6), 16) * (1 - ratio) +
      parseInt(color2.substring(4, 6), 16) * ratio
  );

  r = r.toString(16).length == 1 ? "0" + r.toString(16) : r.toString(16);
  g = g.toString(16).length == 1 ? "0" + g.toString(16) : g.toString(16);
  b = b.toString(16).length == 1 ? "0" + b.toString(16) : b.toString(16);

  return "#" + r + g + b;
}

async function getLastCommitDateTime() {
  const response = await fetch(
    `https://api.github.com/repos/kaash04/LeaderBoard/commits`
  );
  const commits = await response.json();
  if (commits && commits.length > 0) {
    const lastCommitDateTime = new Date(commits[0].commit.author.date);
    const currentTime = new Date();
    const timeDifference = currentTime - lastCommitDateTime;
    const hoursAgo = Math.round(timeDifference / (1000 * 60 * 60));
    return hoursAgo;
  } else {
    console.error("Error Fetching Time of Last Commit");
  }
}

function betterTable() {
  let table = document.getElementById("dataTable");
  var rows = table.getElementsByTagName("tr");

  // renames
  rows[0].getElementsByTagName("td")[5].innerHTML = "Pathways Completed";
  rows[0].getElementsByTagName("td")[6].innerHTML = "Code Redemption Status";

  let str = ['Shreyas S. Deshmukh', 'Vishal Maurya', 'Prajakta Prakash Jagdale', 'Vednarayan Sharad Hiralkar', 'ABHISHEK SACHIN KAPSE', 'Shreya Bhanudas Kakad', 'Tejas krushna parkhe', 'Harshada Bapu Giri', 'Syeda Saima Fatima', 'Darshana Kalya Dauda', 'Prem Vilas Zade', 'Prathamesh Shankar Pathade', 'Antara Yogesh Muley', 'Ajinkya Jitendra Nikumbh', 'Om Vilas jumde', 'Sakshi Rohidas Aglave', 'Pranali Vilas Kathar', 'Samit Gokul Chavhan', 'Tilak Ravikiran Varma', 'Pradeepta Kar', 'Sulabh Ambule', 'Harshad Sunil Shirsath', 'Gangaprasad Nagnath Urekar', 'Uday Sanjay Wagh', 'Abdullah Ahmed Siddiqui', 'Razvi Syed Sulaim', 'Kartik Labhshetwar', 'Gunjan Tembhare', 'Aditya Ravi Dhanure', 'Shreyash Bendke', 'Tushar Gakhare', 'Artika Chouhan', 'Apurva Dane', 'Maheshwari Chandankar', 'Shalini Rajendra Katore', 'Pooja Bodkhe', 'Mrunali Khairkar', 'Sneha Vaidya', 'Bhagyashri ingle', 'Minal Sanjay Saindane', 'Shreyash Sanjay Janbandhu', 'Shravani Ravindra Pathak', 'Vedant Gavhale', 'Akash Shinde', 'Priyanka Pramod Gangurde', 'Diksha amol sugandhi', 'Dimpal Vilas Barhate', 'Amol Sainath Padamwar', 'Samruddhi Nikhade', 'Vishal Rahangdale', 'Chinmay Gopal Paturkar', 'Viraj Wakle', 'Unik Chaudhari', 'Manish Mahanand Wakade', 'Anshul Umesh Meshram', 'Riddhi Vernekar', 'Riya Gobade', 'Aryan Shastri', 'Pratik Wayal', 'Nikita Ganesh Walake', 'Kanhopatra Krishna Kendre', 'Manashri Kukade', 'Teena Ratnghosh Lohakare', 'Krushnal Dipak Warke', 'Bhumika Kashinath Pandhare', 'Abhilasha Ravindra Aher', 'Mayur Ganesh Chaudhari', 'Samiksha Aher', 'Rugved Chandekar', 'Vaishnavi Rajendra Kakade', 'Upasana Avinash Pargaonkar', 'Sumit Nitesh Makariye', 'Shivam Singh', 'Tushar Mukherjee', 'Ayush Manohar Gajbhiye', 'Pawan Gajanan Gote', 'Mohit vitthal Mane', 'Kaivlya Vinod Khaire', 'Dnyaneshwar Manohar Jadhav', 'Vedant Rajesh Zade'];
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

    let score = parseInt(cells[5].innerText.charAt(0));
    let img2 = document.createElement("img");
    if (score === 3) {
      if(str.includes(cells[0].innerText)){
        img2.src = "medal.png";
        img2.style.width = "1.3rem";
      }
      else{
        img2.src = "silver.png";
        img2.style.width = "1.7rem";
      }
      img2.alt = "";
      img2.style.marginLeft = "0.5rem";
      cells[0].appendChild(img2);
      total++;
    }
  }
  drawCircleProgress(0, total);
}

function rankEntries() {
  let table = document.getElementById("dataTable");
  let rows = table.getElementsByTagName("tr");
  let header = rows[0];
  let sortedRows = [];

  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    let score =
      parseInt(cells[2].innerHTML) +
      parseInt(cells[3].innerHTML) +
      parseInt(cells[4].innerHTML);
    cells[5].innerHTML = score + " / 3";
    sortedRows.push({ score: score, row: rows[i] });
  }

  sortedRows.sort((a, b) => b.score - a.score);

  table.innerHTML = "";
  table.appendChild(header);
  for (let j = 0; j < sortedRows.length; j++) {
    table.appendChild(sortedRows[j].row);
  }
}

function loader() {
  const log = document.getElementById("log");
  getLastCommitDateTime()
    .then((hours) => (log.innerText = "Last Updated: " + hours + " hours ago"))
    .catch((error) => console.error("Error:", error.message));
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
  rankEntries();
  // For mobiles
  betterTable();
  if (window.innerWidth < 768) {
    removeColumn(2);
    removeColumn(2);
    removeColumn(2);
    removeColumn(3);
    removeColumn(1);
  }
}

document.getElementById("searchInput").addEventListener("keyup", searchTable);
