import crypto from 'crypto';

class Token {
  generateRandomToken(size = 64) {
    return crypto.randomBytes(size).toString('hex');
  }

  hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}

export default new Token();