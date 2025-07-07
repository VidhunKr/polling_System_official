  const baseUrl = "http://localhost:3000";

    function getUserRole() {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }

    function loadPolls() {
      fetch(baseUrl + '/get', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => res.json())
      .then(data => {
        const div = document.getElementById("polls");
        if (!Array.isArray(data)) {
          div.innerHTML = "No polls found.";
          return;
        }

        const role = getUserRole();

        div.innerHTML = data.map(poll => {
          const isExpired = new Date(poll.expiresAt) < new Date();
          let controls = "";

          if (role === "admin") {
            controls += `
              <button onclick="editPoll('${poll._id}')">Edit</button>
              <button onclick="deletePoll('${poll._id}')">Delete</button>
            `;
          } else if (role === "user" && !isExpired) {
            controls += `
              <input placeholder="Option Index (0,1...)" id="index-${poll._id}" />
              <button onclick="votePoll('${poll._id}')">Vote</button>
            `;
          }

          return `
            <div style="border:1px solid #aaa; padding:10px; margin:10px;">
              <strong>${poll.title}</strong><br>
              <b>ID:</b> ${poll._id}<br>
              Options: ${poll.options.join(", ")}<br>
              Visibility: ${poll.visibility}<br>
              Votes: ${poll.votes.join(", ")}<br>
              Expires: ${new Date(poll.expiresAt).toLocaleString()}<br>
              ${controls}
            </div>
          `;
        }).join("");
      })
      .catch(err => {
        console.error(err);
        document.getElementById("polls").innerHTML = "Failed to load polls.";
      });
    }

    function editPoll(id) {
      const newTitle = prompt("Enter new title:");
      if (!newTitle) return;
      fetch(`${baseUrl}/editPoll/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title: newTitle })
      })
      .then(res => res.json())
      .then(data => {
        alert(data.msg || "Poll updated");
        loadPolls();
      });
    }

    function deletePoll(id) {
      if (!confirm("Are you sure to delete this poll?")) return;
      fetch(`${baseUrl}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => res.json())
      .then(data => {
        alert(data.msg || "Poll deleted");
        loadPolls();
      });
    }

    function votePoll(id) {
      const index = document.getElementById(`index-${id}`).value;
      if (index === "") return alert("Please enter option index");

      fetch(`${baseUrl}/${id}/vote/${index}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => res.json())
      .then(data => {
        alert("Voted successfully!");
        loadPolls();
      });
    }

    function logout() {
      localStorage.removeItem("token");
      alert("Logged out");
      window.location.href = "login.html";
    }