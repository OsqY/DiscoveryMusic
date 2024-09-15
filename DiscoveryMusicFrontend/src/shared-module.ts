import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './app/nav-bar/nav-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavBarComponent],
  exports: [NavBarComponent],
})
export class SharedModule {}
