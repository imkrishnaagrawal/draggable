
import { Component,EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input('rectangleWidth') public rectangleWidth : number;
  @Input('rectangleHeight') public rectangleHeight : number;
  @Input('velocity') public velocity : number;

  @Output() velocityChange: EventEmitter<number> = new EventEmitter();
  @Output() rectangleWidthChange: EventEmitter<number> = new EventEmitter();
  @Output() rectangleHeightChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  updateVelocity(event){
    this.velocity = event.target.value;
    this.velocityChange.emit(this.velocity);
  }

  updateRectangleHeight(event){
    this.rectangleHeight = event.target.value;
    this.rectangleHeightChange.emit(this.rectangleHeight);
  }

  updateRectangleWidth(event){
    this.rectangleWidth = event.target.value;
    this.rectangleWidthChange.emit(this.rectangleWidth);
  }

}
