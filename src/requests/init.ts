import * as request from 'request-promise';
import { RequestError, StatusCodeError } from 'request-promise/errors';
import { ReturnCode } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { InitResponse } from '../responses/responsetypes';
import { BaseRequest, RequestHeaders } from './requesttypes';

// tslint:disable-next-line
export interface InitRequest extends BaseRequest {}

/**
 * `/init` request
 * @param req
 * @param headers
 * @param options
 */
export const init = (headers: RequestHeaders, options: HVVClientOptions, req: InitRequest): Promise<InitResponse> => {
  return new Promise<InitResponse>((resolve, reject) => {
    request({
      uri: `${options.host}/gti/public/init`,
      method: 'POST',
      body: req,
      headers,
      json: true
    })
      .then(res => normalizeResponse(res, resolve, reject))
      .catch(StatusCodeError, e => reject(e))
      .catch(RequestError, e => reject(e));
  });
};

const normalizeResponse = (res: any, resolve: (value: InitResponse) => void, reject: (reason: any) => void): void => {
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
};
