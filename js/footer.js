// footer.js
// Depends on config.js – load config.js first in your HTML

function injectFooter() {
    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer>
                ${CONFIG.clinicName} – Common sense care for every paw.<br>
                This article is for informational purposes. Always consult your vet for medical advice.<br>
                <a href="${CONFIG.reviewUrl}" target="_blank">📍 Visit our location</a> | 
                <a href="${CONFIG.reviewUrl}" target="_blank">Leave a review</a>
            </footer>
        `;
    }
}

// Also, update all review links inside .clinic-note and any other element with class="review-link"
function updateAllReviewLinks() {
    const allLinks = document.querySelectorAll('.review-link, .clinic-note a');
    allLinks.forEach(link => {
        if (link.href && (link.href.includes('g.page') || link.getAttribute('data-review'))) {
            link.href = CONFIG.reviewUrl;
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        injectFooter();
        updateAllReviewLinks();
    });
} else {
    injectFooter();
    updateAllReviewLinks();
}