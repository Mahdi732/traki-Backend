import TripService from '../services/TripService.js';
import PDFDocument from 'pdfkit';

class TripController {
  #service;

  constructor(service = TripService) {
    this.#service = service;
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.myTrips = this.myTrips.bind(this);
    this.download = this.download.bind(this);
  }

  async create(req, res, next) {
    try {
      const payload = req.body;
      const trip = await this.#service.create(payload);
      res.status(201).json(trip);
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const filter = {};
      const trips = await this.#service.list(filter);
      res.json(trips);
    } catch (err) {
      next(err);
    }
  }

  async myTrips(req, res, next) {
    try {
      const userId = req.user.id;
      const trips = await this.#service.listByDriver(userId);
      res.json(trips);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const trip = await this.#service.getById(id);
      if (req.user.role !== 'ADMIN' && (!trip.driver || trip.driver._id.toString() !== req.user.id)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      res.json(trip);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const update = req.body;
      const trip = await this.#service.getById(id);
      if (req.user.role !== 'ADMIN' && (!trip.driver || trip.driver._id.toString() !== req.user.id)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      const updated = await this.#service.update(id, update);
      res.json(updated);
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

  async download(req, res, next) {
    try {
      const { id } = req.params;
      const trip = await this.#service.getById(id);
      if (req.user.role !== 'ADMIN' && (!trip.driver || trip.driver._id.toString() !== req.user.id)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      // Generate PDF on the server and stream it to the client
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="trip-${id}.pdf"`);

      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      doc.pipe(res);

      // Header
      doc.fontSize(20).text(trip.title || 'Trip Details', { align: 'left' });
      doc.moveDown(0.5);

      // Basic info
      const start = trip.plannedStart ? new Date(trip.plannedStart).toLocaleString() : 'N/A';
      const end = trip.plannedEnd ? new Date(trip.plannedEnd).toLocaleString() : 'N/A';

      doc.fontSize(12).text(`Status: ${trip.status || 'N/A'}`);
      doc.text(`Planned Start: ${start}`);
      doc.text(`Planned End: ${end}`);
      doc.moveDown(0.5);

      // Route
      doc.fontSize(14).text('Route', { underline: true });
      doc.moveDown(0.2);
      doc.fontSize(12).text(`From: ${trip.origin || 'N/A'}`);
      doc.text(`To: ${trip.destination || 'N/A'}`);
      doc.moveDown(0.5);

      // Driver & Truck
      doc.fontSize(14).text('Assignment', { underline: true });
      doc.moveDown(0.2);
      const driverName = trip.driver ? (trip.driver.name || trip.driver) : 'Not assigned';
      const driverEmail = trip.driver && trip.driver.email ? ` <${trip.driver.email}>` : '';
      doc.fontSize(12).text(`Driver: ${driverName}${driverEmail}`);
      if (trip.truck) {
        const truckInfo = typeof trip.truck === 'object' ? `${trip.truck.plateNumber || ''} ${trip.truck.make || ''} ${trip.truck.model || ''}` : String(trip.truck);
        doc.text(`Truck: ${truckInfo}`);
      } else {
        doc.text('Truck: Not assigned');
      }
      doc.moveDown(0.5);

      // Description
      if (trip.description) {
        doc.fontSize(14).text('Notes', { underline: true });
        doc.moveDown(0.2);
        doc.fontSize(12).text(trip.description);
      }

      doc.end();
    } catch (err) {
      next(err);
    }
  }
}

export default new TripController();
