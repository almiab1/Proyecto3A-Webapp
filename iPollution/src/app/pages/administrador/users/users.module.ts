import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { UsersPage } from './users.page';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../components/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {path: '', component: UsersPage}
        ]),
        SharedModule
    ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
