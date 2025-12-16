import FuelLogService from '../services/FuelLogService.js';

class FuelLogController {
  #service;

  constructor(service = FuelLogService) {
    this.#service = service;
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.getById = this.getById.bind(this);
    this.remove = this.remove.bind(this);
  }

  async create(req, res, next) {
    try {
      const payload = req.body || {};
      if (req.user && !payload.driver) {
        payload.driver = req.user.id;
      }
      const log = await this.#service.create(payload);
      res.status(201).json(log);
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const filter = {};
      const logs = await this.#service.list(filter);
      res.json(logs);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const log = await this.#service.getById(id);
      res.json(log);
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

export default new FuelLogController();
