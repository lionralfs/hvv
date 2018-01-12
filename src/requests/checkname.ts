import * as request from 'request-promise';
import * as errors from 'request-promise/errors';
import { ReturnCode, SDType } from '../enums';
import { HVVClientOptions } from '../index';
import { CNRequest } from '../request';
import { CNResponse } from '../response';

interface Headers {
  'Content-Type': string;
  'Accept-Encoding'?: string;
  Accept: string;
  'geofox-auth-signature': string;
  'geofox-auth-user': string;
  'geofox-auth-type': string;
  'X-Platform'?: string;
  'X-TraceId'?: string;
}

// TODO: add an actual http request here
export default (req: CNRequest, options: HVVClientOptions): Promise<CNResponse> => {
  const headers: Headers = {
    'Content-Type': `${options.contentType};charset=UTF-8`,
    Accept: options.accept,
    'geofox-auth-signature': 'G9sE5wm9vpYu441iJ7Ag5vPKerw=',
    'geofox-auth-user': options.user,
    'geofox-auth-type': 'HmacSHA1'
  };

  if (options.acceptEncoding) {
    headers['Accept-Encoding'] = options.acceptEncoding;
  }
  if (options.platform) {
    headers['X-Platform'] = options.platform;
  }

  request({
    uri: `${options.host}/gti/public/checkName`,
    simple: false,
    headers
  })
    .then(res => console.log(res))
    .catch(errors.StatusCodeError, e => console.log(e.statusCode));
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
