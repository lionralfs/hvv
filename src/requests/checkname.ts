import { ReturnCode, SDType, CoordinateType } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { CNResponse } from '../responses/responsetypes';
import { BaseRequest, RequestHeaders } from './requesttypes';
import { SDName } from '../othertypes';
import { sendAndDecode } from '../request';

export interface CNRequest extends BaseRequest {
  theName: SDName;
  maxList?: number;
  maxDistance?: number;
  coordinateType?: CoordinateType;
  tariffDetails?: boolean;
  allowTypeSwitch?: boolean;
}

export const checkName = (options: HVVClientOptions, req: CNRequest): Promise<CNResponse> => {
  return new Promise<CNResponse>((resolve, reject) => {
    sendAndDecode('/gti/public/checkName', options, req)
      .then(res => normalizeResponse(res))
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

const normalizeResponse = (res: any): Promise<CNResponse> => {
  return new Promise<CNResponse>((resolve, reject) => {
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
