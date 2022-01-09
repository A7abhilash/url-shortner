/********* Variables */
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loadingSection = document.getElementById("loading");
const authSection = document.getElementById("auth");

// Add Event Listeners
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  console.log({ email, password });
  const res = await fetch(BACKEND_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  console.log(data);

  alert(data.msg);
  if (data.success) {
    localStorage.setItem("accessToken", data.token);
    setAuthenticated(true);
    // window.location.replace("/dashboard.html");
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = registerForm.firstName.value;
  const lastName = registerForm.lastName.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;
  const c_password = registerForm.c_password.value;

  if (password !== c_password) {
    alert("Passwords dont match!");
    return;
  }

  console.log({ firstName, lastName, email, password });
  const res = await fetch(BACKEND_URL + "/register", {
    method: "POST",
    headers: {
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

/***********Functions */
const setLoading = (isLoading) => {
  if (isLoading) {
    loadingSection.hidden = false;
    authSection.hidden = true;
  } else {
    loadingSection.hidden = true;
    authSection.hidden = false;
  }
};

// On load
window.addEventListener("load", () => {
  // console.log("window loaded");
  let token = localStorage.getItem("accessToken");

  if (token) {
    setAuthenticated(true);
  }
  setTimeout(() => {
    setLoading(false);
  }, 500);
});
