// 1. Register the Service Worker for Offline Capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registered!', reg))
            .catch(err => console.error('Service Worker Registration Failed!', err));
    });
}

// 2. UI Logic: Update status indicator if internet drops
const statusIndicator = document.getElementById('status');

function updateNetworkStatus() {
    if (navigator.onLine) {
        statusIndicator.textContent = 'Online';
        statusIndicator.className = 'online';
    } else {
        statusIndicator.textContent = 'Offline';
        statusIndicator.className = 'offline';
    }
}

// Listen for network changes
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

// Set initial status
updateNetworkStatus();
