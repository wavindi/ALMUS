// Screen navigation
let currentScreen = 'screen-intensity';
let selectedIntensity = null;
let selectedFlavor = null;

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
            showScreen('screen-scanning');

            // Simulate scanning and move to thank you screen
            setTimeout(() => {
                showScreen('screen-thankyou');
            }, 4000);
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
        'screen-intensity',
        'screen-flavor',
        'screen-ingredients',
        'screen-scanning',
        'screen-thankyou',
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
    showScreen('screen-intensity');
}

// Add touch feedback for mobile
document.addEventListener('DOMContentLoaded', function() {
    const clickableElements = document.querySelectorAll(
        '.intensity-option, .flavor-option, .back-button, .next-button, .taste-button, .restart-button'
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