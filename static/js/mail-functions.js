// Mail System Functions

// Send a message to another user
function sendMessage(recipientUsername, subject, messageContent) {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        if (!user) {
            reject(new Error('You must be logged in to send messages'));
            return;
        }
        
        // First get the recipient's user ID
        firebase.firestore().collection('users')
            .where('username', '==', recipientUsername)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    throw new Error('Recipient not found');
                }
                
                const recipientDoc = querySnapshot.docs[0];
                const recipientId = recipientDoc.id;
                
                // Get sender username
                return firebase.firestore().collection('users')
                    .doc(user.uid)
                    .get()
                    .then((senderDoc) => {
                        const senderUsername = senderDoc.data().username;
                        
                        // Create the message
                        return firebase.firestore().collection('messages').add({
                            senderId: user.uid,
                            senderUsername: senderUsername,
                            recipientId: recipientId,
                            recipientUsername: recipientUsername,
                            subject: subject,
                            content: messageContent,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            isRead: false,
                            folder: {
                                [user.uid]: 'sent',
                                [recipientId]: 'inbox'
                            }
                        });
                    });
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Get messages for the current user from a specific folder
function getMessages(folder = 'inbox') {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        if (!user) {
            reject(new Error('You must be logged in to view messages'));
            return;
        }
        
        firebase.firestore().collection('messages')
            .where(`folder.${user.uid}`, '==', folder)
            .orderBy('timestamp', 'desc')
            .get()
            .then((querySnapshot) => {
                const messages = [];
                querySnapshot.forEach((doc) => {
                    const message = doc.data();
                    messages.push({
                        id: doc.id,
                        ...message
                    });
                });
                resolve(messages);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Mark a message as read
function markAsRead(messageId) {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        if (!user) {
            reject(new Error('You must be logged in'));
            return;
        }
        
        firebase.firestore().collection('messages')
            .doc(messageId)
            .update({
                isRead: true
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Move a message to another folder
function moveMessage(messageId, targetFolder) {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        if (!user) {
            reject(new Error('You must be logged in'));
            return;
        }
        
        const folderUpdate = {};
        folderUpdate[`folder.${user.uid}`] = targetFolder;
        
        firebase.firestore().collection('messages')
            .doc(messageId)
            .update(folderUpdate)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Get unread message count
function getUnreadCount() {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        if (!user) {
            resolve(0);
            return;
        }
        
        firebase.firestore().collection('messages')
            .where(`folder.${user.uid}`, '==', 'inbox')
            .where('isRead', '==', false)
            .get()
            .then((querySnapshot) => {
                resolve(querySnapshot.size);
            })
            .catch((error) => {
                reject(error);
            });
    });
} 