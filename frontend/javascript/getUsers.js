

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
        // Get the last two users
        const lastTwoUsers = users.slice(-2);

        lastTwoUsers.forEach((user, index) => {
          // Create the outer div element
          const outerDiv = document.createElement("div");
          outerDiv.style.backgroundColor = "#EAECFF";
          outerDiv.style.borderRadius = "5px";
          outerDiv.style.padding = "15px";
          outerDiv.style.position = "relative";

          // Create the absolute position div
          const absoluteDiv = document.createElement("div");
          absoluteDiv.style.position = "absolute";
          absoluteDiv.style.right = "0";
          absoluteDiv.style.top = "0";
          absoluteDiv.style.padding = "5px";

          // Create the number indicator div
          const numberDiv = document.createElement("div");
          numberDiv.classList.add("d-flex", "justify-content-center", "align-items-center");
          numberDiv.style.backgroundColor = "#0500FF";
          numberDiv.style.color = "#ffffff";
          numberDiv.style.borderRadius = "50%";
          numberDiv.style.padding = "15px";
          numberDiv.style.width = "10px";
          numberDiv.style.height = "10px";
          outerDiv.classList.add("m-3");
          numberDiv.innerText = index + 1;

          // Append the number indicator div to the absolute position div
          absoluteDiv.appendChild(numberDiv);

          // Append the absolute position div to the outer div
          outerDiv.appendChild(absoluteDiv);

          // Create the inner div element
          const innerDiv = document.createElement("div");
          innerDiv.classList.add("d-flex", "justify-content-center", "align-items-center");

          // Create the input element
          const inputElement = document.createElement("input");
          inputElement.type = "text";
          inputElement.style.border = "none";
          inputElement.style.borderRadius = "3px";
          inputElement.style.margin = "6%";
          inputElement.style.padding = "2%";
          inputElement.style.width = "70%";
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
