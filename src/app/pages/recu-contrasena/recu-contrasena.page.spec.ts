import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuContrasenaPage } from './recu-contrasena.page';

describe('RecuContrasenaPage', () => {
  let component: RecuContrasenaPage;
  let fixture: ComponentFixture<RecuContrasenaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
