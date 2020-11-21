import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private posXs: Array<BehaviorSubject<number>> = [];
  currentXs: Array<Observable<number>> = [];

  private posYs: Array<BehaviorSubject<number>> = [];
  currentYs: Array<Observable<number>> = [];

  private activeId = new BehaviorSubject(-1);
  currentActiveId = this.activeId.asObservable();

  constructor() {
  }

  createObservable(Id:number){
    this.posXs[Id] = new BehaviorSubject(100);
    this.currentXs[Id] = this.posXs[Id].asObservable();

    this.posYs[Id] = new BehaviorSubject(100);
    this.currentYs[Id] = this.posYs[Id].asObservable();
  }

  setActiveId(message: number) {
    this.activeId.next(message)
  }
  setX(x: number, Id:number){
    this.posXs[Id].next(x);
  }
  setY(y: number, Id:number){
    this.posYs[Id].next(y);
  }
  updateX(x: number, Id:number){
    if (this.posXs[Id].value + x > 0 && this.posXs[Id].value + x < 400){
      this.posXs[Id].next(this.posXs[Id].value + x);
    }
  }

  updateY(y: number, Id: number){
    if (this.posYs[Id].value + y > 0 && this.posYs[Id].value + y < 300){
    this.posYs[Id].next(this.posYs[Id].value + y);
    }
  }
}
