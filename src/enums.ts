/**
 * type of location.
 * UNKNOWN since API version 6
 */
export enum SDType {
  STATION = 'STATION',
  COORDINATE = 'COORDINATE',
  ADDRESS = 'ADDRESS',
  POI = 'POI',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Enumeration with all possible filter types.
 */
export enum FilterType {
  /**
   * Return only stations, lines etc. belonging to HVV.
   */
  HVV_LISTED = 'HVV_LISTED',
  /**
   * No filter for the result activated.
   */
  NO_FILTER = 'NO_FILTER'
}

/**
 * To filter departures by service type.
 * since API version 22
 */
export enum FilterServiceType {
  ZUG = 'ZUG',
  UBAHN = 'UBAHN',
  SBAHN = 'SBAHN',
  AKN = 'AKN',
  RBAHN = 'RBAHN',
  FERNBAHN = 'FERNBAHN',
  BUS = 'BUS',
  STADTBUS = 'STADTBUS',
  METROBUS = 'METROBUS',
  SCHNELLBUS = 'SCHNELLBUS',
  NACHTBUS = 'NACHTBUS',
  EILBUS = 'EILBUS',
  AST = 'AST',
  FAEHRE = 'FAEHRE'
}

/**
 * Enumeration with all simple types of services
 * BICYCLE since API version 17
 */
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

/**
 * type of extra fare
 */
export enum ExtraFareType {
  /**
   * extra fare is not possible or required
   */
  NO = 'NO',
  /**
   * extra fare is possible (optional first class ticket)
   */
  POSSIBLE = 'POSSIBLE',
  /**
   * extra fare is mandatory
   */
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

/**
 * type of a coordinate
 */
export enum CoordinateType {
  /**
   * wgs84
   */
  EPSG_4326 = 'EPSG_4326',
  /**
   * Gauss-Kruger zone 3
   */
  EPSG_31467 = 'EPSG_31467'
}

/**
 * Type of an attribute.
 * These types could be supplemented with new ones without creating a new interface version.
 * Clients should be prepared to handle unknown types.
 * since API version 3
 */
export enum AttributeType {
  /** The default attribute type for simple text attributes. */
  NORMAL = 'NORMAL',
  /** Attribute for announcement messages */
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  /** Informations about missed connections, cancelled journeys, etc. */
  REALTIME = 'REALTIME',
  /** Indicates that the attribute value defines a direction name. */
  DIRECTION_NAME = 'DIRECTION_NAME',
  /** Indicates that no passenger can enter the vehicle on that station. */
  ENTRY_PROHIBITED = 'ENTRY_PROHIBITED',
  /** Indicates that the vehicle does not necessarily hold on that station. The vehicle holds only if a passenger wants to exit. */
  STOP_ON_DEMAND = 'STOP_ON_DEMAND',
  /** Indicates that the attribute value defines the platform number where the vehicle holds. */
  PLATFORM = 'PLATFORM',
  /** Indicates that the change (from fussweg.asc) is not a real change. The passenger can stay in the same vehicle. */
  NOCHANGE = 'NOCHANGE',
  /** Indicates that the attribute value defines the optimal position in the train (In this case: front). */
  POSITION_FRONT = 'POSITION_FRONT',
  /** Indicates that the attribute value defines the optimal position in the train (In this case: back). */
  POSITION_BACK = 'POSITION_BACK',
  /** Indicates that the attribute value defines the optimal position in the train (In this case: middle). */
  POSITION_MIDDLE = 'POSITION_MIDDLE',
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

/**
 * Enumeration with all possible return codes.
 */
export enum ReturnCode {
  /**
   * successful -START_DEST_TOO_CLOSE:
   */
  OK = 'OK',
  /**
   * The request information is not enough precise. More infos needed to check station.
   */
  ERROR_CN_TOO_MANY = 'ERROR_CN_TOO_MANY',
  /**
   * communication failed
   */
  ERROR_COMM = 'ERROR_COMM',
  /**
   * server was unable to calculate route
   */
  ERROR_ROUTE = 'ERROR_ROUTE',
  /**
   * unknown error with text
   */
  ERROR_TEXT = 'ERROR_TEXT',
  /**
   * Start and destination are too close. The direct footway will be returned instead.
   * @deprecated Deprecated since API version 21
   */
  START_DEST_TOO_CLOSE = 'START_DEST_TOO_CLOSE'
}

export enum AnnouncementReason {
  UNDEFINED_PROBLEM = 'UNDEFINED_PROBLEM',
  ROADWORKS = 'ROADWORKS',
  CONGESTION = 'CONGESTION',
  SPECIAL_EVENT = 'SPECIAL_EVENT',
  SLIPPERINESS = 'SLIPPERINESS',
  POLICE_REQUEST = 'POLICE_REQUEST',
  FIRE_BRIGADE_SAFETY_CHECKS = 'FIRE_BRIGADE_SAFETY_CHECKS',
  STATION_OVERRUN = 'STATION_OVERRUN',
  SERVICE_FAILURE = 'SERVICE_FAILURE',
  ROAD_CLOSED = 'ROAD_CLOSED',
  VEHICLE_ON_THE_LINE = 'VEHICLE_ON_THE_LINE',
  ACCIDENT = 'ACCIDENT',
  DEMONSTRATION = 'DEMONSTRATION',
  STAFF_ABSENCE = 'STAFF_ABSENCE',
  BOMB_ALERT = 'BOMB_ALERT',
  LOW_WATER_LEVEL = 'LOW_WATER_LEVEL',
  ROUTE_BLOCKAGE = 'ROUTE_BLOCKAGE',
  ROUGH_SEA = 'ROUGH_SEA'
}

export enum LocationType {
  SINGLE_LINE = 'SINGLE_LINE',
  ALL_LINES_OF_CARRIER = 'ALL_LINES_OF_CARRIER',
  COMPLETE_NET = 'COMPLETE_NET'
}
