import FuelLogModel from '../models/FuelLog.js';

class FuelLogRepository {
  #model;

  constructor() {
    this.#model = FuelLogModel;
  }

  async createLog(data) {
    return this.#model.create(data);
  }

  async findAll(filter = {}, options = {}) {
    const q = this.#model.find(filter).populate('truck').populate('driver');
    if (options.sort) q.sort(options.sort);
    if (options.limit) q.limit(options.limit);
    if (options.skip) q.skip(options.skip);
    return q.exec();
  }

  async findById(id) {
    return this.#model.findById(id).populate('truck').populate('driver');
  }

  async deleteById(id) {
    return this.#model.findByIdAndDelete(id);
  }
}

export default new FuelLogRepository();
