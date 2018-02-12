// tslint:disable-next-line:no-var-requires
const { version } = require('../package.json');

import * as crypto from 'crypto';
import { v4 as UUIDv4 } from 'uuid';
import { CoordinateType, FilterType, RealtimeType, SimpleServiceType } from './enums';
import { HVVClientOptions } from './hvvclient';
import { ContSearchByServiceId, GTITime, SDName, TariffInfoSelector } from './othertypes';
import { PenaltyInterface } from './penalties';
import { RequestHeaders, BaseRequest } from './requests/requesttypes';

/**
 * Encrypts the payload via an RFC2104 HMAC (SHA1) and base64 encoding
 * @param payload The request body to encrypt
 * @param key The (private) key to encrypt with
 * @return The encrypted message
 */
const signRequest = (payload: BaseRequest, key: string): string => {
  const hmac = crypto.createHmac('sha1', key);

  hmac.update(JSON.stringify(payload));

  return hmac.digest('base64');
};

/**
 * Generates all HTTP headers for a given request
 * @param options The options containing the `key`, `Content-Type`, etc
 * @param payload The request body
 * @return
 */
export const generateHeaders = (options: HVVClientOptions, payload: BaseRequest): RequestHeaders => {
  const signature = signRequest(payload, options.key);
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
