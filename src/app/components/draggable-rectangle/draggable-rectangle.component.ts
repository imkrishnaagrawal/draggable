import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';

export const enum Status {
  IN_ACTIVE = 0,
  ACTIVE = 1
}

@Component({
  selector: 'app-draggable-rectangle',
  templateUrl: './draggable-rectangle.component.html',
  styleUrls: ['./draggable-rectangle.component.scss']
})
export class DraggableRectangleComponent implements OnInit {

  @Input('width') public width: number;
  @Input('height') public height: number;
  @Input('left') public left: number;
  @Input('top') public top: number;
  @ViewChild("box") public box: ElementRef;

  @Input('parentWidth') public parentWidth: number;
  @Input('parentHeight') public parentHeight: number;
  @Input('Id') public Id: number;
  public activeId: number;

  private boxPosition: { left: number, top: number };
  private containerPos: { left: number, top: number, right: number, bottom: number };
  public mouse: { x: number, y: number }
  public status: Status = Status.IN_ACTIVE;
  private mouseClick: { x: number, y: number, left: number, top: number }

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.activeId = message)
    this.dataService.currentX.subscribe((x:number )=> {
      if (this.activeId == this.Id) {
        if(this.isInsideFence(true, x, this.top)){
          this.left = x
          this.loadBox();
        }
      }
    })
    this.dataService.currentY.subscribe((y:number) => {
      if (this.activeId == this.Id) {
        if(this.isInsideFence(true, this.left, y)){
          this.top = y
          this.loadBox();
        }
      }
    })
  }


  ngAfterViewInit() {
    this.loadBox();
    this.loadContainer();
    this.top = 100;
  }

  private loadBox() {
    let { left, top } = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = { left, top };
  }

  private loadContainer() {
    const left = this.boxPosition.left - this.left;
    const top = this.boxPosition.top - this.top;
    const right = left + this.parentWidth;
    const bottom = top + this.parentHeight;
    this.containerPos = { left, top, right, bottom };

  }
  boxClick() {
    this.dataService.changeMessage(this.Id);
  }

  updateStatus(event: MouseEvent, status: number) {
    if (status === Status.ACTIVE) this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left, top: this.top };
    this.status = status;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    event.stopPropagation();
    this.mouse = { x: event.clientX, y: event.clientY };
    if (this.status === Status.ACTIVE) this.move();
    else this.loadBox();
  }

  private move() {
    if (this.isInsideFence() ) {

        this.left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
        this.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);

      this.dataService.setX(this.left);
      this.dataService.setY(this.top);
    }
  }

  private isInsideFence(keyboardEvent=false,left=undefined, top=undefined) {

    if(keyboardEvent){
      return (
        left > 0 && left < 400 && top > 0 && top < 300
      )

    }else{
      const offsetLeft = this.mouseClick.x - this.boxPosition.left;
      const offsetRight = this.width - offsetLeft;
      const offsetTop = this.mouseClick.y - this.boxPosition.top;
      const offsetBottom = this.height - offsetTop;
      return (
        this.mouse.x > this.containerPos.left + offsetLeft &&
        this.mouse.x < this.containerPos.right - offsetRight &&
        this.mouse.y > this.containerPos.top + offsetTop &&
        this.mouse.y < this.containerPos.bottom - offsetBottom
        );
    }

  }
}
