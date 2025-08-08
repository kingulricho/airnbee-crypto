export type Country = {
    isoName: string;
    name: string;
    continent:string;
    currencyCode:string;
    currencyName:string;
    flag:string;
    currencySymbol:string;
    callingCodes:string[];
  }; 

export type Operator = {
    id:number;
    operatorId:number;
    name:string;
    bundle:boolean;
    data:boolean;
    pin:boolean;
    comboProduct:boolean;
    supportsLocalAmounts:boolean;
    supportsGeographicalRechargePlans:boolean;
    denominationType:string;
    senderCurrencyCode:string;
    senderCurrencySymbol:string;
    destinationCurrencyCode:string;
    destinationCurrencySymbol:string;
    commission:number;
    internationalDiscount:number;
    localDiscount:number;
    mostPopularAmount:number | null;
    mostPopularLocalAmount:any;
    minAmount:number | null;
    maxAmount:number | null;
    localMinAmount:number;
    localMaxAmount:number;
    country:{isoName:string;name:string}
    fx:{rate:number;currencyCode:string}
    logoUrls:string[];
    fixedAmounts:number[];
    fixedAmountsDescriptions:any;
    localFixedAmounts:number[];
    localFixedAmountsDescriptions:any;
    suggestedAmounts:number[];
    suggestedAmountsMap:any;
    fees:{international:number;local:number;localPercentage:number;internationalPercentage:number};
    geographicalRechargePlans:any[];
    promotions:any[];
    status:string;
}  

export interface StateStoragebyme {
  getItem: (name: string) => string | null | Promise<string | null>;
  setItem: (name: string, value: string) => unknown | Promise<unknown>;
  removeItem: (name: string) => unknown | Promise<unknown>;
}

export type Payload = {
  transmission_id: string | null;
  transmission_time: string | null;
  cert_url: string | null;
  auth_algo: string | null;
  transmission_sig: string | null;
  webhook_id: string;
  webhook_event: any;
}