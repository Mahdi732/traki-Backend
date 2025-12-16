import UserRepository from '../repositories/user.repo.js';

export class UserService {
  #repo;

  constructor(repo = UserRepository) {
    this.#repo = repo;
  }

  async list(filter = {}) {
    return this.#repo.findAll(filter);
  }

  async listDrivers() {
    return this.list({ role: 'DRIVER' });
  }

  async getById(id) {
    return this.#repo.findById(id);
  }
}

export default new UserService();
