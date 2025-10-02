import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message: string,
    duration = 2000,
    position: 'bottom' | 'middle' | 'top',
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'light'
  ): Promise<void> {
    const toast = this.toastController.create({
      message,
      duration,
      position,
      color,
    });

    (await toast).present();
  }
}
