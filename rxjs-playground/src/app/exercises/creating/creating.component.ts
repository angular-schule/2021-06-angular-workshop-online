import { Component, OnInit } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent implements OnInit {

  logStream$ = new ReplaySubject<string | number>();

  ngOnInit() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    /*function producer(o) {
      o.next(1);
      o.next(2);

      const timer1 = setTimeout(() => {
        o.next(3)
      }, 2000)

      setTimeout(() => {
        o.complete();
        o.next(10);
      }, 4000)

      // Teardown Logic
      return () => {
        clearTimeout(timer1);
      };
    }

    const observer = {
      next: e => console.log(e),
      error: err => console.error(err),
      complete: () => console.log('C'),
    };

    // producer(observer);

    const myObservable$ = new Observable(producer);

    myObservable$.subscribe(e => console.log(e));*/

    interval(1000).pipe(
      map(e => {
        return e * 3;
      }),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });
    
    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
