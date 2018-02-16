import { ReturnCode, ModificationType, CoordinateType } from '../enums';
import { HVVClientOptions } from '../hvvclient';
import { sendAndDecode } from '../request';
import { LSResponse } from '../responses/responsetypes';
import { BaseRequest, RequestHeaders } from './requesttypes';
import { StationListEntry } from '../othertypes';

export interface LSRequest extends BaseRequest {
  dataReleaseID?: string;
  modificationTypes?: ModificationType[];
  coordinateType?: CoordinateType;
  filterEquivalent?: boolean;
}

export interface LSCustomOptions {
  /**
   * Only returns the following fields:
   * * `id`
   * * `name`
   * * `city`
   * * `coordinate`
   */
  simple?: boolean;
}

export const listStations = (
  options: HVVClientOptions,
  req: LSRequest,
  custom: LSCustomOptions
): Promise<LSResponse> => {
  return new Promise<LSResponse>((resolve, reject) => {
    sendAndDecode('/gti/public/listStations', options, req)
      .then(res => normalizeResponse(res, custom))
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

const normalizeResponse = (res: any, custom: LSCustomOptions): Promise<LSResponse> => {
  return new Promise((resolve, reject) => {
    switch (res.returnCode) {
      case ReturnCode.OK:
        if (custom.simple && Array.isArray(res.stations)) {
          res.stations = res.stations.map(
            (station: StationListEntry) =>
              station.exists === false
                ? {
                    id: station.id,
                    exists: false
                  }
                : {
                    id: station.id,
                    name: station.name,
                    city: station.city,
                    coordinate: station.coordinate
                  }
          );
        }
        resolve(res);
        break;
      case ReturnCode.ERROR_CN_TOO_MANY:
      case ReturnCode.ERROR_COMM:
      case ReturnCode.ERROR_ROUTE:
      case ReturnCode.ERROR_TEXT:
        reject(res);
        break;
      default:
        reject('unknown returnCode');
    }
  });
};
