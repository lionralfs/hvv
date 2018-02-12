import * as request from 'request-promise';
import { RequestError, StatusCodeError } from 'request-promise/errors';
import { ReturnCode, ModificationType, CoordinateType } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { generateHeaders } from '../request';
import { LSResponse } from '../responses/responsetypes';
import { BaseRequest, RequestHeaders } from './requesttypes';

export interface LSRequest extends BaseRequest {
  dataReleaseID?: string;
  modificationTypes?: ModificationType[];
  coordinateType?: CoordinateType;
  filterEquivalent?: boolean;
}

export const listStations = (
  headers: RequestHeaders,
  options: HVVClientOptions,
  req: LSRequest
): Promise<LSResponse> => {
  return new Promise<LSResponse>((resolve, reject) => {
    request({
      uri: `${options.host}/gti/public/listStations`,
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

const normalizeResponse = (res: any, resolve: (value: LSResponse) => void, reject: (reason: any) => void): void => {
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
