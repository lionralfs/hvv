import * as crypto from 'crypto';
import { ReturnCode, SDType } from './enums';
import { CNRequest } from './request';
import { CNResponse } from './response';

export interface HVVClientInterface {
  init(): void;
  checkName(req: CNRequest): Promise<CNResponse>;
  getRoute(): void;
  departureList(): void;
  getTariff(): void;
  departureCourse(): void;
  listStations(): void;
  listLines(): void;
  getAnnouncements(): void;
  checkPostalCode(): void;
  getVehicleMap(): void;
  getTrackCoordinates(): void;
  getIndividualRoute(): void;
}

export interface HVVClientOptions {
  /**
   * Represents `geofox-auth-user` header, provided by HBT GmbH.
   */
  user: string;
  /**
   * Individual password, provided by HBT GmbH.
   */
  key: string;
  /**
   * The API Host address.
   * Default: http://api-test.geofox.de
   */
  host?: string;
  /**
   * `Content-Type` HTTP-Header.
   * Default: `application/json`
   */
  contentType?: 'application/json' | 'application/xml';
  /**
   * `Accept-Encoding` HTTP-Header.
   * Default: no compression
   */
  acceptEncoding?: 'gzip' | 'deflate';
  /**
   * `Accept` HTTP-Header.
   * Default: `application/json`
   */
  accept?: 'application/json' | 'application/xml';
  /**
   * Represents the clients platform.
   * Accepts the following values:
   * - ios (for iOS Apps)
   * - android (for Android Apps)
   * - winphone (for Windows Phone Apps)
   * - web (for desktop websites)
   * - mobile (for mobile websites)
   */
  platform?: 'ios' | 'android' | 'winphone' | 'web' | 'mobile';
}

export interface DefaultOptions {
  host: string;
  contentType: 'application/json' | 'application/xml';
  accept: 'application/json' | 'application/xml';
}

const defaultOptions: DefaultOptions = {
  contentType: 'application/json',
  accept: 'application/json',
  host: 'http://api-test.geofox.de'
};

export class HVVClient implements HVVClientInterface {
  constructor(private options: HVVClientOptions) {
    this.options = this.normalizeOptions(options);
    console.log(this.options);
  }

  public init() {
    console.log('I am not implemented yet');
  }

  public checkName(req: CNRequest): Promise<CNResponse> {
    return new Promise(resolve => {
      const response: CNResponse = {
        returnCode: ReturnCode.OK,
        results: [
          {
            name: 'Christuskirche',
            city: 'Hamburg',
            combinedName: 'Christuskirche',
            id: 'Master:84902',
            type: SDType.STATION,
            coordinate: {
              x: 9.962371,
              y: 53.569501
            },
            serviceTypes: ['u', 'bus'],
            distance: 0,
            time: 1000,
            hasStationInformation: false
          }
        ]
      };
      resolve(response);
    });
  }

  public getRoute() {
    console.log('I am not implemented yet');
  }

  public departureList() {
    console.log('I am not implemented yet');
  }

  public getTariff() {
    console.log('I am not implemented yet');
  }

  public departureCourse() {
    console.log('I am not implemented yet');
  }

  public listStations() {
    console.log('I am not implemented yet');
  }

  public listLines() {
    console.log('I am not implemented yet');
  }

  public getAnnouncements() {
    console.log('I am not implemented yet');
  }

  public checkPostalCode() {
    console.log('I am not implemented yet');
  }

  public getVehicleMap() {
    console.log('I am not implemented yet');
  }

  public getTrackCoordinates() {
    console.log('I am not implemented yet');
  }

  public getIndividualRoute() {
    console.log('I am not implemented yet');
  }

  private normalizeOptions(options: HVVClientOptions): HVVClientOptions {
    const normOpts = { ...defaultOptions, ...options };

    if (typeof normOpts.user !== 'string') {
      throw new TypeError(`user has to be a string, is of type ${typeof normOpts.user}`);
    }
    if (typeof normOpts.key !== 'string') {
      throw new TypeError(`key has to be a string, is of type ${typeof normOpts.key}`);
    }
    return normOpts;
  }

  private signRequest(payload: object): string {
    const hmac = crypto.createHmac('sha1', this.options.key);

    hmac.update(JSON.stringify(payload));

    return hmac.digest('base64');
  }
}
