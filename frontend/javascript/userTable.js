document.addEventListener('DOMContentLoaded', fetchData);

                function deleteUser(id) {
                    fetch(`http://localhost:5174/deleteUser?user_id=${id}`, {
                        method: 'DELETE',
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            location.reload();
                        })
                        .catch(error => {
                            console.error(error);
                            alert('Failed to send DELETE request.');
                        });
                }

                function verifyUser(id) {
                    fetch(`http://localhost:5174/verifyUser?user_id=${id}`, {
                        method: 'PATCH',
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            location.reload();
                        })
                        .catch(error => {
                            console.error(error);
                            alert('Failed to send PATCH request.');
                        });
                }

                function fetchData() {
                    fetch('http://localhost:5174/getAllUserDetails')
                        .then(response => response.json())
                        .then(data => {
                            const tableBody = document.querySelector('#dataTable tbody');

                            data.forEach(user => {

                                const topicsContent =
                                    user.image === "N/A"
                                        ? `<img src="./image/profile.png" alt="profile-pic""
      style="width: 50px; height: 50px;"`
                                        : `<img src="../../backend/uploads/${user.image}" alt="profile-pic"
      style="width: 50px; height: 50px;"`;

                                const actionContent =
                                    user.isVerified === true
                                        ? `
                                        <button style="background-color: #ffffff; color: #0500FF; border: 2px solid #0500FF; border-radius: 4px; padding: 10px; padding-right: 20px; padding-left: 20px; margin: 5px" onclick="deleteUser(${user.user_id})">Delete</button>`
                                        : `
                <button style="background-color: #0500FF; color: #ffffff; border: 2px solid #0500FF; border-radius: 4px; padding: 10px; padding-right: 20px; padding-left: 20px; margin: 5px" onclick="verifyUser(${user.user_id})" >Done</button>
                <button style="background-color: #ffffff; color: #0500FF; border: 2px solid #0500FF; border-radius: 4px; padding: 10px; padding-right: 20px; padding-left: 20px; margin: 5px" onclick="deleteUser(${user.user_id})">Delete</button>`;
                                const row = document.createElement('tr');
                                row.innerHTML = `
              <td style=" border: 2px solid #363636;">
                <div class="d-flex justify-content-center align-items-center w-100 h-100"> ${user.user_id} </div> </td>
              <td style=" border: 2px solid #363636;">
                <div class="d-flex justify-content-center align-items-center w-100 h-100"> ${user.name} </div> </td>
              <td style=" border: 2px solid #363636;">
                <div class="d-flex justify-content-center align-items-center">
                    ${topicsContent}
                </div>
                </td>
              <td style=" border: 2px solid #363636;">
                <div class="d-flex justify-content-center align-items-center w-100 h-100">
                ${actionContent}
                </div>
              </td>
            `;
                                tableBody.appendChild(row);
                            });
                        })
                        .catch(error => console.error('Error fetching data:', error));
                }