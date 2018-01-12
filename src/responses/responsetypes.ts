import { ReturnCode } from '../enums';
import { RegionalSDName } from '../othertypes';

export interface BaseResponseType {
  returnCode: ReturnCode;
}

export interface CNResponse extends BaseResponseType {
  results: RegionalSDName[];
}
