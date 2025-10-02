import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  ToastController, 
  IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton, IonList, IonLabel 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-recu-contrasena',
  templateUrl: './recu-contrasena.page.html',
  styleUrls: ['./recu-contrasena.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton, IonList, IonLabel
  ]
})
export class RecuContrasenaPage implements OnInit {
  recuperarForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.recuperarForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  async enviarRecuperacion() {
    if (this.recuperarForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor ingresa un correo válido',
        duration: 2500,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
      this.recuperarForm.markAllAsTouched();
      return;
    }

    const correo = this.recuperarForm.value.correo;

    const toast = await this.toastCtrl.create({
      message: `Se envió un enlace de recuperación a ${correo}`,
      duration: 2500,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    // Redirige al login después de que termine el toast
    toast.onDidDismiss().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
