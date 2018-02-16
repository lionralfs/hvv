import { ReturnCode, AnnouncementFilterPlannedType, AnnouncementReason } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { AnnouncementResponse } from '../responses/responsetypes';
import { BaseRequest, RequestHeaders } from './requesttypes';
import { TimeRange } from '../penalties';
import { sendAndDecode } from '../request';

export interface AnnouncementRequest extends BaseRequest {
  names?: string[];
  timeRange?: TimeRange;
  full?: boolean;
  filterPlanned?: AnnouncementFilterPlannedType;
}

export const getAnnouncements = (
  options: HVVClientOptions,
  req: AnnouncementRequest
): Promise<AnnouncementResponse> => {
  return new Promise<AnnouncementResponse>((resolve, reject) => {
    sendAndDecode('/gti/public/getAnnouncements', options, req)
      .then(res => normalizeResponse(res))
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

const normalizeResponse = (res: any): Promise<AnnouncementResponse> => {
  return new Promise<AnnouncementResponse>((resolve, reject) => {
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
