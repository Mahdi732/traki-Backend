import TripModel from '../models/Trip.js';

class TripRepository {
  #model;

  constructor() {
    this.#model = TripModel;
  }

  async createTrip(data) {
    return this.#model.create(data);
  }

  async findAll(filter = {}, options = {}) {
    const filtred = this.#model.find(filter).populate('truck').populate('driver');
    if (options.sort) filtred.sort(options.sort);
    if (options.limit) filtred.limit(options.limit);
    if (options.skip) filtred.skip(options.skip);
    return filtred.exec();
  }

  async findById(id) {
    return this.#model.findById(id).populate('truck').populate('driver');
  }

  async updateById(id, update, options = { new: true }) {
    return this.#model.findByIdAndUpdate(id, update, options).populate('truck').populate('driver');
  }

  async deleteById(id) {
    return this.#model.findByIdAndDelete(id);
  }

  async findByDriver(driverId) {
    return this.#model.find({ driver: driverId }).populate('truck').populate('driver').exec();
  }
}

export default new TripRepository();
