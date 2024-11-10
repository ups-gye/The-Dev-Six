import {Component, OnInit} from '@angular/core';
import {NgStyle} from '@angular/common';
import {IconDirective} from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective
} from '@coreui/angular';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, FormsModule, ReactiveFormsModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective]
})
export class LoginComponent implements OnInit {
  user: User = {} as User;
  public modalVisible = false;
  public modalMessage = '';
  token: string | undefined;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }


  login(form: NgForm) {
    if (form.valid) {
      this.user.email = form.value.email;
      this.user.password = form.value.password;

      this.userService.login(this.user).subscribe(
        data => {

          if (data && data.token) {
            this.modalMessage = "Inicio de Sesion exitoso.";
            this.modalVisible = true;
            console.log("Inicio de Sesion exitoso");
            console.log(data);
            this.token = data.token;
            this.user.role = data.frame.role;
            this.user.name = data.frame.name;
            this.user.email = data.frame.email;
            this.user.password = data.frame.password;

            localStorage.setItem('token', this.token ?? '');
            localStorage.setItem('user', JSON.stringify(this.user));
          } else {
            console.error("Error: La respuesta del servidor no contiene el token o la información del usuario.");
            this.modalMessage = "Ocurrió un error al iniciar sesion. Por favor, intenta nuevamente.";
            this.modalVisible = true; // Muestra el modal de error
          }
        },
        (error) => {
          console.log("Error al iniciar sesion", error);
          this.modalMessage = "Ocurrió un error al iniciar sesion. Por favor, intenta nuevamente.";
          this.modalVisible = true; // Muestra el modal de error
        }
      )
    }else {
      this.modalMessage = "Por favor, completa todos los campos requeridos.";
      this.modalVisible = true;

    }
  }
  closeModal() {
    this.modalVisible = false;

    // Redirigir solo después de que el usuario haya cerrado el modal
    if (this.user.role === 'admin') {
      this.router.navigate(['/listar-productos']);
    } else {
      this.router.navigate(['/buscar-productos']);
    }
  }
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
