import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';


@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.page.html',
  styleUrls: ['./exchange-rate.page.scss'],
})

export class ExchangeRatePage {
  currencies = ['USD', 'EUR', 'GBP', 'MXN', 'JPY'];
  fromCurrency: string = ''; // Inicializa las propiedades
  toCurrency: string = '';
  amount: number = 0; // Inicializa las propiedades
  exchangeRate: number = 0; // Inicializa las propiedades
  conversionResult: number = 0; // Inicializa las propiedades

  constructor(private exchangeRateService: ExchangeRateService) {}

  consultExchangeRate() {
    this.exchangeRateService.getExchangeRate(this.fromCurrency, this.toCurrency).subscribe((rate: number) => {
      this.exchangeRate = rate;
      this.conversionResult = this.amount * this.exchangeRate;
    });
  }
}