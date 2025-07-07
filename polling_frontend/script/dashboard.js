const baseUrl = "http://localhost:3000";

function loadPolls() {
  const div = document.getElementById("polls");

  fetch(baseUrl + '/get', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        div.innerHTML = "No polls found.";
        return;
      }

      div.innerHTML = data.map(poll => {
        const isExpired = new Date() > new Date(poll.expiresAt);
        return `
          <div style="border:1px solid #ccc; padding:10px; margin:10px;">
            <strong>${poll.title}</strong><br>
            pollId: ${poll._id}<br>
            Options: ${poll.options.join(", ")}<br>
            votes: ${poll.votes.join(", ")}<br>
            Visibility: ${poll.visibility}<br>
            Expires: ${new Date(poll.expiresAt).toLocaleString()}<br>
            Status: <span style="color:${isExpired ? 'red' : 'green'}">
              ${isExpired ? 'Expired' : 'Active'}
            </span>
          </div>
        `;
      }).join("");
    })
    .catch(err => {
      console.error(err);
      div.innerHTML = "Failed to load polls.";
    });
}
