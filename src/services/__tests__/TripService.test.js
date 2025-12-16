import * as jestGlobals from '@jest/globals';
const { describe, beforeEach, test, expect, jest } = jestGlobals;
import { TripService } from '../TripService.js';

describe('TripService', () => {
  let repoMock;
  let service;

  beforeEach(() => {
    repoMock = {
      createTrip: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
      findByDriver: jest.fn()
    };
    service = new TripService(repoMock);
  });

  test('create delegates to repo', async () => {
    repoMock.createTrip.mockResolvedValue({ _id: '1', title: 'T1' });
    const res = await service.create({ title: 'T1' });
    expect(repoMock.createTrip).toHaveBeenCalledWith({ title: 'T1' });
    expect(res.title).toBe('T1');
  });

  test('list delegates to repo with filter/options', async () => {
    repoMock.findAll.mockResolvedValue([{ _id: '1' }]);
    const res = await service.list({ status: 'TO_DO' }, { limit: 5 });
    expect(repoMock.findAll).toHaveBeenCalledWith({ status: 'TO_DO' }, { limit: 5 });
    expect(res).toEqual([{ _id: '1' }]);
  });

  test('listByDriver delegates to repo', async () => {
    repoMock.findByDriver.mockResolvedValue([{ _id: '1' }]);
    const res = await service.listByDriver('driver1');
    expect(repoMock.findByDriver).toHaveBeenCalledWith('driver1');
    expect(res).toEqual([{ _id: '1' }]);
  });

  test('getById returns trip when found', async () => {
    repoMock.findById.mockResolvedValue({ _id: '1' });
    const res = await service.getById('1');
    expect(repoMock.findById).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });

  test('getById throws when not found', async () => {
    repoMock.findById.mockResolvedValue(null);
    await expect(service.getById('1')).rejects.toThrow('Trip not found');
  });

  test('update returns updated trip when found', async () => {
    repoMock.updateById.mockResolvedValue({ _id: '1', status: 'DONE' });
    const res = await service.update('1', { status: 'DONE' });
    expect(repoMock.updateById).toHaveBeenCalledWith('1', { status: 'DONE' });
    expect(res.status).toBe('DONE');
  });

  test('update throws when not found', async () => {
    repoMock.updateById.mockResolvedValue(null);
    await expect(service.update('1', {})).rejects.toThrow('Trip not found');
  });

  test('remove deletes when found', async () => {
    repoMock.deleteById.mockResolvedValue({ _id: '1' });
    const res = await service.remove('1');
    expect(repoMock.deleteById).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });

  test('remove throws when not found', async () => {
    repoMock.deleteById.mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow('Trip not found');
  });
});
