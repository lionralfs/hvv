import * as crypto from 'crypto';

export interface HVVClientInterface {
  listStations(): void;
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

  public listStations() {
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

// const client = new HVVClient({
//   accept: 'application/json',
//   contentType: 'application/json',
//   host: '/',
//   key: 'secret',
//   platform: 'web',
//   user: 'user'
// });
