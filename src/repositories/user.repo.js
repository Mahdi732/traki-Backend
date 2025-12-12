import UserModel from '../models/User.js';

class UserRepository {
  #model;

  constructor() {
    this.#model = UserModel;
  }

  async findByEmail(email) {
    return this.#model.findOne({ email });
  }

  async createUser({ name, email, passwordHash, role = 'DRIVER' }) {
    return this.#model.create({ name, email, passwordHash, role });
  }

  async findById(id) {
    return this.#model.findById(id);
  }

  async updateById(id, update, options = { new: true }) {
    return this.#model.findByIdAndUpdate(id, update, options);
  }

  async updateOne(filter, update, options = {}) {
    return this.#model.updateOne(filter, update, options);
  }
}

export default new UserRepository()