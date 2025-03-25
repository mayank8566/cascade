import os

class Config:
    # Flask Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY', 'CASCADE_SECRET_KEY_12345')
    
    # Firebase Configuration
    FIREBASE_API_KEY = os.environ.get('FIREBASE_API_KEY', 'AIzaSyCQf_QXzyZkyRxsbo91PJmdwjEn3lVfDTo')
    FIREBASE_AUTH_DOMAIN = os.environ.get('FIREBASE_AUTH_DOMAIN', 'cosmicteams-bbf29.firebaseapp.com')
    FIREBASE_PROJECT_ID = os.environ.get('FIREBASE_PROJECT_ID', 'cosmicteams-bbf29')
    FIREBASE_STORAGE_BUCKET = os.environ.get('FIREBASE_STORAGE_BUCKET', 'cosmicteams-bbf29.appspot.com')
    FIREBASE_MESSAGING_SENDER_ID = os.environ.get('FIREBASE_MESSAGING_SENDER_ID', '807144888137')
    FIREBASE_APP_ID = os.environ.get('FIREBASE_APP_ID', '1:807144888137:web:d4b1b9a0e523cd3cd6ec98') 