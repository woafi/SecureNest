import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// For local development without service account
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            projectId: 'testing-ef20f',
        });
    } catch (error) {
        console.error('Firebase Admin initialization error:', error);
    }
}

export const auth = admin.auth();
export default admin;
