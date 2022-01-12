// Variables
const updateProfileForm = document.getElementById("updateProfileForm");

const logoutBtn = document.getElementById("logoutBtn");

var LOGGED_IN_USER = null;

// Event Listeners
updateProfileForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const firstName = updateProfileForm.firstName.value;
  const lastName = updateProfileForm.lastName.value;
  const email = updateProfileForm.email.value;
  const password = updateProfileForm.password.value;
  const c_password = updateProfileForm.c_password.value;

  if (password !== c_password) {
    alert("Passwords dont match!");
    return;
  }

  console.log({ firstName, lastName, email, password });
  let token = localStorage.getItem("accessToken");

  const res = await fetch(BACKEND_URL + "/user/" + LOGGED_IN_USER.uid, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  const data = await res.json();
  console.log(data);

  alert(data.msg);
  if (data.success) {
    // localStorage.setItem("accessToken", data.token);
    window.location.reload();
  }
});

logoutBtn.addEventListener("click", (event) => {
  event.preventDefault();

  localStorage.removeItem("accessToken");
  window.location.replace("/");
});

// Functions
const setUser = (user) => {
  LOGGED_IN_USER = user;

  updateProfileForm.firstName.value = user.firstName;
  updateProfileForm.lastName.value = user.lastName;
  updateProfileForm.email.value = user.email;
  updateProfileForm.password.value = "";
  updateProfileForm.c_password.value = "";
};
