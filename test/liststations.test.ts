import { HVVClient } from '../src/';
import { LSRequest } from '../src/requests/liststations';
import { LSResponse } from '../src/responses/responsetypes';

jest.mock('request-promise', () =>
  jest.fn(req => {
    return new Promise((resolve, reject) => {
      const baseResponse = {
        returnCode: 'OK',
        dataReleaseID: '30.25.01',
        stations: [
          {
            id: 'Master:10000',
            name: 'Billhorner Deich',
            city: 'Hamburg',
            combinedName: 'Billhorner Deich',
            vehicleTypes: ['REGIONALBUS', 'NACHTBUS'],
            coordinate: {
              x: 10.042501,
              y: 53.534181
            }
          },
          {
            id: 'Master:10001',
            name: 'HBF/Steintorwall',
            city: 'Hamburg',
            combinedName: 'HBF/Steintorwall',
            aliasses: ['Hauptbahnhof/Steintorwall'],
            vehicleTypes: ['REGIONALBUS'],
            coordinate: {
              x: 10.005755,
              y: 53.551775
            }
          },
          {
            id: 'Master:10002',
            name: 'Hauptbahnhof/ZOB',
            city: 'Hamburg',
            combinedName: 'Hauptbahnhof/ZOB',
            shortcuts: ['zal'],
            aliasses: ['Hamburg ZOB', 'Hbf ZOB'],
            vehicleTypes: ['REGIONALBUS', 'NACHTBUS', 'SCHNELLBUS'],
            coordinate: {
              x: 10.010345,
              y: 53.551889
            }
          },
          {
            id: 'Master:10003',
            name: 'U S Berliner Tor (Beim Strohhause)',
            city: 'Hamburg',
            combinedName: 'U S Berliner Tor (Beim Strohhause)',
            vehicleTypes: ['NACHTBUS', 'SCHNELLBUS'],
            coordinate: {
              x: 10.023087,
              y: 53.553452
            }
          }
        ]
      };
      resolve(JSON.stringify(baseResponse));
    });
  })
);

const client = new HVVClient({
  user: 'test',
  key: 'test'
});

describe('listStations', () => {
  test('it should support the `simple` option', async () => {
    const data: LSResponse = await client.listStations(null, { simple: true });
    const keys = Object.keys(data.stations[0]);
    expect(keys.length).toBe(4);
    expect(keys).toEqual(expect.arrayContaining(['id', 'name', 'city', 'coordinate']));
  });
});
