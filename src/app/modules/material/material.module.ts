import { NgModule } from '@angular/core';

import { MatButtonModule, MatTabsModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';




const MaterialComponents = [
  MatButtonModule,
  MatTabsModule,
  DragDropModule,
  MatCardModule,
  MatDividerModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})

export class MaterialModule { }
