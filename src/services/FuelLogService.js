import FuelLogRepository from '../repositories/fuellog.repo.js';

export class FuelLogService {
  #repo;

  constructor(repo = FuelLogRepository) {
    this.#repo = repo;
  }

  async create(data) {
    return this.#repo.createLog(data);
  }

  async list(filter = {}, options = {}) {
    return this.#repo.findAll(filter, options);
  }

  async getById(id) {
    const log = await this.#repo.findById(id);
    if (!log) {
      const err = new Error('Fuel log not found');
      err.status = 404;
      throw err;
    }
    return log;
  }

  async remove(id) {
    const log = await this.#repo.deleteById(id);
    if (!log) {
      const err = new Error('Fuel log not found');
      err.status = 404;
      throw err;
    }
    return log;
  }
}

export default new FuelLogService();
