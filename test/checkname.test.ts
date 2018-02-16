import { HVVClient } from '../src/';
import { CNRequest } from '../src/requests/checkname';
import { ReturnCode } from '../src/enums';

jest.mock('request-promise', () =>
  jest.fn(req => {
    const body = JSON.parse(req.body);
    return new Promise((resolve, reject) => {
      const baseResponse = {
        returnCode: 'OK',
        results: [
          {
            name: 'Altona',
            city: 'Hamburg',
            id: 'Master:80953',
            type: 'STATION',
            coordinate: {
              x: 9.934376,
              y: 53.551968
            }
          }
        ]
      };

      let response = JSON.stringify(baseResponse);
      if (body.__simulateResponse__) {
        response = JSON.stringify({ ...baseResponse, ...body.__simulateResponse__ });
      }
      resolve(response);
    });
  })
);

const client = new HVVClient({
  user: 'test',
  key: 'test'
});

const baseRequest: CNRequest = {
  theName: {
    name: 'Altona'
  }
};

describe('checkName', () => {
  test('it should resolve when returnCode is OK', async () => {
    const data = await client.checkName(baseRequest);
    expect(data).toBeDefined();
    expect(data.returnCode).toBe(ReturnCode.OK);
  });

  test('it should reject when returnCode is ERROR_CN_TOO_MANY', async () => {
    const req = {
      ...baseRequest,
      __simulateResponse__: {
        returnCode: ReturnCode.ERROR_CN_TOO_MANY
      }
    };
    expect.assertions(1);
    try {
      await client.checkName(req);
    } catch (e) {
      expect(e.returnCode).toBe(ReturnCode.ERROR_CN_TOO_MANY);
    }
  });

  test('it should reject when returnCode is unknown', async () => {
    const req = {
      ...baseRequest,
      __simulateResponse__: {
        returnCode: 'purposely invalid return code'
      }
    };
    expect.assertions(1);
    try {
      await client.checkName(req);
    } catch (e) {
      expect(e).toBe('unknown returnCode');
    }
  });
});
