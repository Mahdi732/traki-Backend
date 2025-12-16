import TruckModel from '../models/Truck.js';

class TruckRepository {
  #model;

  constructor() {
    this.#model = TruckModel;
  }

  async createTruck(data) {
    return this.#model.create(data);
  }

  async findAll(filter = {}, options = {}) {
    const filtred = this.#model.find(filter);
    if (options.sort) filtred.sort(options.sort);
    if (options.limit) filtred.limit(options.limit);
    if (options.skip) filtred.skip(options.skip);
    return filtred.exec();
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

export default new TruckRepository();
