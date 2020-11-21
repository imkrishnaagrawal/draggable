import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-draggable-rectangle',
  templateUrl: './draggable-rectangle.component.html',
  styleUrls: ['./draggable-rectangle.component.scss']
})
export class DraggableRectangleComponent implements OnInit, OnDestroy {

  @Input('width') public width: number;
  @Input('height') public height: number;
  @Input('left') public left: number;
  @Input('top') public top: number;
  @Input('Id') public Id: number;

  public activeId: number;
  private subscription: Subscription

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscription = new Subscription();
    this.subscription.add(this.dataService.currentActiveId.subscribe(activeId => this.activeId = activeId));
    this.subscription.add(this.dataService.currentXs[this.Id].subscribe((x: number) => {
      if (this.activeId == this.Id) {
        if (this.isInsideFence(x, this.top)) {
          this.left = x
        }
      }
    }));
    this.subscription.add(this.dataService.currentYs[this.Id].subscribe((y: number) => {
      if (this.activeId == this.Id) {
        if (this.isInsideFence(this.left, y)) {
          this.top = y
        }
      }
    }));
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
