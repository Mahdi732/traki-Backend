import bcrypt from 'bcrypt';

class Password {
  #saltRounds;
  constructor() {
    this.#saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
  }

  async hash(plain) {
    return bcrypt.hash(plain, this.#saltRounds);
  }

  async compare(plain, hash) {
    return bcrypt.compare(plain, hash);
  }
}

export default new Password();