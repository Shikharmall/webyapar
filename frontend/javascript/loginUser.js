document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const responseContainer = document.getElementById("response");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const user_id = document.getElementById("user_id").value;
    const password = document.getElementById("password").value;

    // Make a real login request to your API
    fetch("http://localhost:5174/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, password }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("user_id", user_id);
          window.location.href = "./userUpdate.html";
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        responseContainer.innerHTML = `<p>${data.message}</p>`;
      })
      .catch((error) => {
        responseContainer.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});
