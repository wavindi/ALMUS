// Screen navigation
let currentScreen = 'screen-splash';
let selectedIntensity = null;
let selectedFlavor = null;
let userAuthenticated = false;
let pinCode = '';
let screenTimer = null; // Timer for auto-redirects

function showScreen(screenId) {
    console.log('Showing screen:', screenId);

    // Clear any existing timers
    if (screenTimer) {
        clearTimeout(screenTimer);
        screenTimer = null;
    }

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

    // Auto-redirect timers
    if (screenId === 'screen-preparation') {
        // Redirect to splash after 6 seconds
        screenTimer = setTimeout(() => {
            resetApp();
        }, 6000);
    } else if (screenId === 'screen-nutrition') {
        // Redirect to splash after 7 seconds
        screenTimer = setTimeout(() => {
            resetApp();
        }, 7000);
    }
}

// PIN Toast Functions
function openToast() {
    console.log('Opening PIN toast');
    const toast = document.getElementById('pin-toast');
    if (toast) {
        toast.classList.add('active');
        pinCode = '';
        updatePinDisplay();
    }
}

function closeToast() {
    console.log('Closing PIN toast');
    const toast = document.getElementById('pin-toast');
    if (toast) {
        toast.classList.remove('active');
        pinCode = '';
        updatePinDisplay();
    }
}

function addPin(number) {
    console.log('Adding pin digit:', number);
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
    console.log('Clearing last digit');
    if (pinCode.length > 0) {
        pinCode = pinCode.slice(0, -1);
        updatePinDisplay();
    }
}

function updatePinDisplay() {
    const display = document.getElementById('pin-display');
    if (!display) return;

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
    console.log('Submitting PIN');
    if (pinCode.length > 0) {
        // Any PIN code entered goes to flavor screen
        userAuthenticated = true;
        closeToast();
        showScreen('screen-flavor');
        pinCode = '';
    }
}

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
    if (screenTimer) {
        clearTimeout(screenTimer);
        screenTimer = null;
    }
    showScreen('screen-splash');
}

function goToNutrition() {
    console.log('Going to nutrition screen');
    showScreen('screen-nutrition');
}

// Initialize the app - SINGLE DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');

    // 1. SPLASH SCREEN - click anywhere goes to fingerprint screen
    const splashContainer = document.querySelector('.splash-container');
    if (splashContainer) {
        splashContainer.addEventListener('click', function() {
            console.log('Splash clicked');
            showScreen('screen-fingerprint');
        });
        console.log('Splash listener attached');
    }

    // 2. LOGO on fingerprint screen - opens PIN toast
    const logoBtn = document.getElementById('logo-btn');
    if (logoBtn) {
        logoBtn.addEventListener('click', function(e) {
            console.log('Logo clicked');
            e.stopPropagation();
            openToast();
        });
        console.log('Logo listener attached');
    }

    // 3. FINGERPRINT IMAGE - click goes to flavor screen
    const fingerprintImg = document.getElementById('fingerprint-img');
    if (fingerprintImg) {
        fingerprintImg.addEventListener('click', function(e) {
            console.log('Fingerprint image clicked');
            e.stopPropagation();
            showScreen('screen-flavor');
        });
        console.log('Fingerprint image listener attached');
    }

    // 4. FINGERPRINT CONTAINER - also clickable (backup)
    const fingerprintContainer = document.querySelector('.fingerprint-full-container');
    if (fingerprintContainer) {
        fingerprintContainer.addEventListener('click', function(e) {
            console.log('Fingerprint container clicked');
            // Don't trigger if clicking on logo
            if (!e.target.closest('.logo-corner')) {
                showScreen('screen-flavor');
            }
        });
        console.log('Fingerprint container listener attached');
    }

    // 5. FLAVOR SELECTION - Goes to INTENSITY screen
    const flavorOptions = document.querySelectorAll('.flavor-option');
    console.log('Found flavor options:', flavorOptions.length);
    flavorOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedFlavor = this.dataset.flavor;
            console.log('Selected flavor:', selectedFlavor);
            showScreen('screen-intensity');
        });
    });
    console.log('Flavor listeners attached:', flavorOptions.length);

    // 6. INTENSITY SELECTION - Goes to PREPARATION screen
    const intensityOptions = document.querySelectorAll('.intensity-option');
    intensityOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedIntensity = this.dataset.intensity;
            console.log('Selected intensity:', selectedIntensity);
            showScreen('screen-preparation');
        });
    });
    console.log('Intensity listeners attached:', intensityOptions.length);

    // 7. CALORIES BUTTON - Goes to nutrition screen
    const caloriesBtn = document.getElementById('calories-btn');
    if (caloriesBtn) {
        caloriesBtn.addEventListener('click', function() {
            console.log('Calories button clicked');
            goToNutrition();
        });
        console.log('Calories button listener attached');
    }

    // 8. BACK BUTTONS
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', goBack);
    });
    console.log('Back button listeners attached:', backButtons.length);

    // 9. CLOSE PIN TOAST when clicking outside
    const pinToast = document.getElementById('pin-toast');
    if (pinToast) {
        pinToast.addEventListener('click', function(e) {
            if (e.target === pinToast) {
                closeToast();
            }
        });
        console.log('PIN toast outside click listener attached');
    }

    // 10. TOUCH FEEDBACK for mobile
    const clickableElements = document.querySelectorAll(
        '.intensity-option, .flavor-option, .back-button, .next-button, .taste-button, .restart-button, .pin-btn, .logo-corner, .splash-container, .fingerprint-full, .fingerprint-full-container, .calories-button'
    );
    clickableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    console.log('Touch feedback attached to', clickableElements.length, 'elements');
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

    // Splash screen
    if (currentScreen === 'screen-splash' && (!toast || !toast.classList.contains('active'))) {
        if (e.key === 'Enter' || e.key === ' ') {
            showScreen('screen-fingerprint');
        }
    }

    // Fingerprint screen
    if (currentScreen === 'screen-fingerprint' && (!toast || !toast.classList.contains('active'))) {
        if (e.key === 'Enter' || e.key === ' ') {
            showScreen('screen-flavor');
        } else if (e.key === 'p' || e.key === 'P') {
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

console.log('Script loaded successfully');