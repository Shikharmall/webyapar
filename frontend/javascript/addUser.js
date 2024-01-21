document.getElementById('addDataForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const user_id = document.getElementById("user_id").value;
    const password = document.getElementById("password").value;

    // Make a POST request to your server
    fetch('http://localhost:5174/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, password }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      location.reload();
    })
    .catch(error => {
      console.error(error);
      alert('Failed to add data.');
    });
  });