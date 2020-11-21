import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableRectangleComponent } from './draggable-rectangle.component';

describe('DraggableRectangleComponent', () => {
  let component: DraggableRectangleComponent;
  let fixture: ComponentFixture<DraggableRectangleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggableRectangleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
