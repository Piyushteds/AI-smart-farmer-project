(function () {
  const currentPage = window.location.pathname.split(/[\/]/).pop().toLowerCase() || "index.html";
  const publicPages = ["index.html", "login.html", ""];
  const params = new URLSearchParams(window.location.search);

  function safeSet(storage, key, value) {
    try { storage.setItem(key, value); } catch (error) {}
  }

  function safeGet(storage, key) {
    try { return storage.getItem(key); } catch (error) { return null; }
  }

  function rootLink(file) {
    const path = window.location.pathname.replace(/\\/g, "/");
    const inSubFolder = /\/(Dashboard|Marketplace|Weather|Services|Loginpage|Landingpage)\//i.test(path);
    return `${inSubFolder ? "../" : ""}${file}`;
  }

  function markSessionFromPersistentLogin() {
    const loggedIn =
      safeGet(sessionStorage, "smartFarmerAccess") === "true" ||
      safeGet(sessionStorage, "smartFarmerLoggedIn") === "true" ||
      safeGet(localStorage, "smartFarmerLoggedIn") === "true";

    if (!loggedIn) return false;

    safeSet(sessionStorage, "smartFarmerAccess", "true");
    safeSet(sessionStorage, "smartFarmerLoggedIn", "true");

    const role = safeGet(localStorage, "smartFarmerRole") || safeGet(sessionStorage, "smartFarmerRole") || "farmer";
    const name = safeGet(localStorage, "smartFarmerName") || safeGet(sessionStorage, "smartFarmerName") || role;
    safeSet(sessionStorage, "smartFarmerRole", role);
    safeSet(sessionStorage, "smartFarmerName", name);
    return true;
  }

  if (params.get("login") === "success") {
    markSessionFromPersistentLogin();
    safeSet(sessionStorage, "smartFarmerAccess", "true");
    safeSet(sessionStorage, "smartFarmerLoggedIn", "true");
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname.split(/[\\/]/).pop());
    }
    return;
  }

  const hasCurrentLogin = markSessionFromPersistentLogin();

  if (!publicPages.includes(currentPage) && !hasCurrentLogin) {
    window.location.replace(rootLink("index.html"));
  }
})();
