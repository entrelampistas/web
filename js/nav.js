/* entrelampistas · «‹» vuelve a la pantalla anterior (history.back); sin historial, a su href */
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-volver]');
    if (!a) return;
    var mismoOrigen = document.referrer && document.referrer.indexOf(location.origin) === 0;
    if (history.length > 1 && mismoOrigen) { e.preventDefault(); history.back(); }
  });
})();
