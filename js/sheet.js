/**
 * Отправка ответов в Google Sheets через Apps Script (JSONP).
 * URL задаётся константой GOOGLE_SHEET_URL.
 */
const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbymhxbPEAgjj1lO9f8RC5Y9ia05l5WLbkU6RBV8SLZBHk50TeYWulGYpRD33Ci8hdc/exec';

function sendToSheetJSONP(payload) {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_cb_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');

    function cleanup() {
      try {
        delete window[callbackName];
      } catch (e) {}
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = (resp) => {
      cleanup();
      if (resp && resp.success) resolve(resp);
      else reject(resp);
    };

    const params = new URLSearchParams({
      callback: callbackName,
      data: JSON.stringify(payload),
    });

    script.src = `${GOOGLE_SHEET_URL}?${params.toString()}`;
    script.onerror = () => {
      cleanup();
      reject(new Error('JSONP load error'));
    };

    document.head.appendChild(script);
  });
}

