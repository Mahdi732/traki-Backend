import TrailerModel from '../models/Trailer.js';

class TrailerRepository {
  #model;

  constructor() {
    this.#model = TrailerModel;
  }

  async createTrailer(data) {
    return this.#model.create(data);
  }

  async findAll(filter = {}, options = {}) {
    const q = this.#model.find(filter);
    if (options.sort) q.sort(options.sort);
    if (options.limit) q.limit(options.limit);
    if (options.skip) q.skip(options.skip);
    return q.exec();
  }

  async findById(id) {
    return this.#model.findById(id);
  }

  async updateById(id, update, options = { new: true }) {
    return this.#model.findByIdAndUpdate(id, update, options);
  }

  async deleteById(id) {
    return this.#model.findByIdAndDelete(id);
  }

  async findByPlate(plateNumber) {
    return this.#model.findOne({ plateNumber });
  }
}

export default new TrailerRepository();
