// Applies the saved (or system) colour theme before the page is painted, so there is no white flash.
// Loaded as a tiny blocking script from index.html. The admin area always stays light.
(function () {
  try {
    if (location.pathname.indexOf('/admin') === 0) return;
    var saved = localStorage.getItem('bp-theme');
    var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {
    /* storage blocked: keep the light theme */
  }
})();
