import { ReturnCode } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { InitResponse } from '../responses/responsetypes';
import { BaseRequest, RequestHeaders } from './requesttypes';
import { sendAndDecode } from '../request';

// tslint:disable-next-line
export interface InitRequest extends BaseRequest {}

/**
 * `/init` request
 * @param req
 * @param headers
 * @param options
 */
export const init = (options: HVVClientOptions, req: InitRequest): Promise<InitResponse> => {
  return new Promise<InitResponse>((resolve, reject) => {
    sendAndDecode('/gti/public/init', options, req)
      .then(res => normalizeResponse(res))
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

const normalizeResponse = (res: any): Promise<InitResponse> => {
  return new Promise<InitResponse>((resolve, reject) => {
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
  });
};
