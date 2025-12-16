import TireRepository from '../repositories/tire.repo.js';

export class TireService {
  #repo;

  constructor(repo = TireRepository) {
    this.#repo = repo;
  }

  async create(data) {
    const existing = data.serialNumber ? await this.#repo.findBySerial(data.serialNumber) : null;
    if (existing) {
      const err = new Error('Tire with this serial number already exists');
      err.status = 400;
      throw err;
    }
    return this.#repo.createTire(data);
  }

  async list(filter = {}, options = {}) {
    return this.#repo.findAll(filter, options);
  }

  async getById(id) {
    const tire = await this.#repo.findById(id);
    if (!tire) {
      const err = new Error('Tire not found');
      err.status = 404;
      throw err;
    }
    return tire;
  }

  async update(id, update) {
    const tire = await this.#repo.updateById(id, update);
    if (!tire) {
      const err = new Error('Tire not found');
      err.status = 404;
      throw err;
    }
    return tire;
  }

  async remove(id) {
    const tire = await this.#repo.deleteById(id);
    if (!tire) {
      const err = new Error('Tire not found');
      err.status = 404;
      throw err;
    }
    return tire;
  }
}

export default new TireService();
