import {
  CoordinateType,
  FilterType,
  ModificationType,
  RealtimeType,
  SimpleServiceType,
  AnnouncementFilterPlannedType
} from '../enums';
import { ContSearchByServiceId, GTITime, SDName, TariffInfoSelector } from '../othertypes';
import { PenaltyInterface, TimeRange } from '../penalties';

export interface RequestHeaders {
  'Content-Type': string;
  'Accept-Encoding'?: string;
  Accept: string;
  'geofox-auth-signature': string;
  'geofox-auth-user': string;
  'geofox-auth-type': string;
  'X-Platform'?: string;
  'X-TraceId'?: string;
  'User-Agent'?: string;
  encoding?: string;
}

export interface BaseRequest {
  /**
   * Used version of GeofoxThinInterface on Client.
   */
  version?: number;
  /**
   * Language in which the server will respond. (de/en)
   */
  language?: 'de' | 'en';
  /**
   * Sets the filter for the result.
   */
  filterType?: FilterType;
}
