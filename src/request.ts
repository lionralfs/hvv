// tslint:disable-next-line:no-var-requires
const { version } = require('../package.json');

import * as crypto from 'crypto';
import { v4 as UUIDv4 } from 'uuid';
import { CoordinateType, FilterType, RealtimeType, SimpleServiceType } from './enums';
import { HVVClientOptions } from './index';
import { ContSearchByServiceId, GTITime, SDName, TariffInfoSelector } from './othertypes';
import { PenaltyInterface } from './penalties';

export interface BaseRequestType {
  version?: number;
  language?: 'de' | 'en';
  filterType?: FilterType;
}

// checkName Request
// TODO: some of these might be optional
export interface CNRequest extends BaseRequestType {
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

/**
 * Encrypts the payload via an RFC2104 HMAC (SHA1) and base64 encoding
 * @param {BaseRequestType} payload The request body to encrypt
 * @param {string} key The (private) key to encrypt with
 * @return {string} The encrypted message
 */
export const signRequest = (payload: BaseRequestType, key: string): string => {
  const hmac = crypto.createHmac('sha1', key);

  hmac.update(JSON.stringify(payload));

  return hmac.digest('base64');
};

export const generateHeaders = (options: HVVClientOptions, signature: string): RequestHeaders => {
  const headers: RequestHeaders = {
    'Content-Type': `${options.contentType};charset=UTF-8`,
    Accept: options.accept,
    'geofox-auth-signature': signature,
    'geofox-auth-user': options.user,
    'geofox-auth-type': 'HmacSHA1',
    'X-TraceId': UUIDv4(),
    'User-Agent': `hvv/v${version} (https://github.com/lionralfs/hvv)`
  };

  if (options.acceptEncoding) {
    headers['Accept-Encoding'] = options.acceptEncoding;
  }
  if (options.platform) {
    headers['X-Platform'] = options.platform;
  }

  return headers;
};
