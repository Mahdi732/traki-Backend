import * as jestGlobals from '@jest/globals';
const { describe, beforeEach, test, expect, jest } = jestGlobals;
import { TrailerService } from '../TrailerService.js';

describe('TrailerService', () => {
  let repoMock;
  let service;

  beforeEach(() => {
    repoMock = {
      findByPlate: jest.fn(),
      createTrailer: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn()
    };
    service = new TrailerService(repoMock);
  });

  test('create creates when plate not exists', async () => {
    repoMock.findByPlate.mockResolvedValue(null);
    repoMock.createTrailer.mockResolvedValue({ _id: '1', plateNumber: 'T-1' });
    const res = await service.create({ plateNumber: 'T-1' });
    expect(repoMock.findByPlate).toHaveBeenCalledWith('T-1');
    expect(repoMock.createTrailer).toHaveBeenCalledWith({ plateNumber: 'T-1' });
    expect(res.plateNumber).toBe('T-1');
  });

  test('create throws when plate exists', async () => {
    repoMock.findByPlate.mockResolvedValue({ _id: '1' });
    await expect(service.create({ plateNumber: 'T-1' })).rejects.toThrow('Trailer with this plate number already exists');
  });

  test('list delegates to repo with filter/options', async () => {
    repoMock.findAll.mockResolvedValue([{ _id: '1' }]);
    const res = await service.list({}, { limit: 10 });
    expect(repoMock.findAll).toHaveBeenCalledWith({}, { limit: 10 });
    expect(res).toEqual([{ _id: '1' }]);
  });

  test('getById returns trailer when found', async () => {
    repoMock.findById.mockResolvedValue({ _id: '1' });
    const res = await service.getById('1');
    expect(repoMock.findById).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });

  test('getById throws when not found', async () => {
    repoMock.findById.mockResolvedValue(null);
    await expect(service.getById('1')).rejects.toThrow('Trailer not found');
  });

  test('update returns updated trailer when found', async () => {
    repoMock.updateById.mockResolvedValue({ _id: '1', status: 'INACTIVE' });
    const res = await service.update('1', { status: 'INACTIVE' });
    expect(repoMock.updateById).toHaveBeenCalledWith('1', { status: 'INACTIVE' });
    expect(res.status).toBe('INACTIVE');
  });

  test('update throws when not found', async () => {
    repoMock.updateById.mockResolvedValue(null);
    await expect(service.update('1', {})).rejects.toThrow('Trailer not found');
  });

  test('remove deletes when found', async () => {
    repoMock.deleteById.mockResolvedValue({ _id: '1' });
    const res = await service.remove('1');
    expect(repoMock.deleteById).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });

  test('remove throws when not found', async () => {
    repoMock.deleteById.mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow('Trailer not found');
  });
});
