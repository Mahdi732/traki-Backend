import TireService from '../services/TireService.js';

class TireController {
  #service;

  constructor(service = TireService) {
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
      const tire = await this.#service.create(payload);
      res.status(201).json(tire);
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const filter = {};
      const tires = await this.#service.list(filter);
      res.json(tires);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const tire = await this.#service.getById(id);
      res.json(tire);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const update = req.body;
      const tire = await this.#service.update(id, update);
      res.json(tire);
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

export default new TireController();
