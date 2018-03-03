// tslint:disable-next-line:no-var-requires
const { version } = require('../package.json');

import * as crypto from 'crypto';
import * as request from 'request-promise';
import { v4 as UUIDv4 } from 'uuid';
import { CoordinateType, FilterType, RealtimeType, SimpleServiceType } from './enums';
import { HVVClientOptions } from './hvvclient';
import { ContSearchByServiceId, GTITime, SDName, TariffInfoSelector } from './othertypes';
import { PenaltyInterface } from './penalties';
import { RequestHeaders, BaseRequest } from './requests/requesttypes';
import { StatusCodeError, RequestError } from 'request-promise/errors';

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
const generateHeaders = (options: HVVClientOptions, payload: BaseRequest): RequestHeaders => {
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
    headers.encoding = null;
  }
  if (options.platform) {
    headers['X-Platform'] = options.platform;
  }

  return headers;
};

/**
 * Sends and decodes a request
 * @param endpoint The endpoint to send the request to.Will be appended to the host specified in `options.host`
 * @param options The options containing the `key`, `Content-Type`, etc
 * @param payload The request body
 */
export const sendAndDecode = (endpoint: string, options: HVVClientOptions, payload: BaseRequest) => {
  if (!payload.version && options.version) {
    payload.version = options.version;
  }
  const headers = generateHeaders(options, payload);

  return new Promise((resolve, reject) => {
    request({
      uri: `${options.host}${endpoint}`,
      method: 'POST',
      body: JSON.stringify(payload, null, 0),
      headers,
      gzip: typeof options.acceptEncoding !== 'undefined'
    })
      .then(res => resolve(JSON.parse(res)))
      // The server responded with a status codes other than 2xx.
      // Check reason.statusCode
      .catch(StatusCodeError, e => reject(e))
      // The request failed due to technical reasons.
      // reason.cause is the Error object Request would pass into a callback.
      .catch(RequestError, e => reject(e));
  });
};
