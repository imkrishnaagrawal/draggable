import { Component,EventEmitter, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'app-sidebar-option',
  templateUrl: './sidebar-option.component.html',
  styleUrls: ['./sidebar-option.component.scss']
})
export class SidebarOptionComponent implements OnInit {

  @Input('label') public label: string;
  @Input('value') public value: number;
  @Input('inputType') public inputType: string;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateValue(value){
    this.value = value;
    this.valueChange.emit(this.value);
  }

}
