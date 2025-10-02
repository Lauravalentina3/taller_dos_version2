import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  IonList,
  IonIcon,
  IonText,
  IonNote,
} from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCheckbox,
    IonList,
    IonIcon,
    IonText,
    IonNote,
  ],
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group(
      {
        nombre: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        contrasena: ['', [Validators.required, Validators.minLength(10)]],
        confirmarContrasena: ['', [Validators.required]],
        terminos: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Validador de contraseña
  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('contrasena')?.value;
    const confirm = form.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  saveRegisterData(): void {
    try {
      this.storageService.set("nombre", this.registroForm.controls['nombre'].value);
      this.storageService.set("apellidos", this.registroForm.controls['apellidos'].value);
      this.storageService.set("correo", this.registroForm.controls['correo'].value);
      this.storageService.set("telefono", this.registroForm.controls['telefono'].value);
      this.storageService.set("contrasena", this.registroForm.controls['contrasena'].value);
      this.storageService.set("terminos", this.registroForm.controls['terminos'].value);
    } catch (error) {
      console.error('Ha ocurrido un error al guardar la información');
    }
  }


  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario válido:', this.registroForm.value);
      this.saveRegisterData();
      this.router.navigate(['/login']);
    } else {
      console.log('Formulario inválido');
      this.registroForm.markAllAsTouched();
    }
  }
}
