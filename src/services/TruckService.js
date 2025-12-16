import TruckRepository from '../repositories/truck.repo.js';

export class TruckService {
  #repo;

  constructor(repo = TruckRepository) {
    this.#repo = repo;
  }

  async create(data) {
    const existing = data.plateNumber ? await this.#repo.findByPlate(data.plateNumber) : null;
    if (existing) {
      const err = new Error('Truck with this plate number already exists');
      err.status = 400;
      throw err;
    }
    return this.#repo.createTruck(data);
  }

  async list(filter = {}, options = {}) {
    return this.#repo.findAll(filter, options);
  }

  async getById(id) {
    const truck = await this.#repo.findById(id);
    if (!truck) {
      const err = new Error('Truck not found');
      err.status = 404;
      throw err;
    }
    return truck;
  }

  async update(id, update) {
    const truck = await this.#repo.updateById(id, update);
    if (!truck) {
      const err = new Error('Truck not found');
      err.status = 404;
      throw err;
    }
    return truck;
  }

  async remove(id) {
    const truck = await this.#repo.deleteById(id);
    if (!truck) {
      const err = new Error('Truck not found');
      err.status = 404;
      throw err;
    }
    return truck;
  }
}

export default new TruckService();
