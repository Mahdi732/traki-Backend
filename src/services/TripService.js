import TripRepository from '../repositories/trip.repo.js';

export class TripService {
  #repo;

  constructor(repo = TripRepository) {
    this.#repo = repo;
  }

  async create(data) {
    return this.#repo.createTrip(data);
  }

  async list(filter = {}, options = {}) {
    return this.#repo.findAll(filter, options);
  }

  async listByDriver(driverId) {
    return this.#repo.findByDriver(driverId);
  }

  async getById(id) {
    const trip = await this.#repo.findById(id);
    if (!trip) {
      const err = new Error('Trip not found');
      err.status = 404;
      throw err;
    }
    return trip;
  }

  async update(id, update) {
    const trip = await this.#repo.updateById(id, update);
    if (!trip) {
      const err = new Error('Trip not found');
      err.status = 404;
      throw err;
    }
    return trip;
  }

  async remove(id) {
    const trip = await this.#repo.deleteById(id);
    if (!trip) {
      const err = new Error('Trip not found');
      err.status = 404;
      throw err;
    }
    return trip;
  }
}

export default new TripService();
