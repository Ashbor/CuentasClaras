import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiKey: string = 'fcb282bcd5b82df55fab1f3a'; // Añade tu API Key
  private baseUrl: string = 'https://v6.exchangerate-api.com/v6/';

  constructor(private http: HttpClient) { }

  // Método para obtener las tasas de cambio de una divisa específica
  getExchangeRates(baseCurrency: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/latest/${baseCurrency}`;
    return this.http.get(url);
  }

  // Método para convertir una cantidad entre dos divisas
  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/pair/${from}/${to}/${amount}`;
    return this.http.get(url);
  }
}
