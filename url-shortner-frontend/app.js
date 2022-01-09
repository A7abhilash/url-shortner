// Variables
const BACKEND_URL = "http://localhost:5000";

// Functions
const setAuthenticated = (isAuthenticated) => {
  if (isAuthenticated) {
    window.location.replace("/dashboard.html");
  } else {
    window.location.replace("/");
  }
};
