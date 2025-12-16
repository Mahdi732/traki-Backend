import TrailerRepository from '../repositories/trailer.repo.js';

export class TrailerService {
  #repo;

  constructor(repo = TrailerRepository) {
    this.#repo = repo;
  }

  async create(data) {
    const existing = data.plateNumber ? await this.#repo.findByPlate(data.plateNumber) : null;
    if (existing) {
      const err = new Error('Trailer with this plate number already exists');
      err.status = 400;
      throw err;
    }
    return this.#repo.createTrailer(data);
  }

  async list(filter = {}, options = {}) {
    return this.#repo.findAll(filter, options);
  }

  async getById(id) {
    const trailer = await this.#repo.findById(id);
    if (!trailer) {
      const err = new Error('Trailer not found');
      err.status = 404;
      throw err;
    }
    return trailer;
  }

  async update(id, update) {
    const trailer = await this.#repo.updateById(id, update);
    if (!trailer) {
      const err = new Error('Trailer not found');
      err.status = 404;
      throw err;
    }
    return trailer;
  }

  async remove(id) {
    const trailer = await this.#repo.deleteById(id);
    if (!trailer) {
      const err = new Error('Trailer not found');
      err.status = 404;
      throw err;
    }
    return trailer;
  }
}

export default new TrailerService();
