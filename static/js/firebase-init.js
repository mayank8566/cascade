// Initialize Firebase for CASCADE
document.addEventListener('DOMContentLoaded', function() {
    // Error handling setup
    const errorPopup = document.getElementById('error-popup');
    const errorMessage = document.getElementById('error-message');
    const closeError = document.querySelector('.close-error');
    
    // Function to show error popup
    window.showError = function(message) {
        errorMessage.textContent = message;
        errorPopup.style.display = 'block';
    };
    
    // Close error popup when clicking the X
    if (closeError) {
        closeError.addEventListener('click', function() {
            errorPopup.style.display = 'none';
        });
    }
    
    // Close error popup when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === errorPopup) {
            errorPopup.style.display = 'none';
        }
    });

    // Firebase configuration is now imported from firebase-config.js
    
    // Initialize Firebase if it's not already initialized
    try {
        if (!firebase.apps.length) {
            // firebaseConfig is defined in firebase-config.js
            firebase.initializeApp(firebaseConfig);
        }
    } catch (error) {
        showError('Failed to initialize Firebase: ' + error.message);
        console.error('Firebase initialization error:', error);
        return;
    }
    
    // Auth state change listener for navigation management
    firebase.auth().onAuthStateChanged(function(user) {
        // References to navigation elements
        const loginLink = document.getElementById('login-link');
        const registerLink = document.getElementById('register-link');
        const profileMenu = document.getElementById('profile-menu');
        const profilePhoto = document.getElementById('profile-photo');
        const rosterLink = document.getElementById('roster-link');
        
        if (user) {
            // User is signed in
            if (loginLink) loginLink.style.display = 'none';
            if (registerLink) registerLink.style.display = 'none';
            if (profileMenu) profileMenu.style.display = 'block';
            if (rosterLink) rosterLink.style.display = 'block';
            
            // Update profile photo
            if (profilePhoto) {
                profilePhoto.src = user.photoURL || '/static/images/default-avatar.svg';
                profilePhoto.alt = user.displayName || 'User';
            }
            
            // Update mail notifications
            updateMailNotifications();
        } else {
            // User is signed out
            if (loginLink) loginLink.style.display = 'block';
            if (registerLink) registerLink.style.display = 'block';
            if (profileMenu) profileMenu.style.display = 'none';
            if (rosterLink) rosterLink.style.display = 'none';
        }
    }, function(error) {
        showError('Authentication error: ' + error.message);
        console.error('Auth state change error:', error);
    });
    
    // Handle logout button click
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            firebase.auth().signOut().then(() => {
                window.location.href = '/';
            }).catch((error) => {
                showError('Logout error: ' + error.message);
                console.error('Error signing out:', error);
            });
        });
    }
    
    // Global error handler for Firebase
    window.addEventListener('error', function(event) {
        // Only handle Firebase errors
        if (event.message && (event.message.includes('firebase') || event.message.includes('Firebase'))) {
            showError('Firebase error: ' + event.message);
        }
    });
});

// Add code to handle mail notifications
function updateMailNotifications() {
    const mailBadge = document.getElementById('mailBadge');
    if (!mailBadge) return; // Badge doesn't exist yet
    
    // Check if user is logged in
    const user = firebase.auth().currentUser;
    if (!user) {
        mailBadge.style.display = 'none';
        return;
    }
    
    // In a real app, this would fetch unread mail count from the database
    // For demo purposes, we're using a static count
    const unreadCount = 3;
    
    if (unreadCount > 0) {
        mailBadge.textContent = unreadCount;
        mailBadge.style.display = 'flex';
    } else {
        mailBadge.style.display = 'none';
    }
} 