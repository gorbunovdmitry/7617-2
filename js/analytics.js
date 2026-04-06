/**
 * 7617: GA (gtag) + Яндекс.Метрика (reachGoal).
 * window.__7617_VARIANT__ = 1 | 2 | 3 задаётся перед подключением скрипта.
 */
(function () {
    var GA_MEASUREMENT_ID = 'G-VNG605KE2R';
    var YANDEX_METRIKA_ID = 96171108;
    var V = parseInt(window.__7617_VARIANT__, 10);
    if (isNaN(V) || V < 1) {
        V = 1;
    }

    (function () {
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
        window.gtag = gtag;
    })();

    (function (m, e, t, r, i, k, a) {
        m[i] =
            m[i] ||
            function () {
                (m[i].a = m[i].a || []).push(arguments);
            };
        m[i].l = new Date();
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    (function tryYmInit(attempts) {
        if (typeof ym === 'function') {
            ym(YANDEX_METRIKA_ID, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            });
            return;
        }
        if (attempts > 0) {
            setTimeout(function () {
                tryYmInit(attempts - 1);
            }, 50);
        }
    })(60);

    function send7617Event(eventName) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, {
                event_category: 'engagement',
                event_label: eventName
            });
        }
        if (typeof ym === 'function') {
            try {
                ym(YANDEX_METRIKA_ID, 'reachGoal', eventName);
            } catch (err) {
                console.warn('Yandex Metrika:', err);
            }
        }
    }

    window.track7617ContinueClick = function () {
        send7617Event('7617_click_continue_var' + V);
    };

    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById('activate')) {
            var pk = '7617_page_view_sess_v' + V;
            if (sessionStorage.getItem(pk) !== '1') {
                send7617Event('7617_page_view_var' + V);
                sessionStorage.setItem(pk, '1');
            }
        }
        if (document.body.classList.contains('stub-page')) {
            var ek = '7617_stub_view_sess_v' + V;
            if (sessionStorage.getItem(ek) !== '1') {
                send7617Event('7617_end_page_view_var' + V);
                sessionStorage.setItem(ek, '1');
            }
        }
    });
})();
