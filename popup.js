function getCookies(callback) {
  chrome.cookies.getAll({ url: "https://www.facebook.com" }, function (cookies) {
    const cookieString = cookies.map((c) => `${c.name}=${c.value}`).join("; ");
    callback(cookieString);
  });
}

function convert(ck) {
  const validItems = ["sb", "datr", "c_user", "xs"];
  const now = new Date().getTime();

  const cookies = ck
    .split("; ")
    .filter((data) => {
      const cookieParts = data.split("=");
      return validItems.includes(cookieParts[0]);
    })
    .map((cookie) => ({
      key: cookie.split("=")[0],
      value: cookie.split("=")[1],
      domain: "facebook.com",
      path: "/",
      creation: now,
      lastAccessed: now,
    }));

  return cookies;
}

function updateCookies() {
  getCookies((cookieString) => {
    document.querySelector("#cookies").innerHTML = cookieString ? cookieString : "You Haven't Logged In to Facebook!";
    const fbstate = convert(cookieString);
    document.querySelector("#fbstate").innerHTML = JSON.stringify(fbstate, null, 2);
  });
}

function refreshAppState() {
  updateCookies();
}

function copyTextToClipboard(text, type) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  Swal.fire({
    title: 'Copied!',
    text: `${type} copied to clipboard.`,
    icon: 'success',
    showConfirmButton: false,
    timer: 1500,
  });
}

function copyCookiesToClipboard() {
  const cookiesText = document.querySelector("#cookies").textContent;
  copyTextToClipboard(cookiesText, "Cookies");
}

function copyFBStateToClipboard() {
  const fbstateText = document.querySelector("#fbstate").textContent;
  copyTextToClipboard(fbstateText, "FBState");
}

function downloadJSONFile() {
  const jsonText = document.querySelector("#fbstate").textContent;
  const blob = new Blob([jsonText], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `fbstate_${Math.random()}.json`;
  a.click();
  URL.revokeObjectURL(url);

  Swal.fire({
    title: 'Download Started',
    text: 'Your FBState file is being downloaded.',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500,
  });
}

document.querySelector("#download-button").addEventListener("click", downloadJSONFile);
document.querySelector("#copy-cookies-button").addEventListener("click", copyCookiesToClipboard);
document.querySelector("#copy-fbstate-button").addEventListener("click", copyFBStateToClipboard);
document.querySelector("#export-button").addEventListener("click", refreshAppState);
updateCookies();