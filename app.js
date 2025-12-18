// ALMUS - Vanilla JavaScript Application
// Converted from React

// Configuration Constants
const CONFIG = {
    API_BASE_URL: 'http://localhost:9000',
    DURATION_EAU: 10000,  // 10 seconds
    DURATION_LEVEL_1: 2000,  // 2 seconds (Faible)
    DURATION_LEVEL_2: 3000,  // 3 seconds (Moyenne)
    DURATION_LEVEL_3: 4000   // 4 seconds (Fort)
};

// Application State
let appState = {
    selectedFlavor: null,
    selectedIntensity: null,
    isLoading: false
};

// Navigation System
function navigateTo(route) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show the requested screen
    const screenMap = {
        'home': 'home-screen',
        'gouts': 'gouts-screen',
        'intensity': 'intensity-screen',
        'success': 'success-screen'
    };

    const screenId = screenMap[route];
    if (screenId) {
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');

            // Initialize screen if needed
            if (route === 'intensity') {
                initIntensityScreen();
            } else if (route === 'success') {
                initSuccessScreen();
            }
        }
    }
}

// Initialize Flavor Selection Screen
function initGoutsScreen() {
    const goutItems = document.querySelectorAll('.gout-item');

    goutItems.forEach(item => {
        item.addEventListener('click', function() {
            const saveur = parseInt(this.getAttribute('data-saveur'));
            const img = this.getAttribute('data-img');

            // Store selected flavor
            appState.selectedFlavor = saveur;
            sessionStorage.setItem('GoutParameters', JSON.stringify({
                saveur: saveur,
                img: img,
                durationEau: CONFIG.DURATION_EAU
            }));

            // Navigate to intensity selection
            navigateTo('intensity');
        });
    });
}

// Initialize Intensity Level Screen
function initIntensityScreen() {
    const intensityOptions = document.querySelectorAll('.intensity-option');
    const btnDeguster = document.getElementById('btn-deguster');

    // Reset selection
    intensityOptions.forEach(option => {
        option.classList.remove('selected');
    });

    appState.selectedIntensity = null;
    btnDeguster.classList.add('disabled');

    // Handle intensity selection
    intensityOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selection
            intensityOptions.forEach(opt => opt.classList.remove('selected'));

            // Add selection to clicked option
            this.classList.add('selected');

            // Store selected intensity
            appState.selectedIntensity = parseInt(this.getAttribute('data-level'));

            // Enable deguster button
            btnDeguster.classList.remove('disabled');
        });
    });

    // Handle deguster button click
    btnDeguster.onclick = function() {
        if (appState.selectedIntensity && !appState.isLoading) {
            startDispensing();
        }
    };
}

// Start Dispensing Process
function startDispensing() {
    if (appState.isLoading) return;

    // Get stored flavor parameters
    const goutParams = JSON.parse(sessionStorage.getItem('GoutParameters'));
    if (!goutParams) {
        console.error('No flavor parameters found');
        return;
    }

    const saveur = goutParams.saveur;
    const level = appState.selectedIntensity;

    // Determine duration based on intensity level
    let timems = CONFIG.DURATION_LEVEL_1;
    if (level === 2) {
        timems = CONFIG.DURATION_LEVEL_2;
    } else if (level === 3) {
        timems = CONFIG.DURATION_LEVEL_3;
    }

    // Set loading state
    appState.isLoading = true;

    // Build API URL
    const url = `${CONFIG.API_BASE_URL}/command/${saveur}/${timems}/${CONFIG.DURATION_EAU}`;

    // Navigate to success screen first
    navigateTo('success');

    // Make API call
    fetch(url)
        .then(response => {
            appState.isLoading = false;
            sessionStorage.clear();
            console.log('Dispensing completed successfully');
        })
        .catch(error => {
            appState.isLoading = false;
            sessionStorage.clear();
            console.error('Dispensing error:', error);
        });
}

// Initialize Success/Progress Screen
function initSuccessScreen() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    let progress = 0;

    // Animate progress bar
    const interval = setInterval(() => {
        progress += 1;

        if (progress <= 100) {
            progressFill.style.width = progress + '%';
            progressText.textContent = progress + '%';
        }

        if (progress >= 100) {
            clearInterval(interval);

            // Return to home after 4 seconds
            setTimeout(() => {
                navigateTo('home');
            }, 4000);
        }
    }, 100);  // Update every 100ms for smooth animation (10 seconds total)
}

// Emergency Stop Function
function stopAlert() {
    const url = `${CONFIG.API_BASE_URL}/stopAlert`;

    fetch(url)
        .then(response => {
            appState.isLoading = false;
            console.log('Emergency stop executed');
        })
        .catch(error => {
            appState.isLoading = false;
            console.error('Emergency stop error:', error);
        });
}

// Initialize Application
function initApp() {
    console.log('ALMUS Application Initialized');

    // Initialize flavor selection screen
    initGoutsScreen();

    // Set up keyboard shortcuts for emergency stop (optional)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            stopAlert();
            navigateTo('home');
        }
    });

    // Start at home screen
    navigateTo('home');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export functions for debugging (optional)
window.ALMUS = {
    navigateTo,
    stopAlert,
    appState
};
