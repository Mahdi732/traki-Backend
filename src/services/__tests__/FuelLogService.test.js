import * as jestGlobals from '@jest/globals';
const { describe, beforeEach, test, expect, jest } = jestGlobals;
import { FuelLogService } from '../FuelLogService.js';

describe('FuelLogService', () => {
  let repoMock;
  let service;

  beforeEach(() => {
    repoMock = {
      createLog: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn()
    };
    service = new FuelLogService(repoMock);
  });

  test('create delegates to repo', async () => {
    repoMock.createLog.mockResolvedValue({ _id: '1', volume: 50 });
    const res = await service.create({ truck: 't1', volume: 50 });
    expect(repoMock.createLog).toHaveBeenCalledWith({ truck: 't1', volume: 50 });
    expect(res.volume).toBe(50);
  });

  test('list delegates to repo', async () => {
    repoMock.findAll.mockResolvedValue([{ _id: '1' }]);
    const res = await service.list({}, { limit: 5 });
    expect(repoMock.findAll).toHaveBeenCalledWith({}, { limit: 5 });
    expect(res).toEqual([{ _id: '1' }]);
  });

  test('getById returns log when found', async () => {
    repoMock.findById.mockResolvedValue({ _id: '1' });
    const res = await service.getById('1');
    expect(repoMock.findById).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });

  test('getById throws when not found', async () => {
    repoMock.findById.mockResolvedValue(null);
    await expect(service.getById('1')).rejects.toThrow('Fuel log not found');
  });

  test('remove deletes when found', async () => {
    repoMock.deleteById.mockResolvedValue({ _id: '1' });
    const res = await service.remove('1');
    expect(repoMock.deleteById).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });

  test('remove throws when not found', async () => {
    repoMock.deleteById.mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow('Fuel log not found');
  });
});
