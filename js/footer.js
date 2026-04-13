// footer.js
const LANGUAGE_PREFERENCE_KEY = 'drDeepaPetClinicLanguage';
const FIRST_VISIT_KEY = 'drDeepaPetClinicFirstVisit';

function injectFooter(isLandingPage = false) {
    const footerContainer = document.getElementById('footer-placeholder');
    
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer>
                ${CONFIG.clinicName} – Common sense care for every paw.<br>
                This article is for informational purposes. Always consult your vet for medical advice.<br>
                <a href="${CONFIG.locationUrl}" target="_blank">📍 Visit our location</a> |
                <a href="${CONFIG.reviewUrl}" target="_blank">Leave a review</a>
            </footer>
        `;
    }

    if (!document.getElementById('floating-lang-container')) {
        // Create the style tag for responsive behavior
        const style = document.createElement('style');
        style.innerHTML = `
            #floating-lang-container {
                position: fixed;
                top: 10px;
                right: 10px;
                z-index: 999999;
                background: rgba(255, 255, 255, 0.98);
                padding: 2px 8px;
                border-radius: 30px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                border: 1px solid #006064;
                max-width: 150px; /* Limits width on desktop */
                overflow: hidden;
            }

/* MOBILE SPECIFIC FIX */
            @media (max-width: 600px) {
                #floating-lang-container {
                    top: 10px !important;
                    right: 10px !important;
                    transform: scale(0.8); /* Shrink it so it doesn't overlap text */
                    transform-origin: top right;
                }
                
                /* Hide the 'Powered by Google' text to save space on mobile */
                .goog-logo-link, .goog-te-gadget span {
                    display: none !important;
                }
                .goog-te-gadget {
                    color: transparent !important;
                    font-size: 0 !important;
                }
            }

            /* Ensure the actual dropdown is visible */
            .goog-te-combo {
                margin: 0 !important;
                font-size: 13px !important;
                background: white !important;
                border: none !important;
                color: #333 !important;
            }
        `;
        document.head.appendChild(style);

        const langDiv = document.createElement('div');
        langDiv.id = 'floating-lang-container';
        langDiv.innerHTML = `
            <span>🌐</span>
            <div id="google_translate_element"></div>
        `;
        document.body.appendChild(langDiv);
    }

    initGoogleTranslate();

    if (isLandingPage && !localStorage.getItem(FIRST_VISIT_KEY)) {
        pulseLanguageButton();
    }
}
function initGoogleTranslate() {
    if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.googleapis.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    }
}

window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,en,pa,bn',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false // Prevents the big Google top-bar from appearing
    }, 'google_translate_element');
    
    setTimeout(restorePreviousLanguage, 1500);
};

function pulseLanguageButton() {
    const btn = document.getElementById('floating-lang-container');
    if (btn) {
        btn.style.transition = "transform 0.3s ease-in-out";
        btn.style.transform = "scale(1.1)";
        btn.style.borderColor = "#ff5722"; // Highlight color
        
        setTimeout(() => {
            btn.style.transform = "scale(1)";
            btn.style.borderColor = "#006064";
            localStorage.setItem(FIRST_VISIT_KEY, 'true');
        }, 3000);
    }
}

function restorePreviousLanguage() {
    const savedLanguage = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    const googleCombo = document.querySelector('.goog-te-combo');
    if (savedLanguage && googleCombo) {
        googleCombo.value = savedLanguage;
        googleCombo.dispatchEvent(new Event('change'));
    }
}

// Logic to identify landing page
const isLanding = window.isLandingPage || window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

document.addEventListener('DOMContentLoaded', () => {
    injectFooter(isLanding);
});


function updateAllReviewLinks() {
    const allLinks = document.querySelectorAll('.review-link, .clinic-note a');
    allLinks.forEach(link => {
        if (link.href && (link.href.includes('g.page') || link.getAttribute('data-review'))) {
            link.href = CONFIG.reviewUrl;
        }
    });
}
