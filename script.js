// Screen navigation
let currentScreen = 'screen-splash';
let selectedIntensity = null;
let selectedFlavor = null;
let userAuthenticated = false;
let pinCode = '';

function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show the requested screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }
}

// PIN Toast Functions
function openToast() {
    const toast = document.getElementById('pin-toast');
    toast.classList.add('active');
    pinCode = '';
    updatePinDisplay();
}

function closeToast() {
    const toast = document.getElementById('pin-toast');
    toast.classList.remove('active');
    pinCode = '';
    updatePinDisplay();
}

function addPin(number) {
    if (pinCode.length < 4) {
        pinCode += number;
        updatePinDisplay();

        // Auto-submit when 4 digits are entered
        if (pinCode.length === 4) {
            setTimeout(submitPin, 300);
        }
    }
}

function clearPin() {
    if (pinCode.length > 0) {
        pinCode = pinCode.slice(0, -1);
        updatePinDisplay();
    }
}

function updatePinDisplay() {
    const display = document.getElementById('pin-display');
    if (pinCode.length === 0) {
        display.textContent = '----';
    } else {
        let displayText = '';
        for (let i = 0; i < 4; i++) {
            if (i < pinCode.length) {
                displayText += '●';
            } else {
                displayText += '-';
            }
        }
        display.textContent = displayText;
    }
}

function submitPin() {
    if (pinCode.length > 0) {
        // Any PIN code entered goes to flavor screen
        userAuthenticated = true;
        closeToast();
        showScreen('screen-flavor');
        pinCode = '';
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {

    // Splash screen - click anywhere goes to fingerprint screen
    const splashContainer = document.querySelector('.splash-container');
    if (splashContainer) {
        splashContainer.addEventListener('click', function() {
            showScreen('screen-fingerprint');
        });
    }

    // Logo on fingerprint screen - opens PIN toast
    const logoBtn = document.getElementById('logo-btn');
    if (logoBtn) {
        logoBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openToast();
        });
    }

    // Fingerprint image - click goes to flavor screen
    const fingerprintImg = document.getElementById('fingerprint-img');
    if (fingerprintImg) {
        fingerprintImg.addEventListener('click', function() {
            showScreen('screen-flavor');
        });
    }

    // Fingerprint container (not just image) - also clickable
    const fingerprintContainer = document.querySelector('.fingerprint-full-container');
    if (fingerprintContainer) {
        fingerprintContainer.addEventListener('click', function(e) {
            // Don't trigger if clicking on logo
            if (!e.target.closest('.logo-corner')) {
                showScreen('screen-flavor');
            }
        });
    }

    // Flavor selection - NEW: Goes to INTENSITY screen
    const flavorOptions = document.querySelectorAll('.flavor-option');
    flavorOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedFlavor = this.dataset.flavor;
            console.log('Selected flavor:', selectedFlavor);

            // After flavor, go to INTENSITY screen
            showScreen('screen-intensity');
        });
    });

    // Intensity selection - Goes to PREPARATION screen
    const intensityOptions = document.querySelectorAll('.intensity-option');
    intensityOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedIntensity = this.dataset.intensity;
            console.log('Selected intensity:', selectedIntensity);

            // After intensity, go to PREPARATION screen
            showScreen('screen-preparation');
        });
    });

    // Back button functionality
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', goBack);
    });

    // Close toast when clicking outside
    const pinToast = document.getElementById('pin-toast');
    if (pinToast) {
        pinToast.addEventListener('click', function(e) {
            if (e.target === pinToast) {
                closeToast();
            }
        });
    }
});

function goBack() {
    const screenOrder = [
        'screen-splash',
        'screen-fingerprint',
        'screen-flavor',
        'screen-intensity',
        'screen-preparation',
        'screen-nutrition'
    ];

    const currentIndex = screenOrder.indexOf(currentScreen);
    if (currentIndex > 0) {
        showScreen(screenOrder[currentIndex - 1]);
    }
}

function resetApp() {
    selectedIntensity = null;
    selectedFlavor = null;
    userAuthenticated = false;
    pinCode = '';
    showScreen('screen-splash');
}

// Add touch feedback for mobile
document.addEventListener('DOMContentLoaded', function() {
    const clickableElements = document.querySelectorAll(
        '.intensity-option, .flavor-option, .back-button, .next-button, .taste-button, .restart-button, .pin-btn, .logo-corner, .splash-container, .fingerprint-full, .fingerprint-full-container'
    );

    clickableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });

        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
});

// Prevent scroll bounce on iOS
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });

// Keyboard support
document.addEventListener('keydown', function(e) {
    const toast = document.getElementById('pin-toast');

    // Splash screen - press any key to go to fingerprint
    if (currentScreen === 'screen-splash' && !toast.classList.contains('active')) {
        if (e.key === 'Enter' || e.key === ' ') {
            showScreen('screen-fingerprint');
        }
    }

    // Fingerprint screen shortcuts
    if (currentScreen === 'screen-fingerprint' && !toast.classList.contains('active')) {
        if (e.key === 'Enter' || e.key === ' ') {
            // Space/Enter - go to flavor (like clicking fingerprint)
            showScreen('screen-flavor');
        } else if (e.key === 'p' || e.key === 'P') {
            // Press 'P' to open PIN
            openToast();
        }
    }

    // PIN toast keyboard controls
    if (toast && toast.classList.contains('active')) {
        if (e.key >= '0' && e.key <= '9') {
            addPin(e.key);
        } else if (e.key === 'Backspace') {
            clearPin();
        } else if (e.key === 'Enter') {
            submitPin();
        } else if (e.key === 'Escape') {
            closeToast();
        }
    }
});