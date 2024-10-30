import {Component} from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormLabelDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  RowComponent, ThemeDirective
} from "@coreui/angular";
import {Product} from "../../models/Product";
import {ProductService} from "../../services/product.service";
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    CardBodyComponent,
    RowComponent,
    FormLabelDirective,
    CommonModule,
    FormControlDirective,
    ButtonDirective,
    FormsModule,
    ModalComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  producto: Product = {} as Product; // Asegúrate de que `Product` esté correctamente importado
  public visible = false;
  public modalVisible = false;
  public modalMessage = '';

  constructor(private productService: ProductService) {
  }

  createProduct(form: NgForm) {
    if (form.valid) { // Verifica que el formulario sea válido antes de continuar
      console.log(form);

      this.producto.codigoProducto = form.value.codigoProducto;
      this.producto.nombreProducto = form.value.nombreProducto;
      this.producto.stock = form.value.stock;
      this.producto.precioUnitario = form.value.precioUnitario;
      this.producto.categoria = form.value.categoria;
      this.producto.subcategoria = form.value.subcategoria;
      this.producto.proveedor = form.value.proveedor;

      this.productService.createProduct(this.producto).subscribe(
        (data) => {
          this.modalMessage = "Producto creado exitosamente.";
          this.modalVisible = true
        },
        (error) => {
          console.error("Error al crear el producto:", error);
          this.modalMessage = "Ocurrió un error al crear el producto. Por favor, intenta nuevamente.";
          this.modalVisible = true; // Muestra el modal de error
        }
      );
    } else {
      this.modalMessage = "Por favor, completa todos los campos requeridos.";
      this.modalVisible = true; // Muestra el modal de error
    }
  }

  closeModal() {
    this.modalVisible = false;
  }
}
