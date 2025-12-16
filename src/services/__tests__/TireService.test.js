import * as jestGlobals from '@jest/globals';
const { describe, beforeEach, test, expect, jest } = jestGlobals;
import { TireService } from '../TireService.js';

describe('TireService', () => {
  let repoMock;
  let service;

  beforeEach(() => {
    repoMock = {
      findBySerial: jest.fn(),
      createTire: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn()
    };
    service = new TireService(repoMock);
  });

  test('create creates when serial not exists', async () => {
    repoMock.findBySerial.mockResolvedValue(null);
    repoMock.createTire.mockResolvedValue({ _id: '1', serialNumber: 'S1' });
    const res = await service.create({ serialNumber: 'S1' });
    expect(repoMock.findBySerial).toHaveBeenCalledWith('S1');
    expect(repoMock.createTire).toHaveBeenCalledWith({ serialNumber: 'S1' });
    expect(res.serialNumber).toBe('S1');
  });

  test('create throws when serial exists', async () => {
    repoMock.findBySerial.mockResolvedValue({ _id: '1' });
    await expect(service.create({ serialNumber: 'S1' })).rejects.toThrow('Tire with this serial number already exists');
  });

  test('list delegates to repo with filter/options', async () => {
    repoMock.findAll.mockResolvedValue([{ _id: '1' }]);
    const res = await service.list({}, { limit: 10 });
    expect(repoMock.findAll).toHaveBeenCalledWith({}, { limit: 10 });
    expect(res).toEqual([{ _id: '1' }]);
  });

  test('getById returns tire when found', async () => {
    repoMock.findById.mockResolvedValue({ _id: '1' });
    const res = await service.getById('1');
    expect(repoMock.findById).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });

  test('getById throws when not found', async () => {
    repoMock.findById.mockResolvedValue(null);
    await expect(service.getById('1')).rejects.toThrow('Tire not found');
  });

  test('update returns updated tire when found', async () => {
    repoMock.updateById.mockResolvedValue({ _id: '1', status: 'WORN' });
    const res = await service.update('1', { status: 'WORN' });
    expect(repoMock.updateById).toHaveBeenCalledWith('1', { status: 'WORN' });
    expect(res.status).toBe('WORN');
  });

  test('update throws when not found', async () => {
    repoMock.updateById.mockResolvedValue(null);
    await expect(service.update('1', {})).rejects.toThrow('Tire not found');
  });

  test('remove deletes when found', async () => {
    repoMock.deleteById.mockResolvedValue({ _id: '1' });
    const res = await service.remove('1');
    expect(repoMock.deleteById).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });

  test('remove throws when not found', async () => {
    repoMock.deleteById.mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow('Tire not found');
  });
});
