import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  constructor(private bs: BookStoreService, private router: Router) { }

  ngOnInit(): void {
  }

  create(book: Book) {

    this.bs.create(book).subscribe(b => {
      // zur Detailseite navigieren
      this.router.navigate(['/books', b.isbn]);
      // Alternativ: this.router.navigateByUrl('/books');
    });
  }

}
