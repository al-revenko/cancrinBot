// DTO получаемых сырых данных полученных от www.cbr-xml-daily.ru
export interface RawCurrencyDataDto {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: {
    [key: string]: {
      ID: string;
      NumCode: string;
      CharCode: string;
      Nominal: number;
      Name: string;
      Value: number;
      Previous: number;
    };
  };
}
