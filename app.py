from flask import Flask, render_template, redirect, url_for, session, request, flash, jsonify
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Firebase configuration accessible through template context
@app.context_processor
def inject_firebase_config():
    return {
        'firebase_config': {
            'apiKey': app.config['FIREBASE_API_KEY'],
            'authDomain': app.config['FIREBASE_AUTH_DOMAIN'],
            'projectId': app.config['FIREBASE_PROJECT_ID'],
            'storageBucket': app.config['FIREBASE_STORAGE_BUCKET'],
            'messagingSenderId': app.config['FIREBASE_MESSAGING_SENDER_ID'],
            'appId': app.config['FIREBASE_APP_ID']
        }
    }

# Routes for main pages
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/roster')
def roster():
    return render_template('roster.html')

# Specialized roster routes
@app.route('/roster/npot')
def npot_roster():
    return render_template('npot_roster.html')

@app.route('/roster/sword')
def sword_roster():
    return render_template('sword_roster.html')

@app.route('/roster/uhc')
def uhc_roster():
    return render_template('uhc_roster.html')

@app.route('/roster/smp')
def smp_roster():
    return render_template('smp_roster.html')

@app.route('/roster/cpvp')
def cpvp_roster():
    return render_template('cpvp_roster.html')

# Authentication routes
@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/logout')
def logout():
    # No need to handle logout on server-side with Firebase auth
    # Just redirect to home page
    return redirect(url_for('home'))

# Protected dashboard route (example)
@app.route('/dashboard')
def dashboard():
    # This route will be protected by client-side Firebase auth
    return render_template('dashboard.html')

# Profile routes
@app.route('/profile')
def profile():
    # This route will be protected by client-side Firebase auth
    return render_template('profile.html')

@app.route('/tiers')
def tiers():
    # This route will be protected by client-side Firebase auth
    return render_template('tiers.html')

# Mail system route
@app.route('/mail')
def mail():
    return render_template('mail.html')

# Password reset route
@app.route('/reset-password')
def reset_password():
    return render_template('reset-password.html')

if __name__ == '__main__':
    # For local development
    app.run(debug=True)
else:
    # For production - Render will use this app object
    # Make sure debug is false in production
    app.debug = False 