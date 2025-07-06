const baseUrl = "http://localhost:3000";

function loadPolls() {
  fetch(baseUrl + '/get', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  .then(res => res.json())
  .then(data => {
    const pollsDiv = document.getElementById("polls");
    data.forEach(poll => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${poll.title}</h3><p>${poll.options.join(", ")}</p>`;
      pollsDiv.appendChild(div);
    });
  });
}