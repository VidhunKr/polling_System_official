const baseUrl = "http://localhost:3000";

function createPoll() {
  const title = document.getElementById("title").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;
  const visibility = document.getElementById("visibility").value;
  const duration = parseInt(document.getElementById("duration").value);
  const userAllowed = [];

  const options = [option1, option2].filter(Boolean);

  fetch(baseUrl + "/createPoll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ title, options, visibility, userAllowed, duration })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => { throw new Error(data.msg); });
      }
      return res.json();
    })
    .then(data => {
      alert("Poll Created!");
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      console.error("Create Poll Error:", err.message);
      alert("Poll creation failed: " + err.message);
    });
}
