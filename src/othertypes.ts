import {
  AnnouncementReason,
  AttributeType,
  ExtraFareType,
  SDType,
  TariffRegionType,
  VehicleType,
  LocationType,
  CoordinateType
} from './enums';
import { TimeRange } from './penalties';

/**
 * type for representation of starts and destinations
 */
export interface SDName {
  /** string which can be the name of station, address oder poi */
  name: string;
  /** the city of the location */
  city?: string;
  /** combination of name and city field. since API version 6 */
  combinedName?: string;
  /** the unique id of a SDName object */
  id?: string;
  /**
   * the type of a SDName object, type can be: UNKNOWN, STATION , ADDRESS, POI, COORDINATE
   * Unknown type is only for requests.
   */
  type?: SDType;
  /** the coordinate of a SDName object */
  coordinate?: Coordinate;
  /** Detailed information about the tariff. */
  tariffDetails?: TariffDetails;
  /** Type of vehicles that stops at this station. (Only filled on SDType Station). since API version 16 */
  serviceTypes?: string[];
  /** Are additional information about the station available? Can be retrieved by StationInformationRequest. since API version 28 */
  hasStationInformation?: boolean;
}

export interface RegionalSDName extends SDName {
  /** The distance from the coordinate sent in the request to this SDName. The client has to know the coordinate. */
  distance: number;
  /** The travel time from the coordinate to this SDName. */
  time: number;
}

export interface JourneySDName extends SDName {
  /** The arrival time for this location. In most cases only one of dep- and arrTime will be used. */
  arrTime?: GTITime;
  /** The departure time for this location */
  depTime?: GTITime;
  /** A list with attributes. */
  attributes?: Attribute[];
  /** The scheduled platform (Gleis) of this hold. If no platform info is available this element will be null. since API version 11 */
  platform?: string;
  /** Realtime arrival delay in seconds (if available). since API version 19 */
  arrDelay?: number;
  /** Realtime departure delay in seconds (if available). since API version 19 */
  depDelay?: number;
  /** realtime flag to mark additional stops to those of the intended schedule. since API version 19 */
  extra?: boolean;
  /** realtime flag to mark cancelled stops. since API version 19 */
  cancelled?: boolean;
  /** The realtime platform (Gleis) of this hold. If no realtime platform info is available this element will be null. since API version 21 */
  realtimePlatform?: string;
}

/**
 * Represents time/date
 */
export interface GTITime {
  /**
   * The date as string. Format: dd.mm.yyyy
   */
  date: string;
  /**
   * The time as string. Format: hh:mm
   */
  time: string;
}

export interface Attribute {
  value: string;
  types: AttributeType[];
}

/**
 * the coordinate of a location with x and y value
 */
export interface Coordinate {
  /**
   * the x value or longitude of the coordinate
   */
  x: number;
  /**
   * the y value or latitude of the coordinate
   */
  y: number;
  /**
   * type of a coordinate
   * default is EPSG_4326
   */
  type?: CoordinateType;
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

export interface StationListEntry {
  id: string;
  name: string;
  city: string;
  combinedName: string;
  shortcuts: string[];
  aliasses: string[];
  vehicleTypes: VehicleType[];
  coordinate: Coordinate;
  exists: boolean;
}

export interface Link {
  label: string;
  url: string;
}

export interface Service {
  name: string;
  direction: string;
  origin: string;
  type: string;
  id: string;
}

export interface Location {
  type: LocationType;
  name: string;
  line: Service;
  begin: SDName;
  end: SDName;
  bothDirections: boolean;
}

export interface Announcement {
  id: string;
  locations: Location[];
  summary: string;
  description: string;
  links: Link[];
  publication: TimeRange;
  validities: TimeRange[];
  lastModified: string;
  planned: boolean;
  reason: AnnouncementReason;
}
