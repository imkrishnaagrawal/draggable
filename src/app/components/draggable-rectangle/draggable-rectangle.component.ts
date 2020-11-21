import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';

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
  @Input('Id') public Id: number;

  public activeId: number;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentActiveId.subscribe(activeId => this.activeId = activeId)

    this.dataService.currentX.subscribe((x: number) => {
      if (this.activeId == this.Id) {
        if (this.isInsideFence(x, this.top)) {
          this.left = x
        }
      }
    })
    this.dataService.currentY.subscribe((y: number) => {
      if (this.activeId == this.Id) {
        if (this.isInsideFence(this.left, y)) {
          this.top = y
        }
      }
    })
  }


  ngAfterViewInit() {
    this.top = 100;
  }

  boxClick() {
    this.dataService.setActiveId(this.Id);
  }

  private isInsideFence(left: number, top: number) {
    return (
      left > 0 && left < 400 && top > 0 && top < 300
    )
  }
}
