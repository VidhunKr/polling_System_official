const baseUrl = "http://localhost:3000";

function createPoll() {
  const title = document.getElementById("title").value;
  const options = [document.getElementById("option1").value, document.getElementById("option2").value];
  const visibility = document.getElementById("visibility").value;
  const duration = parseInt(document.getElementById("duration").value);
  fetch(baseUrl + "/createPoll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ title, options, visibility, duration })
  })
  .then(res => res.json())
  .then(data => {
    alert("Poll Created!");
    window.location.href = "dashboard.html";
  });
}