import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { UsersPage } from './users.page';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../components/shared/shared.module';
import {AdminModule} from '../../../components/admin/admin.module';
import {AdminToolbarComponent} from '../../../components/admin/admin-toolbar/admin-toolbar.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {path: '', component: UsersPage}
        ]),
        SharedModule,
        AdminModule
    ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
