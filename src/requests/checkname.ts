import * as request from 'request-promise';
import { RequestError, StatusCodeError } from 'request-promise/errors';
import { ReturnCode, SDType } from '../enums';
import { HVVClientOptions } from '../index';
import { CNRequest, generateHeaders, RequestHeaders, signRequest } from '../request';
import { CNResponse } from '../response';

export default (req: CNRequest, options: HVVClientOptions): Promise<CNResponse> => {
  const signature = signRequest(req, options.key);
  const headers = generateHeaders(options, signature);

  return new Promise<CNResponse>((resolve, reject) => {
    request({
      uri: `${options.host}/gti/public/checkName`,
      method: 'POST',
      body: req,
      // simple: false,
      headers,
      json: true
    })
      .then(res => {
        // resolve({
        //   returnCode: ReturnCode.OK,
        //   results: []
        // });
        switch (res.returnCode) {
          case ReturnCode.OK:
            resolve(res);
            break;
          case ReturnCode.ERROR_TEXT:
            reject(res);
            break;
          default:
            reject('unknown returnCode');
        }
      })
      .catch(StatusCodeError, reason => {
        // The server responded with a status codes other than 2xx.
        // Check reason.statusCode
        reject(reason);
      })
      .catch(RequestError, reason => {
        // The request failed due to technical reasons.
        // reason.cause is the Error object Request would pass into a callback.
        reject(reason);
      });
  });
};
