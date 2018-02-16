import { BaseRequest, RequestHeaders } from './requesttypes';
import { HVVClientOptions } from '../hvvclient';
import { SDName, GTITime, ContSearchByServiceId, TariffInfoSelector } from '../othertypes';
import { CoordinateType, RealtimeType, SimpleServiceType, ReturnCode } from '../enums';
import { PenaltyInterface } from '../penalties';
import { BaseResponseType } from '../responses/responsetypes';
import { sendAndDecode } from '../request';

export interface GRRequest extends BaseRequest {
  start: SDName;
  dest: SDName;
  via?: SDName;
  time?: GTITime;
  timeIsDeparture?: boolean;
  numberOfSchedules?: number;
  tariffDetails?: boolean;
  continousSearch?: boolean;
  contSearchByServiceId?: ContSearchByServiceId;
  coordinateType?: CoordinateType;
  schedulesBefore?: number;
  schedulesAfter?: number;
  returnReduced?: boolean;
  tariffInfoSelector?: TariffInfoSelector[];
  penalties?: PenaltyInterface[];
  returnPartialTickets?: boolean;
  realtime?: RealtimeType;
  intermediateStops?: boolean;
  useStationPosition?: boolean;
  forcedStart?: SDName;
  forcedDest?: SDName;
  toStartBy?: SimpleServiceType;
  toDestBy?: SimpleServiceType;
  returnContSearchData?: boolean;
}

/** getRoute Response */
export interface GRResponse extends BaseResponseType {
  asdf: string; // TODO
}

/**
 * `/getRoute` request
 * @param headers
 * @param options
 * @param req
 */
export const getRoute = (options: HVVClientOptions, req: GRRequest) => {
  return new Promise<GRResponse>((resolve, reject) => {
    sendAndDecode('/gti/public/getRoute', options, req)
      .then(res => normalizeResponse(res))
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

const normalizeResponse = (res: any): Promise<GRResponse> => {
  return new Promise<GRResponse>((resolve, reject) => {
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
