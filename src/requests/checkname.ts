import * as request from 'request-promise';
import { ReturnCode, SDType } from '../enums';
import { CNRequest } from '../request';
import { CNResponse } from '../response';

// TODO: add an actual http request here
export default (req: CNRequest): Promise<CNResponse> => {
  return new Promise(resolve => {
    const response: CNResponse = {
      returnCode: ReturnCode.OK,
      results: [
        {
          name: 'Christuskirche',
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

    resolve(response);
  });
};
