import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance; // TS
    // const element = fixture.nativeElement; // DOM

    // Buch übergeben
    // Wichtig: vor detectChanges!
    component.book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      price: 4
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event for onRateUp', () => { 
    let emittedBook: Book | undefined;

    // Event abonnieren
    component.rateUp.subscribe(book => {
      emittedBook = book;
    });

    // Methode aufrufen
    component.onRateUp();

    expect(emittedBook).toBeTruthy()
    expect(emittedBook).toBe(component.book);
  });
});
