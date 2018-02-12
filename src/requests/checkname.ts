import * as request from 'request-promise';
import { RequestError, StatusCodeError } from 'request-promise/errors';
import { ReturnCode, SDType, CoordinateType } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { generateHeaders } from '../request';
import { CNResponse } from '../responses/responsetypes';
import { BaseRequest, RequestHeaders } from './requesttypes';
import { SDName } from '../othertypes';

export interface CNRequest extends BaseRequest {
  theName: SDName;
  maxList?: number;
  maxDistance?: number;
  coordinateType?: CoordinateType;
  tariffDetails?: boolean;
  allowTypeSwitch?: boolean;
}

export const checkName = (headers: RequestHeaders, options: HVVClientOptions, req: CNRequest): Promise<CNResponse> => {
  return new Promise<CNResponse>((resolve, reject) => {
    request({
      uri: `${options.host}/gti/public/checkName`,
      method: 'POST',
      body: req,
      headers,
      json: true
    })
      .then(res => {
        switch (res.returnCode) {
          case ReturnCode.OK:
            resolve(res);
            break;
          case ReturnCode.ERROR_CN_TOO_MANY:
          case ReturnCode.ERROR_COMM:
          case ReturnCode.ERROR_ROUTE:
          case ReturnCode.ERROR_TEXT:
            reject(res);
            break;
          default:
            reject('unknown returnCode');
        }
      })
      .catch(StatusCodeError, reason => {
        // The server responded with a status codes other than 2xx.
        // Check reason.statusCode
        reject(reason);
      })
      .catch(RequestError, reason => {
        // The request failed due to technical reasons.
        // reason.cause is the Error object Request would pass into a callback.
        reject(reason);
      });
  });
};
