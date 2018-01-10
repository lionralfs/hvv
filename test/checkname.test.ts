import { HVVClient } from '../src';
import { CoordinateType, SDType, ReturnCode } from '../src/enums';
import { CNRequest } from '../src/request';
jest.mock('../src/requests/checkname');

const client = new HVVClient({
  user: 'test',
  key: 'test'
});

const reqParams: CNRequest = {
  theName: {
    name: 'Altona',
    city: 'Hamburg',
    combinedName: 'Altona',
    id: 'ALTONAID123',
    type: SDType.STATION,
    coordinate: {
      x: 9.962371,
      y: 53.569501
    },
    serviceTypes: [],
    hasStationInformation: false
  },
  maxList: 1,
  maxDistance: 1000,
  coordinateType: CoordinateType.EPSG_4326,
  tariffDetails: false,
  allowTypeSwitch: false
};

describe('#checkName()', () => {
  test('it should have OK as its return code', async () => {
    const data = await client.checkName(reqParams);
    expect(data).toBeDefined();
    expect(data.returnCode).toBe(ReturnCode.OK);
  });
});
