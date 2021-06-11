import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let ratingMock: BookRatingService;

  beforeEach(async () => {
   
    ratingMock = {
      rateUp: b => b,
      rateDown: b => b
    };
    
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        // BRS bereitstellen: Wann immer jemand BRS anfordert, wird ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service for onRateUp', () => {
    // Arrange
    const book: Book = {
      isbn: '',
      title: '',
      description: '',
      price: 4,
      rating: 4,
    };

    // ratingMock.rateUp überwachen
    // Aufrufe an das originale ratingMock durchleiten und nicht blockieren
    
    // Erkurs: Name von Methode ermitteln
    // const name = BookRatingService.prototype.rateUp.name as keyof BookRatingService;
    spyOn(ratingMock, 'rateUp').and.callThrough();
    
    // Act
    component.onRateUp(book);
    
    // Assert
    expect(ratingMock.rateUp).toHaveBeenCalledTimes(1);
    expect(ratingMock.rateUp).toHaveBeenCalledWith(book);
  });
});
