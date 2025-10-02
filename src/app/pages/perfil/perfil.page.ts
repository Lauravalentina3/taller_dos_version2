import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonGrid, IonRow, IonCol, IonItem, IonLabel, 
  IonButton, IonAvatar, IonIcon, IonList, IonInput
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';   // 👈 Importa Router
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonGrid, IonRow, IonCol, IonItem, IonLabel,
    IonButton, IonAvatar, IonIcon, IonList, IonInput
  ]
})
export class PerfilPage implements OnInit {
  info = {
    nombre: "",
    apellidos: "",
    correo: "",
    tel: "",
    imagen: "" 
  };

  editando = false;

  constructor(
    private storageService: StorageService,
    private router: Router                // 👈 Inyecta Router aquí
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getInfo();
    }, 500);
  }

  async getInfo(): Promise<void> {
    this.info.nombre = await this.storageService.get("nombre");
    this.info.apellidos = await this.storageService.get("apellidos");
    this.info.correo = await this.storageService.get("correo");
    this.info.tel = await this.storageService.get("telefono");
    this.info.imagen = await this.storageService.get("imagen");
  }

  editar() {
    this.editando = true;
  }

  cancelar() {
    this.editando = false;
    this.getInfo();
  }

  async guardar() {
    await this.storageService.set("nombre", this.info.nombre);
    await this.storageService.set("apellidos", this.info.apellidos);
    await this.storageService.set("correo", this.info.correo);
    await this.storageService.set("telefono", this.info.tel);
    await this.storageService.set("imagen", this.info.imagen);

    this.editando = false;
  }

  // Cambiar imagen
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.info.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // 👇 Botón para volver al inicio
  volverInicio() {
    this.router.navigate(['/inicio']);
  }
}
