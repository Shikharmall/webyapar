

document.addEventListener("DOMContentLoaded", function () {
  const userListElement = document.getElementById("userList");

  // Fetch user details from the server
  fetch("http://localhost:5174/getAllUserDetails")
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the response body as JSON
    })
    .then((users) => {
      console.log("Parsed JSON:", users);
      if (Array.isArray(users)) {
        const userListElement = document.getElementById("userList"); // Assuming you have a container element with the id 'userList'
        const lastTwoUsers = users.slice(-2);

        lastTwoUsers.forEach((user) => {
          // Create the outer div element
          const outerDiv = document.createElement("div");
          outerDiv.classList.add("form-outline", "m-4", "w-100");
          outerDiv.style.backgroundColor = "#cce5ff";

          // Create the inner div element with class 'col-sm-10' and 'w-100'
          const innerDiv = document.createElement("div");
          innerDiv.classList.add("col-sm-10", "w-100");

          // Create the input element
          const inputElement = document.createElement("input");
          inputElement.type = "text";
          inputElement.classList.add("form-control");
          inputElement.placeholder = "User ID";
          inputElement.id = "user_id";
          inputElement.name = "user_id";
          inputElement.value = user.user_id;

          // Append the input element to the inner div
          innerDiv.appendChild(inputElement);

          // Append the inner div to the outer div
          outerDiv.appendChild(innerDiv);

          // Append the outer div to the userListElement
          userListElement.appendChild(outerDiv);
        });
      } else {
        throw new Error("Invalid response format. Expected an array.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
});
