export interface PenaltyInterface {
  value: number | string;
  default?: number;
}

export interface ChangeEvent extends PenaltyInterface {
  value: 0 | 4 | 8 | 20;
  default: 4;
}

export interface ExtraFare extends PenaltyInterface {
  value: 0 | 10 | 20 | 50;
  default: 10;
}

export interface Walker extends PenaltyInterface {
  value: 0 | 1 | 3 | 8;
  default: 1;
}

export interface AnyHandicap extends PenaltyInterface {
  value: -1 | 0 | 1 | 2 | 3 | 4 | 5;
  default: 0;
}

export interface ToStartStationBy extends PenaltyInterface {
  value: 0 | 1 | 7;
  default: 0;
}

export interface TimeRange extends PenaltyInterface {
  value: 10 | 20 | 30 | 45 | 60;
  default: 30;
}

export interface ForVisitors extends PenaltyInterface {
  value: 0 | 1;
}

export interface DesiredType extends PenaltyInterface {
  value: -10 | -2 | 0 | 2 | 10 | 10000;
  default: 0;
  type:
    | 'bus'
    | 'ship'
    | 'u'
    | 's'
    | 'r'
    | 'train'
    | 'fasttrain&extrafasttrain'
    | 'extrafasttrain'
    | 'callable'
    | 'ast'
    | 'rb'
    | 're'
    | 'normalbus'
    | 'fastbus'
    | 'longdistancebus';
}

/**
 * To exclude U2 and S1: `{'name': 'DesiredLine', 'value': 'U2,S1:1'}`.
 * Doesn't have a default.
 */
export interface DesiredLine extends PenaltyInterface {
  values: 2 | 1;
}

/**
 * Only one desired carrier is possible
 */
export interface DesiredCarrier extends PenaltyInterface {
  value: 2 | 0 | 1;
  default: 0;
  carrier:
    | 'AKN'
    | 'EVG'
    | 'HHA'
    | 'LVG'
    | 'PVG'
    | 'VHH'
    | 'Autokraft'
    | 'EVM'
    | 'HL'
    | 'metronom'
    | 'RB S-H'
    | 'VOG'
    | 'DB-Regio'
    | 'Fernzug'
    | 'Hadag'
    | 'MZH'
    | 'S-Bahn'
    | 'Dahmetal'
    | 'Globetrotter'
    | 'KVIP'
    | 'nordbahn'
    | 'Storjohann';
}
