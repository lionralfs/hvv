> 🏗 This project is under development!

# Node.js API-wrapper for Public Transport in Hamburg

[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![MIT License][license-badge]][license]

## Installation

```bash
npm install hvv
```

## Usage

```js
import { HVVClient } from 'hvv';

const hvv = new HVVClient({
  key: 'secret',
  user: 'user'
});

hvv.getRoute({ start: { name: '...' }, dest: { name: '...' } }).then(result => console.log(result));
```

## Documentation

### HVVClientOptions

You can initialize a new instance by calling `new HVVClient(HVVClientOptions)`. `HVVClientOptions` is an object with the following properties:

#### user

_Required_<br>
Type: `string`

Represents `geofox-auth-user` header, provided by HBT GmbH.

#### key

_Required_<br>
Type: `string`

Individual password, provided by HBT GmbH.

#### host

Type: `string`<br>
Default: `http://api-test.geofox.de`

The API Host address.

#### contentType

Type: `string`<br>
Value: `application/json` or `application/xml`<br>
Default: `application/json`

The `Content-Type` HTTP-Header.

#### acceptEncoding

Type: `string`<br>
Value: `gzip` or `deflate`<br>
Default: no compression

`Accept-Encoding` HTTP-Header.

#### accept

Type: `string`<br>
Value: `application/json` or `application/xml`<br>
Default: `application/json`

`Accept` HTTP-Header.

#### platform

Type: `string`<br>
Value: One of the following:

* ios (for iOS Apps)
* android (for Android Apps)
* winphone (for Windows Phone Apps)
* web (for desktop websites)
* mobile (for mobile websites)

Default: platform not specified

Represents the clients platform.

### Methods

#### [init(InitRequest)](docs/init.md)
#### [checkName(CNRequest)](docs/checkname.md)
#### [getRoute(GRRequest)](docs/getroute.md)
#### [departureList()](docs/departurelist.md)
#### [getTariff()](docs/gettariff.md)
#### [departureCourse()](docs/departurecourse.md)
#### [listStations(LSRequest, LSCustomOptions)](docs/liststations.md)
#### [getAnnouncements(AnnouncementRequest)](docs/getannouncements.md)
#### [checkPostalCode()](docs/checkpostalcode.md)
#### [getVehicleMap()](docs/getvehiclemap.md)
#### [getTrackCoordinates()](docs/gettrackcoordinates.md)
#### [getIndividualRoute()](docs/getindividualroute.md)
#### [getStationInformation()](docs/getstationinformation.md)

## License

[MIT](LICENSE) © Lion Ralfs

[version-badge]: https://img.shields.io/npm/v/hvv.svg
[package]: https://www.npmjs.com/package/hvv
[license-badge]: https://img.shields.io/npm/l/hvv.svg
[license]: https://github.com/lionralfs/hvv/blob/master/LICENSE
[build]: https://travis-ci.org/lionralfs/hvv
[build-badge]: https://travis-ci.org/lionralfs/hvv.svg?branch=master
