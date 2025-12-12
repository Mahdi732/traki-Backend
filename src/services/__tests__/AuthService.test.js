import * as jestGlobals from '@jest/globals';
const { describe, beforeEach, test, expect, jest } = jestGlobals;
import { AuthService } from '../AuthService.js';

describe('AuthService', () => {
  let userRepoMock;
  let passwordMock;
  let jwtMock;
  let service;

  beforeEach(() => {
    userRepoMock = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
      updateById: jest.fn(),
      findById: jest.fn()
    };
    passwordMock = {
      hash: jest.fn(),
      compare: jest.fn()
    };
    jwtMock = {
      signAccess: jest.fn()
    };

    service = new AuthService({ userRepo: userRepoMock, password: passwordMock, jwt: jwtMock });
  });

  test('registers a new user when email not existing', async () => {
    userRepoMock.findByEmail.mockResolvedValue(null);
    passwordMock.hash.mockResolvedValue('hashedpw');
    userRepoMock.createUser.mockResolvedValue({ _id: '1', name: 'n', email: 'e', role: 'DRIVER' });

    const res = await service.register({ name: 'n', email: 'e', password: 'p' });

    expect(passwordMock.hash).toHaveBeenCalledWith('p');
    expect(userRepoMock.createUser).toHaveBeenCalled();
    expect(res.email).toBe('e');
  });

  test('register throws when email already in use', async () => {
    userRepoMock.findByEmail.mockResolvedValue({ _id: '1' });

    await expect(service.register({ name: 'n', email: 'e', password: 'p' })).rejects.toThrow('Email already in use');
  });

  test('login returns user and token on success', async () => {
    const user = { _id: '1', passwordHash: 'h', role: 'DRIVER', email: 'e' };
    userRepoMock.findByEmail.mockResolvedValue(user);
    passwordMock.compare.mockResolvedValue(true);
    jwtMock.signAccess.mockReturnValue('token123');

    const res = await service.login({ email: 'e', password: 'p' });

    expect(passwordMock.compare).toHaveBeenCalledWith('p', 'h');
    expect(res.accessToken).toBe('token123');
    expect(res.user.email).toBe('e');
  });

  test('login throws when user not found', async () => {
    userRepoMock.findByEmail.mockResolvedValue(null);

    await expect(service.login({ email: 'e', password: 'p' })).rejects.toThrow('Invalid credentials');
  });

  test('login throws when password mismatch', async () => {
    userRepoMock.findByEmail.mockResolvedValue({ _id: '1', passwordHash: 'h' });
    passwordMock.compare.mockResolvedValue(false);

    await expect(service.login({ email: 'e', password: 'p' })).rejects.toThrow('Invalid credentials');
  });

  test('logout updates lastLoggedOutAt', async () => {
    userRepoMock.updateById.mockResolvedValue(true);
    await service.logout('123');
    expect(userRepoMock.updateById).toHaveBeenCalledWith('123', expect.objectContaining({ lastLoggedOutAt: expect.any(Date) }));
  });

  test('getUserById delegates to repository', async () => {
    userRepoMock.findById.mockResolvedValue({ _id: '1', email: 'e' });
    const res = await service.getUserById('1');
    expect(userRepoMock.findById).toHaveBeenCalledWith('1');
    expect(res.email).toBe('e');
  });
});
