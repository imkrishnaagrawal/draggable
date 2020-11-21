import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private posX = new BehaviorSubject(100);
  currentX = this.posX.asObservable();

  private posY = new BehaviorSubject(100);
  currentY = this.posY.asObservable();

  private activeId = new BehaviorSubject(-1);
  currentActiveId = this.activeId.asObservable();

  constructor() {
  }

  setActiveId(message: number) {
    this.activeId.next(message)
  }
  setX(x: number){
    this.posX.next(x);
  }
  setY(y: number){
    this.posY.next(y);
  }
  updateX(x: number){
    this.posX.next(this.posX.value + x);
  }

  updateY(y: number){
    this.posY.next(this.posY.value + y);
  }
}
