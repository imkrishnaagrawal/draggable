import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DraggableRectangleComponent } from '@components/draggable-rectangle/draggable-rectangle.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { SidebarOptionComponent } from '@components/sidebar-option/sidebar-option.component';
@NgModule({
  declarations: [
    AppComponent,
    DraggableRectangleComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarOptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
