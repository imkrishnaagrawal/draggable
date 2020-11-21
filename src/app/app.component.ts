import { AfterViewInit, Component, ComponentFactoryResolver, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DraggableRectangleComponent } from './components/draggable-rectangle/draggable-rectangle.component';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  //title
  title = 'drawable';

  //options
  velocity = 10;
  width = 700;
  height = 450;

  //rectangle
  currentIndex = 0;
  rectangleWidth = 300;
  rectangleHeight = 150;

  activeId = -1;
  isKeyboardEnabled = true;
  keyboardHandlerWrapper: any;

  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;
  componentRef = [];
  constructor(private window: Window, private dataService: DataService, private componentFactoryResolver: ComponentFactoryResolver) { }
  ngOnInit() {
    this.dataService.currentMessage.subscribe((activeId: number) => this.activeId = activeId)
    this.enableKeyListener();

  }
  ngAfterViewInit() {}

  resetActiveId(event: any) {

    if (event.target.id == 'container') {
      this.dataService.changeMessage(-1);
    }
  }

  @HostListener('document:keydown.delete', ['$event'])
  onDeleteComponent() {
    this.componentRef = this.componentRef.filter(componentRef => {
      const component = <DraggableRectangleComponent>componentRef.instance;

      if (component.Id == this.activeId) {

        this.dynamicInsert.remove(this.dynamicInsert.indexOf(componentRef.hostView));

      }
      return component.Id !== this.activeId
    });

  }
  changeKeyboardListener() {
    if (this.isKeyboardEnabled) {
      this.disableKeyListener();
    } else {
      this.enableKeyListener();
    }
    this.isKeyboardEnabled = !this.isKeyboardEnabled;
  }
  disableKeyListener() {
    this.window.document.removeEventListener('keypress', this.keyboardHandlerWrapper);
  }
  enableKeyListener() {
    this.keyboardHandlerWrapper = this.handleKeyboardEvent.bind(this);
    this.window.document.addEventListener('keypress', this.keyboardHandlerWrapper);
  }

  handleKeyboardEvent(event: KeyboardEvent) {

    switch (event.key.toLowerCase()) {

      case 'w':
        this.dataService.updateY(this.velocity * -1)
        break;
      case 's':
        this.dataService.updateY(this.velocity * 1)
        break;
      case 'a':
        this.dataService.updateX(this.velocity * -1)
        break;
      case 'd':
        this.dataService.updateX(this.velocity * 1)
        break;
      default:
        break;
    }
  }

  createRectangle() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DraggableRectangleComponent);
    const draggableComponentRef = this.dynamicInsert.createComponent(componentFactory);
    const draggableComponent = <DraggableRectangleComponent>draggableComponentRef.instance;
    draggableComponent.parentHeight = this.height;
    draggableComponent.parentWidth = this.width;
    draggableComponent.height = this.rectangleHeight;
    draggableComponent.width = this.rectangleWidth;
    draggableComponent.left = 100;
    draggableComponent.top = 100;
    draggableComponent.Id = this.currentIndex;
    this.componentRef.push(draggableComponentRef);
    this.currentIndex += 1;
  }
}
