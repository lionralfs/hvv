export enum SDType {
  STATION,
  COORDINATE,
  ADDRESS,
  POI,
  UNKNOWN
}

export enum FilterType {
  HVV_LISTED,
  NO_FILTER
}

export enum SimpleServiceType {
  BUS,
  TRAIN,
  SHIP,
  FOOTPATH,
  BICYCLE,
  AIRPLANE,
  CHANGE
}

export enum TariffRegionType {
  ZONE,
  GH_ZONE,
  RING,
  COUNTY
}

export enum ExtraFareType {
  NO,
  POSSIBLE,
  REQUIRED
}

export enum RegionType {
  ZONE,
  GH_ZONE,
  RING,
  COUNTY
}

export enum SegmentSelector {
  BEFORE,
  AFTER,
  ALL
}

export enum ModificationType {
  MAIN,
  POSITION
}

export enum LineModificationType {
  MAIN,
  SEQUENCE
}

export enum VehicleType {
  U_BAHN,
  SCHNELLBUS,
  SCHIFF,
  NACHTBUS,
  EILBUS,
  AST
}

export enum AnnouncementFilterPlannedType {
  ONLY_PLANNED,
  ONLY_UNPLANNED,
  NO_FILTER
}

export enum ButtonType {
  BRAILLE,
  ACUSTIC,
  COMBI,
  UNKNOWN
}

export enum ElevatorState {
  READY,
  OUTOFORDER,
  UNKNOWN
}

export enum CoordinateType {
  EPSG_4326,
  EPSG_31467
}

export enum AttributeType {
  NORMAL,
  ANNOUNCEMENT,
  TRAFFIC_JAM,
  TECHNICAL_PROBLEM,
  DISPOSITIVE_ACTION,
  MISSING_UPDATE
}

export enum RealtimeType {
  REALTIME,
  PLANDATA,
  AUTO
}
