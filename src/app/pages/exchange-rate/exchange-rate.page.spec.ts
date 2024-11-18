import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangeRatePage } from './exchange-rate.page';

describe('ExchangeRatePage', () => {
  let component: ExchangeRatePage;
  let fixture: ComponentFixture<ExchangeRatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
