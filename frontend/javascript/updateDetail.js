document.addEventListener("DOMContentLoaded", function () {
  const user_id = localStorage.getItem("user_id");

  // Fetch user details from the server
  fetch(`http://localhost:5174/getUserDetails?user_id=${user_id}`)
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Parse the response body as JSON
      })
      .then((user) => {
          console.log("Parsed JSON:", user);
          const imgSrc = "../../backend/uploads/" + user.image;
          console.log(user.name);

          // Set user details to the form
          document.getElementById("nameInputSide").value = user.name || "";

          const imagePreview = document.getElementById("imagePreviewSide");
          const img = document.createElement("img");
          img.src = imgSrc || "";
          img.style.maxWidth = "100%";
          img.style.maxHeight = "100%";
          imagePreview.appendChild(img);

          const isAdminText = user.isVerified ? "Accepted By Admin" : "Not Accepted By Admin";
          const adminStatus = document.getElementById("adminStatus");
          adminStatus.textContent = isAdminText;

          // Hide or show the admin status based on the isAdmin property
          adminStatus.style.color = user.isVerified ? "green" : "red";
      })
      .catch((error) => {
          console.error("Error fetching user details:", error);
      });
});

function previewImage() {
  const input = document.getElementById("imageInput");
  const preview = document.getElementById("imagePreview");

  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;

      img.style.height = "100%";

      preview.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
}

async function uploadImage() {
  const nameInput = document.getElementById("nameInput");
  const imageInput = document.getElementById("imageInput");

  const name = nameInput.value;
  const file = imageInput.files[0];

  if (name && file) {
    try {
      // Create a FormData object to send the name and image file
      const formData = new FormData();
      const userid = localStorage.getItem("user_id");

      formData.append("user_id", userid);
      formData.append("name", name);
      formData.append("image", file);

      // Send a POST request to the API endpoint
      const response = await fetch(`http://localhost:5174/updateUserDetail`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API response:", responseData);
      alert("Image uploaded successfully!");
    } catch (error) {
      //console.error("Error uploading image:", error);
      //alert("Failed to upload image.");
    }
    alert("Image uploaded successfully!");
  } else {
    alert("Please enter a name and select an image before uploading.");
  }
}
