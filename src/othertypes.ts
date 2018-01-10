import { AttributeType, SDType } from './enums';

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
