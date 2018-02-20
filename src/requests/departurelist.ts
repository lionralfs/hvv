import { ReturnCode, SDType, CoordinateType, FilterServiceType } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { sendAndDecode } from '../request';
import { SDName, GTITime, Service, Attribute } from '../othertypes';
import { BaseRequest } from './requesttypes';
import { BaseResponseType } from '../responses/responsetypes';

/**
 * Departure list request. Get a list of departures at a given time for a given station.
 * Either `station` or `stations` is required.
 */
export interface DLRequest extends BaseRequest {
  /** The station the departures are requested for. */
  station?: SDName;
  /** The stations the departures are requested for. */
  stations?: SDName[];
  /** The time for the request. Including date and time. */
  time: GTITime;
  /** The maximum number of elements the result may have. */
  maxList?: number;
  /** The maximum offset of a result in minutes. */
  maxTimeOffset?: number;
  /**
   * If this is set to true and the given station is a changing node with equivalent stations
   * (e.g. Wedel and S Wedel), the result would contain departures of all equivalent stations.
   * Default is `true`.
   */
  allStationsInChangingNode?: boolean;
  /** if true, a list of possible DLFilterEntries for this request will be returned. */
  returnFilters?: boolean;
  /**
   * List of filter entries that contains lines and directions/stations.
   * Only Departures that fits to any of these filter entries will be returned.
   * An empty list will deactivate the filter.
   * since API version 20
   */
  filter?: FilterEntry[];
  /** A list of servicetypes to filter the result list. since API version 22 */
  serviceTypes?: FilterServiceType[];
  /**
   * `true` = server is calculating a result based on realtime data.
   * `false` = server only uses plan data for calculating result.
   */
  useRealtime?: boolean;
  /** if false, an arrival list will be returned instead of a departure list. default: `true` */
  departure?: boolean;
}

/**
 * Filter for DLRequest.
 * since API version 20
 */
export interface FilterEntry {
  /** ID of the Departure's service. Either serviceID or stationID must be filled in for Request. */
  serviceID?: string;
  /**
   * IDs of stations of which one must be on the journey after (before in case of departure=`false`)
   * the reference station. Either serviceID or stationIDs must be filled for Request.
   */
  stationIDs?: string[];
  /** A string that represents the public name of the service. */
  serviceName?: string;
  /**
   * A string that discribes the direction for the user.
   * This field could be empty in DLRequest (server will not evaluate this field) and is allways filled
   * in the list of possible filter entries in DLResponse.
   */
  label?: string;
}

/**
 * The response for a DLRequest with a list of Departures.
 */
export interface DLResponse extends BaseResponseType {
  /** The time when the departure list is requested. */
  time?: GTITime;
  /** The resulting list of departures or arrivals. */
  departures?: Departure[];
  /**
   * A list of possible values for DLFilterEntries for the given request.
   * Will be filled if `returnFilters` in request is set to `true`
   * since API version 20
   */
  filter?: FilterEntry;
  /** A list of servicetypes that serves this station. since API version 22 */
  serviceTypes?: FilterServiceType;
}

/**
 * A departure with line, timeOffset and direction.
 */
export interface Departure {
  /** The line which departs. */
  line?: Service;
  /** The scheduled time in minutes when the line will depart/arrive. This value could be negative on delayed trains! */
  timeOffset?: number;
  /**
   * Contains the station of the desired changing node for this departure.
   * Is only filled if allStationsInChangingNode in request is true.
   * In order to reduce traffic on mobile devices, only the unique combinedName will be returned.
   * The completely filled SDName object can be requested by CNRequest.
   * since API version 7
   */
  station?: SDName;
  /** A unique ID for each journey (Fahrt-ID). since API version 7 */
  serviceId?: number;
  /** The scheduled platform (Gleis) of this hold. If no platform info is available this element will be null. since API version 11 */
  platform?: string;
  /** realtime delay in seconds. since API version 19 */
  delay?: number;
  /** realtime flag to mark additional journeys to those of the intended schedule. since API version 19 */
  extra?: boolean;
  /** realtime flag to mark cancelled journeys. since API version 19 */
  cancelled?: boolean;
  /** The realtime platform (Gleis) of this hold. If no realtime platform info is available this element will be null. since API version 21 */
  realtimePlatform?: string;
  /** A list with additional textual informations about this journey. since API version 23 */
  attributes?: Attribute;
}

export const departureList = (options: HVVClientOptions, req: DLRequest): Promise<DLResponse> => {
  return new Promise<DLResponse>((resolve, reject) => {
    sendAndDecode('/gti/public/departureList', options, req)
      .then(res => normalizeResponse(res))
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

const normalizeResponse = (res: any): Promise<DLResponse> => {
  return new Promise<DLResponse>((resolve, reject) => {
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
