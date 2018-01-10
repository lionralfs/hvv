import { SimpleServiceType } from './enums';
import { Attribute, ContSearchByServiceId, Coordinate, JourneySDName, SDName, TariffInfo } from './othertypes';

export interface Schedule {
  routeId: number;
  start: SDName;
  dest: SDName;
  time: number;
  footpathTime: number;
  scheduleElements: ScheduleElement[];
  tariffInfos: TariffInfo[];
  contSearchBefore: ContSearchByServiceId;
  contSearchAfter: ContSearchByServiceId;
}

export interface ScheduleElement {
  from: JourneySDName;
  to: JourneySDName;
  line: Service;
  paths: Path[];
  attributes: Attribute[];
  extra: boolean;
  cancelled: boolean;
  intermediateStops: JourneySDName[];
}

export interface Service {
  id?: string;
  name?: string;
  direction?: string;
  type: ServiceType;
}

// TODO: check if this is correct
export interface ServiceType {
  simpleType: SimpleServiceType;
  shortInfo: string;
  longInfo: string;
}

export interface Path {
  track: Coordinate[];
}
