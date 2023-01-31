import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class InventarioComponent implements OnInit {

  formDialog!: boolean;;
  medicamentos!:any[];
  formNuevoMedicamento!: FormGroup;
  typeFormMedicamento = "create";
  idMedToEdit = null;
  value!: Date;

  constructor(private inventarioService: InventarioService, 
                private messageService: MessageService, 
                private confirmationService: ConfirmationService,
                private formBuilder: FormBuilder,) { }

    ngOnInit() {
        this.cargarMedicamentos();
        this.buildForm();
    }

    cargarMedicamentos() {
        this.inventarioService.cargarMedicamentos().then( (data:any) => {
            this.medicamentos = data;
        });
    }

    private buildForm(): void {
        this.formNuevoMedicamento = this.formBuilder.group({
            nombre: ["", [
                Validators.required,
            ]],
            laboratorio: ["", [
                Validators.required,
            ]],
            fecha_creacion: ["", [
                Validators.required,
            ]],
            fecha_vencimiento: ["", [
                Validators.required,
            ]],
            stock: ["", [
                Validators.required,
            ]],
            valor: ["", [
                Validators.required,
            ]],
        });
      }

  openNew() {
      this.formDialog = true;
      this.typeFormMedicamento = "create";
  }

  editProduct(medicamento: any) {
    this.typeFormMedicamento = "edit";
    this.idMedToEdit = medicamento.id;
    this.formNuevoMedicamento.patchValue(
        {   
            nombre: medicamento.nombre, 
            laboratorio: medicamento.laboratorio,
            fecha_creacion: medicamento.fecha_creacion,
            fecha_vencimiento: medicamento.fecha_vencimiento,
            stock: medicamento.stock,
            valor: medicamento.valor
        });
    this.formDialog = true;
  }

  deleteProduct(medicamento:any) {
    this.confirmationService.confirm({
        message: 'Esta seguro que quiere eliminar este medicamento?',
        accept: () => {
            this.inventarioService.borrarMedicamento(medicamento.id).then ( ()=> {
                this.messageService.add({severity:'success', summary: 'Bien', detail: 'Medicamento eliminado con exito', life: 3000});
                this.cargarMedicamentos();
            });
        }
    });
  }

  hideDialog() {
      this.formDialog = false;
  }

  saveProduct() {
    const timestamp = Date.now();
    const med = {
        "nombre": this.formNuevoMedicamento.value.nombre,
        "laboratorio": this.formNuevoMedicamento.value.laboratorio,
        "fecha_creacion": timestamp,
        "fecha_vencimiento": this.formNuevoMedicamento.value.fecha_vencimiento,
        "stock": this.formNuevoMedicamento.value.stock,
        "valor": this.formNuevoMedicamento.value.valor
    }
    if (this.typeFormMedicamento === 'create') {
        this.inventarioService.guardarMedicamento(med).then( () => {
          this.createOrUpdateSuccess('creado');
        });
    } else if (this.typeFormMedicamento === 'edit') {
        this.inventarioService.actulizarMedicamento(this.idMedToEdit, med).then( () => {
          this.createOrUpdateSuccess('actualizado');
        });
    }
  }

  createOrUpdateSuccess(messageType: string) {
    this.formDialog = false;
    this.messageService.add({severity:'success', summary: 'Bien', detail: 'Medicamento '+ messageType + ' con exito', life: 3000});
    this.cargarMedicamentos();
  }

  seCerroELdialog() {
    this.buildForm();
  }
}
