import { CoordinateType, SDType } from './enums';
import checkname from './requests/checkname';
import { CNRequest } from './requests/requesttypes';
import { CNResponse } from './responses/responsetypes';

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

interface DefaultOptions {
  host: HVVClientOptions['host'];
  contentType: HVVClientOptions['contentType'];
  accept: HVVClientOptions['accept'];
}

const defaultOptions: DefaultOptions = {
  contentType: 'application/json',
  accept: 'application/json',
  host: 'http://api-test.geofox.de'
};

export default class HVVClient implements HVVClientInterface {
  constructor(private options: HVVClientOptions) {
    this.options = this.normalizeOptions(options);
  }

  public init() {
    console.log('I am not implemented yet');
  }

  public checkName(req: CNRequest): Promise<CNResponse> {
    return checkname(req, this.options);
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
}
