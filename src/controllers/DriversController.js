import UserService from '../services/UserService.js';

class DriversController {
  #service;

  constructor(service = UserService) {
    this.#service = service;
    this.list = this.list.bind(this);
    this.getById = this.getById.bind(this);
  }

  async list(req, res, next) {
    try {
      const drivers = await this.#service.listDrivers();
      res.json(drivers);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.#service.getById(id);
      if (!user) {
        const err = new Error('Driver not found');
        err.status = 404;
        throw err;
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new DriversController();
