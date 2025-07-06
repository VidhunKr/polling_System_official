const baseUrl = "http://localhost:3000";

function votePoll() {
  const pollId = document.getElementById("pollId").value;
  const index = document.getElementById("optionIndex").value;
  fetch(baseUrl + `/${pollId}/vote/${index}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  .then(res => res.json())
  .then(data => {
    alert("Voted Successfully!");
    window.location.href = "dashboard.html";
  });
}