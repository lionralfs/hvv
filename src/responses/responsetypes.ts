import { ReturnCode } from '../enums';
import { RegionalSDName } from '../othertypes';

export interface BaseResponseType {
  returnCode: ReturnCode;
}

export interface InitResponse extends BaseResponseType {
  beginOfService?: string;
  endOfService?: string;
  id?: string;
  dataId?: string;
  buildDate?: string;
  buildTime?: string;
  buildText?: string;
}

export interface CNResponse extends BaseResponseType {
  results: RegionalSDName[];
}
