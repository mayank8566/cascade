# CASCADE Minecraft Team Website

A cosmic-themed website for the CASCADE Minecraft team, formed from the alliance of RUPTURES and FAITH.

## Features

- Responsive design with galaxy-themed UI
- Team information and history
- User authentication with Firebase (email and username login)
- Member dashboard with personalized content
- Interactive elements with cosmic animations
- Flask backend for easy deployment

## Setup Instructions

1. Make sure you have Python installed (Python 3.6 or higher recommended)

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the Flask application:
   ```
   python app.py
   ```

4. Open your web browser and navigate to:
   ```
   http://127.0.0.1:5000/
   ```

## Firebase Authentication

This website uses Firebase Authentication and Firestore for user management:

- Users can register with email and username
- Login is possible with either email or username
- User profiles are stored in Firestore
- Protected dashboard for authenticated users

### Firebase Configuration

The Firebase configuration is already included in the code. If you want to use your own Firebase project:

1. Create a new Firebase project at https://console.firebase.google.com/
2. Enable Email/Password authentication in the Firebase console
3. Create a Firestore database
4. Replace the Firebase configuration in the code with your own

## Background Images

This website requires the following background images in the `/static/images/` directory:
- stars.png
- twinkling.png
- clouds.png

You can find these cosmic background images on sites like Freepik or Pixabay, or create your own.

## Customization

- Edit the HTML templates in the `/templates` directory to change content
- Modify the CSS in `/static/css/style.css` to change styling
- Add team member information and images in the team.html file
- Extend the dashboard functionality as needed

## Technologies Used

- Backend: Python Flask
- Frontend: HTML, CSS, JavaScript
- Authentication: Firebase Authentication
- Database: Firebase Firestore
- Animations: CSS animations and JavaScript 