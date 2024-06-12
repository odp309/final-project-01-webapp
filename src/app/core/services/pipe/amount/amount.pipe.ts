import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(value: number, currencyCode: string): string {
    if (!value || !currencyCode) {
      return '';
    }

    let formattedValue: string;

      // Format the number without separators
        const rawValue = value.toFixed(2);
        // Replace the decimal separator with comma and the thousands separator with period
        formattedValue = 'Rp. ' + rawValue.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    
    // switch (currencyCode) {
    //   case 'USD':
    //     formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    //     break;
    //   case 'EUR':
    //     formattedValue = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    //     break;
    //   case 'SGD':
    //     formattedValue = new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(value);
    //     break;
    //   case 'JPY':
    //     formattedValue = new Intl.NumberFormat('jp-JP', { style: 'currency', currency: 'JPY' }).format(value);
    //     break;
    //   case 'GBP':
    //     formattedValue = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
    //     break;
    //   case 'AUD':
    //     formattedValue = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value);
    //     break;
    //   case 'MYR':
    //     formattedValue = new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' }).format(value);
    //     break;
    //   case 'NZD':
    //     formattedValue = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(value);
    //     break;
    //   case 'THB':
    //     formattedValue = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(value);
    //     break;
    //   case 'CNY':
    //     formattedValue = new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(value);
    //     break;
    //   case 'CAD':
    //     formattedValue = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value);
    //     break;
    //   case 'CHF':
    //     formattedValue = new Intl.NumberFormat('fr-CH', { style: 'currency', currency: 'CHF' }).format(value);
    //     break;
    //   case 'HKD':
    //     formattedValue = new Intl.NumberFormat('en-HK', { style: 'currency', currency: 'HKD' }).format(value);
    //     break;
      // case 'IDR':
      //   // Format the number without separators
      //   const rawValue = value.toFixed(2);
      //   // Replace the decimal separator with comma and the thousands separator with period
      //   formattedValue = rawValue.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      //   // Append the currency code manually
      //   formattedValue = 'Rp ' + formattedValue;
      //   break;
      // default:
      //   formattedValue = value.toFixed(2); // Default formatting
    // }

    return formattedValue;
  }

}