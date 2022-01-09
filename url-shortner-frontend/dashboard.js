/********* Variables */
const loadingSection = document.getElementById("loading");
const dashboardSection = document.getElementById("dashboard");

// Add Event Listeners

/***********Functions */
const setLoading = (isLoading) => {
  if (isLoading) {
    loadingSection.hidden = false;
    dashboardSection.hidden = true;
  } else {
    loadingSection.hidden = true;
    dashboardSection.hidden = false;
  }
};

// On load
window.addEventListener("load", async () => {
  // console.log("window loaded");
  let token = localStorage.getItem("accessToken");
  // console.log(token);

  if (token) {
    const res = await fetch(BACKEND_URL + "/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (data.success) {
      setUser(data.user);
      setLoading(false);
    } else {
      localStorage.removeItem("accessToken");
      // window.location.replace("/");
      alert(data.msg);
      setAuthenticated(false);
    }
  } else {
    // window.location.replace("/");
    setAuthenticated(false);
    // setTimeout(() => {
    // }, 1500);
  }
});
