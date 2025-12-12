import jwt from 'jsonwebtoken';

class JWT {
  #secret;
  #accessTtl;
  constructor() {
    this.#secret = process.env.JWT_SECRET;
    this.#accessTtl = process.env.ACCESS_TOKEN_TTL || '15m';
  }

  signAccess(payload) {
    return jwt.sign(payload, this.#secret, { expiresIn: this.#accessTtl });
  }

  verifyAccess(token) {
    return jwt.verify(token, this.#secret);
  }
}

export default new JWT();
