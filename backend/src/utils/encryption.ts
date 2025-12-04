import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

// Get encryption key from environment variable (should be 64 hex characters = 32 bytes)
const getEncryptionKey = (): Buffer => {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        throw new Error('ENCRYPTION_KEY not set in environment variables');
    }
    return Buffer.from(key, 'hex');
};

/**
 * Encrypts a password using AES-256-GCM
 * @param password - Plain text password to encrypt
 * @returns Encrypted password in format: iv:authTag:encryptedData (all hex encoded)
 */
export const encryptPassword = (password: string): string => {
    try {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, getEncryptionKey(), iv);

        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag();

        // Format: iv:authTag:encryptedData
        return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt password');
    }
};

/**
 * Decrypts a password encrypted with encryptPassword
 * @param encryptedPassword - Encrypted password in format: iv:authTag:encryptedData
 * @returns Decrypted plain text password
 */
export const decryptPassword = (encryptedPassword: string): string => {
    try {
        const parts = encryptedPassword.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted password format');
        }

        const [ivHex, authTagHex, encryptedData] = parts;
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');

        const decipher = crypto.createDecipheriv(ALGORITHM, getEncryptionKey(), iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt password');
    }
};
