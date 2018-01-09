import { CoordinateType, FilterType, RealtimeType, SimpleServiceType } from './enums';
import { ContSearchByServiceId, GTITime, SDName, TariffInfoSelector } from './othertypes';
import { PenaltyInterface } from './penalties';

export interface BaseRequestType {
  UUID: string; // RFC4122 UUID
  version: number;
  language: 'de' | 'en';
  filterType: FilterType;
}

// checkName Request
// TODO: some of these might be optional
export interface CNRequest {
  theName: SDName;
  maxList: number;
  maxDistance: number;
  coordinateType: CoordinateType;
  tariffDetails: boolean;
  allowTypeSwitch: boolean;
}

// getRoute Request
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
