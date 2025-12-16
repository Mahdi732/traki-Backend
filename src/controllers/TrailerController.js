import TrailerService from '../services/TrailerService.js';

class TrailerController {
  #service;

  constructor(service = TrailerService) {
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
      const trailer = await this.#service.create(payload);
      res.status(201).json(trailer);
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const filter = {};
      const trailers = await this.#service.list(filter);
      res.json(trailers);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const trailer = await this.#service.getById(id);
      res.json(trailer);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const update = req.body;
      const trailer = await this.#service.update(id, update);
      res.json(trailer);
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

export default new TrailerController();
