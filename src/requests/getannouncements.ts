import * as request from 'request-promise';
import { RequestError, StatusCodeError } from 'request-promise/errors';
import { ReturnCode, AnnouncementFilterPlannedType } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { generateHeaders } from '../request';
import { AnnouncementResponse } from '../responses/responsetypes';
import { BaseRequest, RequestHeaders } from './requesttypes';
import { TimeRange } from '../penalties';

export interface AnnouncementRequest extends BaseRequest {
  names?: string[];
  timeRange?: TimeRange;
  full?: boolean;
  filterPlanned?: AnnouncementFilterPlannedType;
}

export const getAnnouncements = (
  headers: RequestHeaders,
  options: HVVClientOptions,
  req: AnnouncementRequest
): Promise<AnnouncementResponse> => {
  return new Promise<AnnouncementResponse>((resolve, reject) => {
    request({
      uri: `${options.host}/gti/public/getAnnouncements`,
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

const normalizeResponse = (
  res: any,
  resolve: (value: AnnouncementResponse) => void,
  reject: (reason: any) => void
): void => {
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
