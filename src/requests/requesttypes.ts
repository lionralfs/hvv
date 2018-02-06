import { CoordinateType, FilterType, ModificationType, RealtimeType, SimpleServiceType } from '../enums';
import { ContSearchByServiceId, GTITime, SDName, TariffInfoSelector } from '../othertypes';
import { PenaltyInterface } from '../penalties';

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
}

export interface BaseRequestType {
  version?: number;
  language?: 'de' | 'en';
  filterType?: FilterType;
}

/** checkName Request */
export interface CNRequest extends BaseRequestType {
  theName: SDName;
  maxList?: number;
  maxDistance?: number;
  coordinateType?: CoordinateType;
  tariffDetails?: boolean;
  allowTypeSwitch?: boolean;
}

/** getRoute Request */
export interface GRRequest extends BaseRequestType {
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

/** listStations Request */
export interface LSRequest extends BaseRequestType {
  dataReleaseID?: string;
  modificationTypes?: ModificationType[];
  coordinateType?: CoordinateType;
  filterEquivalent?: boolean;
}
