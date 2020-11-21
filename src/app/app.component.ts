import { WINDOW } from './services/window.service';
import { Subscription } from 'rxjs';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, OnDestroy, Inject } from '@angular/core';
import { DraggableRectangleComponent } from '@components/draggable-rectangle/draggable-rectangle.component';
import { DataService } from '@services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  //title
  title = 'Draggable';

  //options
  velocity = 10;
  rectangleWidth = 300;
  rectangleHeight = 150;

  // container
  width = 691;
  height = 451;

  //rectangle
  currentIndex = 0;

  activeId = -1;
  isKeyboardEnabled = true;
  keyboardHandlerWrapper: any;
  deleteHandlerWrapper: any;
  private subscription: Subscription;

  @ViewChild('boxContainer', { read: ViewContainerRef }) boxContainer: ViewContainerRef;
  componentRef = [];


  constructor(@Inject(WINDOW) private window: Window, private dataService: DataService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.subscription = new Subscription();
    this.subscription.add(this.dataService.currentActiveId.subscribe((activeId: number) => this.activeId = activeId))
    this.enableKeyListener();
  }

  resetActiveId(event: any) {
    if (event.target.id == 'container') {
      this.dataService.setActiveId(-1);
    }
  }

  toggleKeyboardListener() {
    if (this.isKeyboardEnabled) {
      this.disableKeyListener();
    } else {
      this.enableKeyListener();
    }
    this.isKeyboardEnabled = !this.isKeyboardEnabled;
  }

  disableKeyListener() {
    this.window.document.removeEventListener('keypress', this.keyboardHandlerWrapper);
    this.window.document.removeEventListener('keydown', this.deleteHandlerWrapper);
  }

  enableKeyListener() {
    this.keyboardHandlerWrapper = this.handleKeyboardEvent.bind(this);
    this.deleteHandlerWrapper = this.handleDeleteEvent.bind(this);
    this.window.document.addEventListener('keypress', this.keyboardHandlerWrapper);
    this.window.document.addEventListener('keydown', this.deleteHandlerWrapper);
  }

  handleKeyboardEvent(event: KeyboardEvent) {

    switch (event.key.toLowerCase()) {

      case 'w':
        this.dataService.updateY(this.velocity * -1, this.activeId)
        break;
      case 's':
        this.dataService.updateY(this.velocity * 1, this.activeId)
        break;
      case 'a':
        this.dataService.updateX(this.velocity * -1, this.activeId)
        break;
      case 'd':
        this.dataService.updateX(this.velocity * 1, this.activeId)
        break;
      default:
        break;
    }
  }

  handleDeleteEvent(event: any) {
    if (event.keyCode === 46) {

      this.componentRef = this.componentRef.filter(componentRef => {
        const component = <DraggableRectangleComponent>componentRef.instance;
        if (component.Id === this.activeId) {
          this.boxContainer.remove(this.boxContainer.indexOf(componentRef.hostView));
        }
        return component.Id !== this.activeId
      });
    }

  }


  createRectangle() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DraggableRectangleComponent);
    const draggableComponentRef = this.boxContainer.createComponent(componentFactory);
    draggableComponentRef.instance.height = this.rectangleHeight;
    draggableComponentRef.instance.width = this.rectangleWidth;
    draggableComponentRef.instance.left = 100;
    draggableComponentRef.instance.top = 100;
    draggableComponentRef.instance.Id = this.currentIndex;
    this.componentRef.push(draggableComponentRef);
    this.dataService.createObservable(this.currentIndex);
    this.currentIndex += 1;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.disableKeyListener()
  }
}
