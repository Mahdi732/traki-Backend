import Password from '../helpers/Password.js';
import Jwt from '../helpers/Jwt.js';
import UserRepository from '../repositories/user.repo.js';

export class AuthService {
  #userRepo;
  #passwordService;
  #jwtService;

  constructor({ userRepo = UserRepository , password = Password, jwt = Jwt } = {}) {
    this.#userRepo = userRepo;
    this.#passwordService = password;
    this.#jwtService = jwt;
  }

  async register({ name, email, password, role = 'DRIVER' }) {
    const existing = await this.#userRepo.findByEmail(email);
    if (existing) {
      const err = new Error('Email already in use');
      err.status = 400;
      throw err;
    }

    const passwordHash = await this.#passwordService.hash(password);
    const user = await this.#userRepo.createUser({ name, email, passwordHash, role });
    return user;
  }

  async login({ email, password }) {
    const user = await this.#userRepo.findByEmail(email);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const ok = await this.#passwordService.compare(password, user.passwordHash);
    if (!ok) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const accessToken = this.#jwtService.signAccess({
            sub: user._id.toString(),
            role: user.role 
        });

    return { user, accessToken };
  }

  async logout(userId) {
    await this.#userRepo.updateById(userId, { lastLoggedOutAt: new Date() });
    return;
  }

  async getUserById(id) {
    return this.#userRepo.findById(id);
  }
}

export default new AuthService();