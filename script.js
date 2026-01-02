// Screen navigation
let currentScreen = 'screen-welcome';
let selectedIntensity = null;
let selectedFlavor = null;
let userAuthenticated = false;

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

// Verify PIN function - goes directly to intensity screen
function verifyPin() {
    const pinInput = document.getElementById('pin-input');
    const pin = pinInput.value;

    if (pin.length === 4) {
        // Simulate PIN verification
        userAuthenticated = true;

        // Show success feedback
        pinInput.style.borderColor = '#28a745';

        // Go DIRECTLY to intensity selection
        setTimeout(() => {
            showScreen('screen-intensity');
            pinInput.value = '';
            pinInput.style.borderColor = '#5c85d6';
        }, 500);
    } else {
        // Show error
        pinInput.style.borderColor = '#dc3545';
        pinInput.placeholder = 'Please enter 4 digits';
        setTimeout(() => {
            pinInput.style.borderColor = '#5c85d6';
            pinInput.placeholder = 'Enter 4-digit PIN';
        }, 1500);
    }
}

// Show registration (placeholder for future implementation)
function showRegistration() {
    alert('Registration feature coming soon! Please visit the reception desk to register.');
}

// Simulate fingerprint scan - goes directly to intensity screen
document.addEventListener('DOMContentLoaded', function() {
    const fingerprintScanner = document.querySelector('.fingerprint-scanner-main');

    if (fingerprintScanner) {
        fingerprintScanner.addEventListener('click', function() {
            // Simulate scanning animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            // Go DIRECTLY to intensity selection after scan
            setTimeout(() => {
                userAuthenticated = true;
                showScreen('screen-intensity');
            }, 1500);
        });
    }

    // Handle Enter key on PIN input
    const pinInput = document.getElementById('pin-input');
    if (pinInput) {
        pinInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                verifyPin();
            }
        });

        // Only allow numbers
        pinInput.addEventListener('input', function(event) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Intensity selection
    const intensityOptions = document.querySelectorAll('.intensity-option');
    intensityOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedIntensity = this.dataset.intensity;
            console.log('Selected intensity:', selectedIntensity);
            showScreen('screen-flavor');
        });
    });

    // Flavor selection
    const flavorOptions = document.querySelectorAll('.flavor-option');
    flavorOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedFlavor = this.dataset.flavor;
            console.log('Selected flavor:', selectedFlavor);

            // Move to preparation screen
            showScreen('screen-preparation');
        });
    });

    // Back button functionality
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', goBack);
    });
});

function goBack() {
    const screenOrder = [
        'screen-welcome',
        'screen-intensity',
        'screen-flavor',
        'screen-ingredients',
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
    showScreen('screen-welcome');
}

// Add touch feedback for mobile
document.addEventListener('DOMContentLoaded', function() {
    const clickableElements = document.querySelectorAll(
        '.intensity-option, .flavor-option, .back-button, .next-button, .taste-button, .restart-button, .pin-submit-btn, .register-btn, .fingerprint-scanner-main'
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