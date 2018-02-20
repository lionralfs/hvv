import { ReturnCode, SDType, CoordinateType } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { CNResponse } from '../responses/responsetypes';
import { BaseRequest, RequestHeaders } from './requesttypes';
import { SDName } from '../othertypes';
import { sendAndDecode } from '../request';

/**
 * The check name request. The different types of requests are defined by the SDName object possible types are:
 * * Type STATION
 *    * name / city is set: the results are SDNames that match the name / city of the station
 *    * coordinate is set: the results are stations in the vicinity (use maxDistance) of the coordinate
 * * Type POI
 *    * name / city is set: the results are SDNames that match the name / city of the POI
 * * Type ADDRESS
 *    * name / city is set: the results are SDNames that match the name / city of the address
 * * Type COORDINATE
 *    * coordinate is set: the result is the nearest address to the coordinate (if available)
 */
export interface CNRequest extends BaseRequest {
  /** SDName object with the data to check. */
  theName: SDName;
  /** The maximum number of elements the result may have. */
  maxList?: number;
  /** The maximum distance (in meters) of stations that will be returned in a search for stations near to a coordinate. */
  maxDistance?: number;
  /** The type of the coordinate which the server should use in the response. Default is EPSG_4326 */
  coordinateType?: CoordinateType;
  /** Flag if detailed tariff information should be transferred. Default is false. */
  tariffDetails?: boolean;
  /** Flag if the server is allowed to offer results with different SDTypes than in the request. Default is true. */
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
