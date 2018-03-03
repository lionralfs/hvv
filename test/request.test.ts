import { HVVClient } from '../src/';
import { CNRequest } from '../src/requests/checkname';
import { ReturnCode } from '../src/enums';

jest.mock('request-promise', () =>
  jest.fn(req => {
    return new Promise((resolve, reject) => {
      const baseResponse = { returnCode: 'OK', response: req };
      baseResponse.response.body = JSON.parse(req.body);

      resolve(JSON.stringify(baseResponse));
    });
  })
);

const client = new HVVClient({
  user: 'test',
  key: 'test'
});

describe('request', () => {
  test('it should correctly sign the request', async () => {
    const data: any = await client.init({});
    expect(data.response.headers['geofox-auth-user']).toBe('test');
    expect(data.response.headers['geofox-auth-type']).toBe('HmacSHA1');
    expect(data.response.headers['geofox-auth-signature']).toBe('eHbJONOOmblUs9g5x7r7ND0p53Y=');
  });

  test('it should the correct Content-Type headers', async () => {
    const data: any = await client.init({});
    expect(data.response.headers['Content-Type']).toBe('application/json;charset=UTF-8');
  });

  test('it should the correct acceptEncoding headers', async () => {
    let data: any = await client.init({});
    expect(data.response.headers['Accept-Encoding']).toBeUndefined();
    expect(data.response.gzip).toBe(false);

    let clnt = new HVVClient({ user: 'test', key: 'test', acceptEncoding: 'gzip' });
    data = await clnt.init({});
    expect(data.response.headers['Accept-Encoding']).toBe('gzip');
    expect(data.response.gzip).toBe(true);

    clnt = new HVVClient({ user: 'test', key: 'test', acceptEncoding: 'deflate' });
    data = await clnt.init({});
    expect(data.response.headers['Accept-Encoding']).toBe('deflate');
    expect(data.response.gzip).toBe(true);
  });

  test('it should set a X-TraceId uuid', async () => {
    const data: any = await client.init({});
    expect(data.response.headers['X-TraceId']).toHaveLength(36);
  });

  test('it should not use an API version by default', async () => {
    const data: any = await client.init({});
    expect(data.response.body.version).toBeUndefined();
  });

  test('it should use an API version when specified via options', async () => {
    const clnt = new HVVClient({
      user: 'test',
      key: 'test',
      version: 31
    });

    const data: any = await clnt.init({});
    expect(data.response.body.version).toBe(31);
  });

  test('it should override an API version', async () => {
    const clnt = new HVVClient({
      user: 'test',
      key: 'test',
      version: 30
    });

    const data: any = await clnt.init({ version: 31 });
    expect(data.response.body.version).toBe(31);
  });
});
