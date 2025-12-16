import TireModel from '../models/Tire.js';

class TireRepository {
  #model;

  constructor() {
    this.#model = TireModel;
  }

  async createTire(data) {
    return this.#model.create(data);
  }

  async findAll(filter = {}, options = {}) {
    const q = this.#model.find(filter).populate('truck');
    if (options.sort) q.sort(options.sort);
    if (options.limit) q.limit(options.limit);
    if (options.skip) q.skip(options.skip);
    return q.exec();
  }

  async findById(id) {
    return this.#model.findById(id).populate('truck');
  }

  async updateById(id, update, options = { new: true }) {
    return this.#model.findByIdAndUpdate(id, update, options).populate('truck');
  }

  async deleteById(id) {
    return this.#model.findByIdAndDelete(id);
  }

  async findBySerial(serialNumber) {
    return this.#model.findOne({ serialNumber });
  }
}

export default new TireRepository();
