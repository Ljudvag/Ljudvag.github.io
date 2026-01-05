// Site-wide navigation menu
function loadMenu() {
    // Check if we're in a subdirectory
    const path = window.location.pathname;
    const isSubpage = path.includes('/music/') || path.includes('/miniatures/') || 
                      path.includes('/five-leagues-campaign/') || path.includes('/oskars-pixel-art/') ||
                      path.includes('/external-links/') || path.includes('/blog/') || path.includes('/dk3k/');
    const prefix = isSubpage ? '../' : '';
    
    const menuHTML = `
        <nav class="menu-bar">
            <ul>
                <li><a href="${prefix}index.html">Home</a></li>
                <li><a href="${prefix}music/index.html">Music</a></li>
                <li><a href="${prefix}miniatures/index.html">Minis</a></li>
                <li><a href="${prefix}dk3k/index.html">DÖTTSKRIEG 3000</a></li>
                <li><a href="${prefix}five-leagues-campaign/index.html">Five Leagues</a></li>
                <li><a href="${prefix}oskars-pixel-art/index.html">Oskars Pixel-art</a></li>

                <li><a href="${prefix}external-links/index.html">External Links</a></li>
            </ul>
        </nav>
    `;
    
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        menuContainer.innerHTML = menuHTML;
    }
}

// Load menu when page loads
document.addEventListener('DOMContentLoaded', loadMenu);
