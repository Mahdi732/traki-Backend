import TruckService from '../services/TruckService.js';

class TruckController {
  #service;

  constructor(service = TruckService) {
    this.#service = service;
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async create(req, res, next) {
    try {
      const payload = req.body;
      const truck = await this.#service.create(payload);
      res.status(201).json(truck);
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const filter = {};
      const trucks = await this.#service.list(filter);
      res.json(trucks);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const truck = await this.#service.getById(id);
      res.json(truck);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const update = req.body;
      const truck = await this.#service.update(id, update);
      res.json(truck);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

export default new TruckController();
