// config.js
window.CONFIG = {
    reviewUrl: "https://g.page/r/CUTnCxmQ4-egEAE/review",
    clinicName: "Dr. Deepa pet vet clinic"
};

window.createClinicNote = function(customMessageHeading, customMessage) {
    return `
        <div class="clinic-note">
            🏥 <strong>${customMessageHeading}</strong><br>
            Visit ${window.CONFIG.clinicName} ${customMessage}<br>
            <a href="${window.CONFIG.reviewUrl}" class="review-link" target="_blank">📍 Visit our location</a> | 
            <a href="${window.CONFIG.reviewUrl}" class="review-link" target="_blank">Leave a review</a>
        </div>
    `;
};