/********* Variables */
const token = localStorage.getItem("accessToken");

const loadingSection = document.getElementById("loading");
const dashboardSection = document.getElementById("dashboard");

const createShortUrlForm = document.getElementById("createShortUrlForm");
const listUrls = document.getElementById("list-urls");

// Add Event Listeners
createShortUrlForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const long_url = createShortUrlForm.long_url.value;

  try {
    const res = await fetch(BACKEND_URL + "/urls", {
      method: "POST",
      body: JSON.stringify({ long_url }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);

    alert(data.msg);

    if (data.success) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong, Please try again!");
  }
});

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

const deleteShortUrl = async (url) => {
  if (confirm("Are you sure to delete this short url?")) {
    // console.log(url.short_id);
    const { short_id } = url;

    try {
      const res = await fetch(BACKEND_URL + "/urls", {
        method: "DELETE",
        body: JSON.stringify({ short_id }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);

      alert(data.msg);

      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Please try again!");
    }
  }
};

const editShortUrl = async (_data) => {
  // console.log(_data);

  if (_data.short_id === _data.new_short_id) {
    // alert("No changes made!");
    return;
  }

  try {
    const res = await fetch(BACKEND_URL + "/urls", {
      method: "PATCH",
      body: JSON.stringify(_data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);

    alert(data.msg);

    if (data.success) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong, Please try again!");
  }
};

const setUrls = (urls = []) => {
  urls.forEach((url, index) => {
    let urlChildElement = document.createElement("tr");
    // urlChildElement.className =
    //   "d-flex align-self-start justify-content-between my-2 bg-light p-2 pb-1 rounded";

    urlChildElement.innerHTML = getUrlListChild(url, index);
    listUrls.appendChild(urlChildElement);

    let editShortUrlForm = document.getElementById(`editShortUrl${index}`);

    editShortUrlForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        short_id: url.short_id,
        new_short_id: editShortUrlForm.short_id.value.trim(),
      };
      editShortUrl(data);
    });

    let deleteBtn = document.getElementById(`delete-btn-${index}`);
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      deleteShortUrl(url);
    });
  });
};

const getUrlListChild = (url, index) =>
  `
    <td>${index + 1}</td>
    <td style="max-width:200px;">
      <a
        href="${BACKEND_URL}/${url.short_id}"
        class="text-info text-decoration-none"
        target="_blank"
        rel="noreferrer noopener"
      >
        <h6 class="m-0">${url.short_id}</h6>
      </a>
    </td>
    <td style="max-width:200px;">
      <a
        href="${url.long_url}"
        class="text-dark"
        target="_blank"
        rel="noreferrer noopener"
      >
        <p class="m-0 text-muted text-truncate">
          <small> ${url.long_url} </small>
        </p>
      </a>
    </td>
    <td>${url.visits}</td>
    <td>${new Date(url.created_date).toDateString()}</td>
    <td>${getActionButtons(url, index)}</td>
  `;

const getActionButtons = (url, index) => {
  return `
      <div class="d-flex align-items-center justify-content-between">
        <button class="btn btn-sm btn-warning"  data-bs-toggle="modal" data-bs-target="#edit-modal-${index}">
        Edit
        </button>
        <button class="btn btn-sm btn-danger" id="delete-btn-${index}">
        Delete
        </button>

        <div class="modal fade" id="edit-modal-${index}" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div class="form-group my-2">
                <label>Long URL</label>
                <textarea readonly class="form-control">${url.long_url}</textarea>
              </div>
                <form id="editShortUrl${index}">
                <div class="form-group my-2">
                  <label for="short_id"> Short ID </label>
                  <input
                    type="text"
                    name="short_id"
                    required
                    placeholder="Edit Short ID"
                    class="form-control"
                    value=${url.short_id}
                  />
                </div>
                <button type="submit" class="btn btn-sm btn-primary">
                  Update Short ID
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      </div>`;
  // <i class="fas fa-edit"></i>
  // <i class="fas fa-trash"></i>
};

// On load
window.addEventListener("load", async () => {
  // console.log("window loaded");
  // let token = localStorage.getItem("accessToken");
  // console.log(token);

  if (token) {
    const res = await fetch(BACKEND_URL + "/urls", {
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
      setUrls(data.urls);
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
