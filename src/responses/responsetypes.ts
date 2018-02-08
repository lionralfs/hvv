import { ReturnCode } from '../enums';
import { Announcement, RegionalSDName, StationListEntry } from '../othertypes';

export interface BaseResponseType {
  returnCode: ReturnCode;
}

/** init Response */
export interface InitResponse extends BaseResponseType {
  beginOfService?: string;
  endOfService?: string;
  id?: string;
  dataId?: string;
  buildDate?: string;
  buildTime?: string;
  buildText?: string;
}

/** checkName Response */
export interface CNResponse extends BaseResponseType {
  results: RegionalSDName[];
}

/** listStations Response */
export interface LSResponse extends BaseResponseType {
  dataReleaseID: string;
  stations: StationListEntry[];
}

/** getAnnouncements Response */
export interface AnnouncementResponse extends BaseResponseType {
  announcements: Announcement[];
  lastUpdate: string;
}
