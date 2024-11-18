import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ExchangeRateService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/'; 

  constructor(private http: HttpClient) {}

  getExchangeRate(from: string, to: string): Observable<number> {
    return this.http.get<{ rates: Record<string, number> }>(`${this.apiUrl}${from}`).pipe(
      map(data => data.rates[to])
    );
  }
}
