import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { HomePage } from './home.page';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../components/shared/shared.module';
import {TiempoCardComponent} from '../../../components/tiempo-card/tiempo-card.component';
import {PollutionLevelsCardComponent} from '../../../components/pollution-levels-card/pollution-levels-card.component';
import {WidgetActionComponent} from '../../../components/widget-action/widget-action.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {path: '', component: HomePage}
    ]),
    SharedModule,
  ],
  declarations: [HomePage,
    TiempoCardComponent,
    PollutionLevelsCardComponent,
    WidgetActionComponent]
})
export class HomePageModule {}
