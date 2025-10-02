import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonImg,
  IonButton,
  IonIcon,
  IonNote
} from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonImg,
    IonButton,
    IonIcon,
    IonNote
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {}

  async login(): Promise<void> {
    const result = this.validateForm();

    if (result) {
      try {
        const email = this.loginForm.controls['correo'].value;
        const password = this.loginForm.controls['contrasena'].value;
        const emailSaved: string = await this.storageService.get('correo');
        const passwordSaved: string = await this.storageService.get('contrasena');

        if (email === emailSaved && password === passwordSaved) {
          this.toastService.presentToast(
            'Bienvenido',
            2000,
            'bottom',
            'success'
          );

          this.router.navigate(['/perfil']);
        } else {
          this.toastService.presentToast(
            'Usuario o contraseña incorrectos',
            2000,
            'bottom',
            'danger'
          );
        }
      } catch (error) {
        console.error('Ha ocurrido un error al obtener la información');
        this.toastService.presentToast(
          'Ha ocurrido un error \n Reportalo al administrador',
          2000,
          'bottom',
          'danger'
        );
      }
    }
  }

  validateForm(): boolean {
    if (this.loginForm.controls['correo'].invalid) {
      this.loginForm.controls['correo'].markAsDirty();
      this.toastService.presentToast(
        "Debes ingresar tu correo para continuar",
        3000,
        'bottom',
        'light'
      );

      return false;
    }

    if (this.loginForm.controls['contrasena'].invalid) {
      this.loginForm.controls['contrasena'].markAsDirty();
      this.toastService.presentToast(
        "La contraseña es obligatoria y debe tener minimo 10 caracteres",
        3000,
        'bottom',
        'light'
      );

      return false;
    }

    return true;
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }

  googleLogin() {
    console.log('Iniciar sesión con Google');
  }

  goToRecuperar() {
  this.router.navigateByUrl('/recu-contrasena');
}
}
