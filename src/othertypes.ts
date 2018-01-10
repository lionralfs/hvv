import { AttributeType, ExtraFareType, SDType, TariffRegionType } from './enums';

// TODO: some of these might be optional
export interface SDName {
  name: string;
  city: string;
  combinedName: string;
  id: string;
  type: SDType;
  coordinate: Coordinate;
  tariffDetails?: TariffDetails;
  serviceTypes: string[];
  hasStationInformation: boolean;
}

export interface RegionalSDName extends SDName {
  distance: number;
  time: number;
}

export interface JourneySDName extends SDName {
  arrTime: GTITime;
  depTime: GTITime;
  attributes: Attribute[];
  platform: string;
  arrDelay: number;
  depDelay: number;
  extra: boolean;
  cancelled: boolean;
  realtimePlatform: string;
}

export interface GTITime {
  date: string;
  time: string;
}

export interface Attribute {
  value: string;
  types: AttributeType[];
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface TariffDetails {
  innerCity: boolean;
  cityTraffic: boolean;
  gratis: boolean;
  greaterArea: boolean;
  tariffZones: number[];
  counties: string[];
  rings: string[];
  fareStage: boolean;
  fareStageNumber: number;
  tariffNames: string[];
}

export interface ContSearchByServiceId {
  serviceId: number;
  lineKey: string;
  plannedDepArrTime: GTITime;
  additionalOffset: number;
}

export interface TariffInfoSelector {
  tariff: string;
  tariffRegions: boolean;
  kinds: number[];
}

export interface TariffInfo {
  tariffName: string;
  tariffRegions: TariffRegionInfo[];
  extraFareType: ExtraFareType;
  ticketInfos: TicketInfo[];
  ticketRemarks: string;
}

// TOOD: check if this is correct
export interface TariffRegionInfo {
  type: TariffRegionType;
  list: TariffRegionList[];
}

export interface TariffRegionList {
  regions: string[];
}

export interface TicketInfo {
  tariffKindID: number;
  tariffKindLabel: string;
  tariffLevelID: number;
  tariffLevelLabel: string;
  tariffGroupID: number;
  tariffGroupLabel: string;
  basePrice: number;
  extraFarePrice: number;
  reducedBasePrice: number;
  reducedExtraFarePrice: number;
  currency: string;
  regionType: TariffRegionType;
}
