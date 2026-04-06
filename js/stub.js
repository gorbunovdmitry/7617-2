/**
 * Только для stub.html (как history.replaceState в 7244 после заглушки).
 * Ключ localStorage «7617_2» — вариант 7617-2 (у 7617-1 свой ключ «7617_1»).
 * Блокирует «Назад» в рамках этой вкладки на странице заглушки.
 */
(function () {
    history.replaceState(null, '', location.href);
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', function () {
        history.pushState(null, '', location.href);
    });
})();
