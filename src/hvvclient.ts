import { CoordinateType, SDType } from './enums';
import { checkName } from './requests/checkname';
import { init } from './requests/init';
import { listStations } from './requests/liststations';
import { AnnouncementRequest, CNRequest, LSRequest } from './requests/requesttypes';
import { AnnouncementResponse, CNResponse, InitResponse, LSResponse } from './responses/responsetypes';
import { getAnnouncements } from './requests/getannouncements';

export interface HVVClientInterface {
  init(): Promise<InitResponse>;
  checkName(req: CNRequest): Promise<CNResponse>;
  getRoute(): void;
  departureList(): void;
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
  public init() {
    return init({}, this.options);
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
  public getRoute() {
    console.log('I am not implemented yet');
  }

  /**
   * Returns a list of journeys departing or arriving at the given station
   */
  public departureList() {
    console.log('I am not implemented yet');
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
  public listStations(req?: LSRequest): Promise<LSResponse> {
    return listStations(this.options, req);
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
  public getAnnouncements(req: AnnouncementRequest) {
    return getAnnouncements(req, this.options);
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
    return normOpts;
  }
}
