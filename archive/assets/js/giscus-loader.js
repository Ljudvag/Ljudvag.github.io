(function () {
  if (window.self !== window.top) {
    return;
  }

  if (document.querySelector('script[src="https://giscus.app/client.js"]')) {
    return;
  }

  function createGuestbookSection() {
    var host = document.createElement('section');
    host.id = 'guestbook';
    host.style.marginTop = '24px';

    var separatorTop = document.createElement('hr');
    host.appendChild(separatorTop);

    var heading = document.createElement('h2');
    heading.className = 'text-yellow';
    heading.textContent = 'Guestbook';
    host.appendChild(heading);

    var description = document.createElement('p');
    description.style.textAlign = 'left';
    description.textContent = 'Comments are powered by GitHub Discussions.';
    host.appendChild(description);

    var giscusScript = document.createElement('script');
    giscusScript.src = 'https://giscus.app/client.js';
    giscusScript.setAttribute('data-repo', 'Ljudvag/Ljudvag.github.io');
    giscusScript.setAttribute('data-repo-id', 'R_kgDOKTb90g');
    giscusScript.setAttribute('data-category', 'General');
    giscusScript.setAttribute('data-category-id', 'DIC_kwDOKTb90s4C3EDE');
    giscusScript.setAttribute('data-mapping', 'specific');
    giscusScript.setAttribute('data-term', 'Guestbook');
    giscusScript.setAttribute('data-strict', '0');
    giscusScript.setAttribute('data-reactions-enabled', '1');
    giscusScript.setAttribute('data-emit-metadata', '1');
    giscusScript.setAttribute('data-input-position', 'bottom');
    giscusScript.setAttribute('data-theme', window.location.origin + '/assets/css/giscus-theme.css');
    giscusScript.setAttribute('data-lang', 'en');
    giscusScript.setAttribute('crossorigin', 'anonymous');
    giscusScript.async = true;

    host.appendChild(giscusScript);

    return host;
  }

  function mountGuestbook() {
    if (document.getElementById('guestbook')) {
      return;
    }

    var target = document.querySelector('.content-box') || document.body;
    target.appendChild(createGuestbookSection());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountGuestbook);
  } else {
    mountGuestbook();
  }
})();
