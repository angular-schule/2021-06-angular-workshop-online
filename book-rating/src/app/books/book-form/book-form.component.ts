import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  
  @Output() submitForm = new EventEmitter<Book>();
  bookForm: FormGroup;

  constructor() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      description: new FormControl(''),
      price: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      rating: new FormControl(1, [
        Validators.min(1),
        Validators.max(5)
      ]),
      authors: new FormArray([
        new FormControl(''),
        new FormControl(''),
      ])
    });
  }

  get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor() {
    this.authors.push(new FormControl(''));
  }

  onSubmit() {

    if (this.bookForm.invalid) {
      // this.bookForm.markAllAsTouched();
      return;
    }

    const newBook: Book = this.bookForm.value;
    this.submitForm.emit(newBook);
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.hasError(errorCode) && control.touched;
    
    // return !!control?.getError(errorCode);
  }

}
