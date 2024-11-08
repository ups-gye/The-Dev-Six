import {Component, OnInit} from '@angular/core';
import {IconDirective} from '@coreui/icons-angular';
import { Router } from '@angular/router';

import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective
} from '@coreui/angular';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/Product";
import {User} from "../../../models/User";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, FormsModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective]
})
export class RegisterComponent implements OnInit {

  user: User = {} as User;
  public modalVisible = false;
  public modalMessage = '';

  constructor(private productService: ProductService,  private router: Router ) {
  }

  ngOnInit(): void {
    // this.listenToWebSocket();
  }

  registerUser(form: NgForm) {
    if (form.valid) {
      console.log(form);

      this.user.name = form.value.name;
      this.user.email = form.value.email;
      this.user.password = form.value.password;
      this.user.role = form.value.role;

      this.productService.register(this.user).subscribe(
        (data) => {
          console.log("Usuario registrado exitosamente.");
          this.modalMessage = "Usuario registrado exitosamente.";
          this.modalVisible = true;
          setTimeout(() => {
            this.router.navigate(['/listar-productos']);
          }, 2000);
        },
        (error) => {
          console.log("Error al crear el producto:", error);
          this.modalMessage = "Ocurrió un error al registrarse. Por favor, intenta nuevamente.";
          this.modalVisible = true; // Muestra el modal de error

        }
      )

    }
  }
  closeModal() {
    this.modalVisible = false;
  }

}
