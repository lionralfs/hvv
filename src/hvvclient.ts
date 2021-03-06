import { CoordinateType, SDType } from './enums';
import { checkName, CNRequest } from './requests/checkname';
import { init, InitRequest } from './requests/init';
import { listStations, LSRequest, LSCustomOptions } from './requests/liststations';
import { AnnouncementResponse, CNResponse, InitResponse, LSResponse } from './responses/responsetypes';
import { getAnnouncements, AnnouncementRequest } from './requests/getannouncements';
import { GRRequest, getRoute, GRResponse } from './requests/getroute';
import { DLRequest, DLResponse, departureList } from './requests/departurelist';

export interface HVVClientInterface {
  init(req: InitRequest): Promise<InitResponse>;
  checkName(req: CNRequest): Promise<CNResponse>;
  getRoute(req: GRRequest): Promise<GRResponse>;
  departureList(req: DLRequest): Promise<DLResponse>;
  getTariff(): void;
  departureCourse(): void;
  listStations(req: LSRequest): Promise<LSResponse>;
  listLines(): void;
  getAnnouncements(req: AnnouncementRequest): Promise<AnnouncementResponse>;
  checkPostalCode(): void;
  getVehicleMap(): void;
  getTrackCoordinates(): void;
  getIndividualRoute(): void;
  getStationInformation(): void;
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
   * Default: https://api-test.geofox.de
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

  /**
   * Pins a specific API version to use in every request.
   * Can be overwritten in specific requests by using the `version`
   * parameter of a `BaseRequest`.
   * Default: 1 (it's advised to supply a version here, since version 1
   * is quite old)
   */
  version?: number;
}

interface DefaultOptions {
  host: HVVClientOptions['host'];
  contentType: HVVClientOptions['contentType'];
  accept: HVVClientOptions['accept'];
}

const defaultOptions: DefaultOptions = {
  contentType: 'application/json',
  accept: 'application/json',
  host: 'https://api-test.geofox.de'
};

export default class HVVClient implements HVVClientInterface {
  /**
   * Creates a new HVVClient instance
   */
  constructor(private options: HVVClientOptions) {
    this.options = this.normalizeOptions(options);
  }

  /**
   * Returns some server status informations (schedule validity, data version, program version, ...)
   */
  public init(req: InitRequest) {
    return init(this.options, req);
  }

  /**
   * Verifies the user input and returns a list of possible unique places for that input
   */
  public checkName(req: CNRequest): Promise<CNResponse> {
    return checkName(this.options, req);
  }

  /**
   * Calculates a route for the given parameters
   */
  public getRoute(req: GRRequest): Promise<GRResponse> {
    return getRoute(this.options, req);
  }

  /**
   * Returns a list of journeys departing or arriving at the given station
   */
  public departureList(req: DLRequest): Promise<DLResponse> {
    return departureList(this.options, req);
  }

  /**
   * Calculates detailed tariff informations for the given route
   */
  public getTariff() {
    console.log('I am not implemented yet');
  }

  /**
   * Returns the course of a given journey with stations and times
   */
  public departureCourse() {
    console.log('I am not implemented yet');
  }

  /**
   * Returns a list of stations
   */
  public listStations(req?: LSRequest, custom?: LSCustomOptions): Promise<LSResponse> {
    const reqObj = req || {};
    const customObj = custom || {};
    return listStations(this.options, reqObj, customObj);
  }

  /**
   * Returns a list of lines
   */
  public listLines() {
    console.log('I am not implemented yet');
  }

  /**
   * Returns a list schedule variance announcements
   */
  public getAnnouncements(req: AnnouncementRequest): Promise<AnnouncementResponse> {
    return getAnnouncements(this.options, req);
  }

  /**
   * Returns a whether a postal code belongs to the HVV service area
   */
  public checkPostalCode() {
    console.log('I am not implemented yet');
  }

  /**
   * Returns the necessary information to display current journeys on a map
   */
  public getVehicleMap() {
    console.log('I am not implemented yet');
  }

  /**
   * Returns a coordinates of a journey course
   */
  public getTrackCoordinates() {
    console.log('I am not implemented yet');
  }

  /**
   * Calculates a route with individual traffic (on foot, by bike, ...)
   */
  public getIndividualRoute() {
    console.log('I am not implemented yet');
  }

  /**
   * Returns additional information about a station
   */
  public getStationInformation() {
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
    if (normOpts.contentType === 'application/xml') {
      throw new TypeError('contentType: application/xml currently not supported');
    }
    return normOpts;
  }
}
