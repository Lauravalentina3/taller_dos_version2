import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderInternoComponent } from 'src/app/shared/components/header-interno/header-interno.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderInternoComponent]
})
export class InicioPage {

  constructor(private router: Router) {}

  // Navegación al pulsar el botón principal
  irAExplorar() {
    this.router.navigate(['/explorar']);
  }

  // Navegación al pulsar tarjetas
  irASeccion(seccion: string) {
    this.router.navigate([`/${seccion}`]);
  }
}
