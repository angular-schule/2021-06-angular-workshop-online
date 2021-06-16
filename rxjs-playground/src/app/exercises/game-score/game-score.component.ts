import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, of } from 'rxjs';
import { scan, reduce } from 'rxjs/operators';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent implements OnInit {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;
  finalScore: number;

  ngOnInit() {

    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den aktuellen und den finalen Punktestand zu ermitteln...
     */

    /******************************/

    this.score$.pipe(
      scan((acc, item) => acc + item, 0),
    ).subscribe(score => {
      this.currentScore = score;
    });

    this.score$.pipe(
      reduce((acc, item) => acc + item, 0),
    ).subscribe(score => {
      this.finalScore = score;
    });

    /******************************/

    of(
      'SETNAMEFERDINAND',
      'SETCITYLEIPZIG',
      'SETNAMEFRITZ',
      'SETLANGDE',
      'UNBEKANNT'
    ).pipe(
      scan((acc, item) => {
        switch(item) {
          case 'SETNAMEFERDINAND': return { ...acc, name: 'ferdinand' };
          case 'SETNAMEFRITZ': return { ...acc, name: 'Fritz' };
          case 'SETCITYLEIPZIG': return { ...acc, city: 'leipzig' };
          case 'SETCITYHAMBURG': return { ...acc, city: 'Hamburg' };
          case 'SETLANGDE': return { ...acc, lang: 'DE' };
          default: return acc;
        }
      }, { name: 'Thomas', city: 'Berlin' })
    ).subscribe(e => console.log(e));


    
    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
