import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Basurero } from '../../Basurero';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {
  // displayDialog: boolean;
  // displayAddDialog: boolean;
  // basurero: Basurero = {};  // :Basurero
  // basureroSeleccionado: Basurero; // :Basurero
  // nuevoBasurero: boolean;
  // basureros: Basurero[]; // :Basurero[]
  // roles: SelectItem[];
  // selectedRoles = 'Basurero';
  // cols: any[];
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    // this.cols = [
    //   {field: 'id', header: 'ID'},
    //   {field: 'telefono', header: 'Teléfono'},
    //   {field: 'tipo', header: 'Tipo'},
    //   {field: 'idSensor', header: 'ID Sensor'}
    // ];
    // this.roles = [
    //   {label: 'Administrador', value: 'Administrador'},
    //   {label: 'Basurero', value: 'Basurero'}
    // ];
    // this.basureros = [
    //   {id: 1, telefono: '65236548', tipo: 'Basurero', idSensor: '548'},
    //   {id: 2, telefono: '685485658', tipo: 'Admin', idSensor: '574'},
    //   {id: 3, telefono: '652365478', tipo: 'Basurero', idSensor: '652'},
    //   {id: 4, telefono: '652365482', tipo: 'Admin', idSensor: '324'}
    // ];
  }
  // showDialogToAdd(){
  //   this.nuevoBasurero = true;
  //   this.basurero = {};
  //   this.displayAddDialog = true;
  // }

  // save(){
  //   let basureros = [... this.basureros];
  //   if(this.nuevoBasurero){
  //     this.basurero.tipo = this.selectedRoles;
  //     basureros.push(this.basurero);
  //   } else{
  //     basureros[this.basureros.indexOf(this.basureroSeleccionado)] = this.basurero;
  //   }
  //   this.messageService.clear();
  //   this.basureros = basureros;
  //   this.messageService.add({severity:'success', summary:'Usuario creado', detail:`El usuario #${this.basurero.id} ha sido creado`});
  //   this.basurero = {};
  //   this.displayAddDialog = false;
  // }

  // onRowSelect(event){
  //   this.nuevoBasurero = false;
  //   this.basurero = this.cloneBasurero(event.data);
  //   this.displayDialog = true;
  // }

  // // :Basurero => f() => :Basurero
  // cloneBasurero(b: any): any {
  //   let basurero = {};
  //   for (let prop in b){
  //     basurero[prop] = b[prop];
  //   }
  //   return basurero;
  // }

  // warnDelete(){
  //   this.messageService.clear();
  //   this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: '¿Estás seguro?', detail: 'Estás a punto de borrar a un basurero de la base de datos'});
  // }

  // backToDialog(){
  //   this.displayDialog = true;
  // }

  // onReject(){
  //   this.messageService.clear();

  // }
  // onConfirm(usuario: string){
  //   this.messageService.clear();
  //   let index = this.basureros.indexOf(this.basureroSeleccionado);
  //   this.basureros = this.basureros.filter((val, i) => i != index);
  //   this.basurero = {};
  //   this.displayDialog = false;
  //   this.messageService.add({severity:'success', summary:'Usuario eliminado', detail:`El usuario #${usuario} ha sido eliminado`});
  // }

}
