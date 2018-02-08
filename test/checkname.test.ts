import { HVVClient } from '../src';
import { CoordinateType, ReturnCode, SDType } from '../src/enums';
import { CNRequest } from '../src/requests/requesttypes';

jest.mock('request-promise', () =>
  jest.fn(req => {
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

      if (req.body.__simulateResponse__) {
        resolve({ ...baseResponse, ...req.body.__simulateResponse__ });
      } else {
        resolve(baseResponse);
      }
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

describe('#checkName()', () => {
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

  test('it should reject when returnCode is undefined', async () => {
    const req = {
      ...baseRequest,
      __simulateResponse__: {
        returnCode: undefined
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
