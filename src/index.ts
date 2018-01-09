import * as crypto from 'crypto';

export interface HVVClientInterface {
  listStations(): void;
}

export interface HVVClientOptions {
  /**
   * The API Host address
   */
  host: string;
  /**
   * `Content-Type` HTTP-Header.
   */
  contentType: 'application/json' | 'application/xml';
  /**
   * `Accept-Encoding` HTTP-Header.
   */
  acceptEncoding?: 'gzip' | 'deflate';
  /**
   * `Accept` HTTP-Header.
   */
  accept: 'application/json' | 'application/xml';
  /**
   * *X-Platform* represents the clients platform.
   * Accepts the following values:
   * - ios (for iOS Apps)
   * - android (for Android Apps)
   * - winphone (for Windows Phone Apps)
   * - web (for desktop websites)
   * - mobile (for mobile websites)
   */
  platform?: 'ios' | 'android' | 'winphone' | 'web' | 'mobile';
  /**
   * Represents `geofox-auth-user` header.
   */
  user: string;
  /**
   * Custom api key to encrypt payload
   */
  key: string;
}

export class HVVClient implements HVVClientInterface {
  constructor(private options: HVVClientOptions) {
    console.log('new client instance');
  }

  public listStations() {
    console.log('I am not implemented yet');
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
