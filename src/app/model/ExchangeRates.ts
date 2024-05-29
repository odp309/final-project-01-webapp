// Define an interface for the rates object
export interface Rates {
    AUD: number;
    SGD: number;
    JPY: number;
    EUR: number;
    GBP: number;
    USD: number;
    MYR: number;
    NZD: number;
    THB: number;
    CNY: number;
}

// Define an interface for the main response
export interface ExchangeRates {
    base: string;
    buyRates: Rates;
    sellRates: Rates;
}
