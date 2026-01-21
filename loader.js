// ============================================
// LOADER ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const loaderOverlay = document.getElementById('loader-overlay');
    
    if (!loaderOverlay) return;
    
    // Check if loader has already been shown in this session
    const loaderShown = sessionStorage.getItem('loaderShown');
    
    if (loaderShown === 'true') {
        // Loader already shown, remove it immediately
        loaderOverlay.remove();
        return;
    }
    
    // Mark loader as shown
    sessionStorage.setItem('loaderShown', 'true');
    
    // Prevent body scroll during loading
    document.body.classList.add('loading');
    
    // Display time for logo
    const displayTime = 2000; // 2 seconds
    
    // Hide loader and show site
    setTimeout(() => {
        loaderOverlay.classList.add('hidden');
        document.body.classList.remove('loading');
        // Remove loader from DOM after transition
        setTimeout(() => {
            loaderOverlay.remove();
        }, 800);
    }, displayTime);
});
