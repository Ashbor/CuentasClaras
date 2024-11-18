import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeRatePageRoutingModule } from './exchange-rate-routing.module';

import { ExchangeRatePage } from './exchange-rate.page';
import { ExchangeRateService } from '../../services/exchange-rate.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeRatePageRoutingModule
  ],
  declarations: [ExchangeRatePage],
  providers: [ExchangeRateService],
})
export class ExchangeRatePageModule {}
