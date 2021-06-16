import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { map, switchMap } from 'rxjs/operators';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
    // Synchroner Weg / PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn');
    // console.log(isbn);

    // Asynchroner Weg / PUSH
    // TODO: Verschachtelte Subscriptions!
    /*this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn') || '';
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
      });
    });    */

    // import { map } from 'rxjs/operators';
    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn') || ''),
      switchMap(isbn => this.bs.getSingle(isbn))
    );
  }
  
  ngOnInit(): void {
    
  }

}
