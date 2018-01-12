export enum SDType {
  STATION = 'STATION',
  COORDINATE = 'COORDINATE',
  ADDRESS = 'ADDRESS',
  POI = 'POI',
  UNKNOWN = 'UNKNOWN'
}

export enum FilterType {
  HVV_LISTED = 'HVV_LISTED',
  NO_FILTER = 'NO_FILTER'
}

export enum SimpleServiceType {
  BUS = 'BUS',
  TRAIN = 'TRAIN',
  SHIP = 'SHIP',
  FOOTPATH = 'FOOTPATH',
  BICYCLE = 'BICYCLE',
  AIRPLANE = 'AIRPLANE',
  CHANGE = 'CHANGE'
}

export enum TariffRegionType {
  ZONE = 'ZONE',
  GH_ZONE = 'GH_ZONE',
  RING = 'RING',
  COUNTY = 'COUNTY'
}

export enum ExtraFareType {
  NO = 'NO',
  POSSIBLE = 'POSSIBLE',
  REQUIRED = 'REQUIRED'
}

export enum RegionType {
  ZONE = 'ZONE',
  GH_ZONE = 'GH_ZONE',
  RING = 'RING',
  COUNTY = 'COUNTY'
}

export enum SegmentSelector {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  ALL = 'ALL'
}

export enum ModificationType {
  MAIN = 'MAIN',
  POSITION = 'POSITION'
}

export enum LineModificationType {
  MAIN = 'MAIN',
  SEQUENCE = 'SEQUENCE'
}

export enum VehicleType {
  U_BAHN = 'U_BAHN',
  SCHNELLBUS = 'SCHNELLBUS',
  SCHIFF = 'SCHIFF',
  NACHTBUS = 'NACHTBUS',
  EILBUS = 'EILBUS',
  AST = 'AST'
}

export enum AnnouncementFilterPlannedType {
  ONLY_PLANNED = 'ONLY_PLANNED',
  ONLY_UNPLANNED = 'ONLY_UNPLANNED',
  NO_FILTER = 'NO_FILTER'
}

export enum ButtonType {
  BRAILLE = 'BRAILLE',
  ACUSTIC = 'ACUSTIC',
  COMBI = 'COMBI',
  UNKNOWN = 'UNKNOWN'
}

export enum ElevatorState {
  READY = 'READY',
  OUTOFORDER = 'OUTOFORDER',
  UNKNOWN = 'UNKNOWN'
}

export enum CoordinateType {
  EPSG_4326 = 'EPSG_4326',
  EPSG_31467 = 'EPSG_31467'
}

export enum AttributeType {
  NORMAL = 'NORMAL',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  TRAFFIC_JAM = 'TRAFFIC_JAM',
  TECHNICAL_PROBLEM = 'TECHNICAL_PROBLEM',
  DISPOSITIVE_ACTION = 'DISPOSITIVE_ACTION',
  MISSING_UPDATE = 'MISSING_UPDATE'
}

export enum RealtimeType {
  REALTIME = 'REALTIME',
  PLANDATA = 'PLANDATA',
  AUTO = 'AUTO'
}

export enum ReturnCode {
  OK = 'OK',
  ERROR_CN_TOO_MANY = 'ERROR_CN_TOO_MANY',
  ERROR_COMM = 'ERROR_COMM',
  ERROR_ROUTE = 'ERROR_ROUTE',
  ERROR_TEXT = 'ERROR_TEXT'
}
