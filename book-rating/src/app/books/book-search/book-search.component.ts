import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  results$: Observable<Book[]>;

  searchControl = new FormControl('');

  constructor(private bs: BookStoreService) {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime<string>(1000),
      filter(term => term.length >= 3),
      switchMap((term) => this.bs.search(term))
    );

    /*
    - Suchbegriff muss mindestens 3 Zeichen lang sein. (Dafür bitte keinen Validator verwenden, sondern RxJS.)
    - erst suchen, wenn Nutzer für eine bestimmte Zeit "die Finger still hält"
    - HTTP: Bücher suchen (`this.bs.search(term)`)
    - Bücher darstellen, ganz simpel (AsyncPipe)
    */
  }

  ngOnInit(): void {
  }

}
