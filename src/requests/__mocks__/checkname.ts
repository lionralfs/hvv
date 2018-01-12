import { ReturnCode, SDType } from '../../enums';
import { CNResponse } from '../../responses/responsetypes';
import { CNRequest } from '../requesttypes';

const response: CNResponse = {
  returnCode: ReturnCode.OK,
  results: [
    {
      name: 'Altona',
      city: 'Hamburg',
      combinedName: 'Christuskirche',
      id: 'Master:84902',
      type: SDType.STATION,
      coordinate: {
        x: 9.962371,
        y: 53.569501
      },
      serviceTypes: ['u', 'bus'],
      distance: 0,
      time: 1000,
      hasStationInformation: false
    }
  ]
};

const checkname = (req: CNRequest) => {
  return new Promise((resolve, reject) => {
    resolve(response);
  });
};

export default checkname;
