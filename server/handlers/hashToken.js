import crypto from 'crypto';

const hashToken = (token) => {
    return crypto.createHasg('sha256').
    update(token).
    digest('hex');
};

export default hashToken;