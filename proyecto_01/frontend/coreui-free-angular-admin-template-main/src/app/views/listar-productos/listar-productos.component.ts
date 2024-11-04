import {Component} from '@angular/core';
import {
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent, FormControlDirective, FormLabelDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective, RowComponent,
  TableColorDirective,
  TableDirective
} from "@coreui/angular";
import {Product} from "../../models/Product";
import {ProductService} from "../../services/product.service";
import {CommonModule} from '@angular/common';
import {freeSet} from '@coreui/icons'; // Importar solo el conjunto de iconos gratuitos
import {IconComponent, IconDirective, IconSetService, IconModule} from '@coreui/icons-angular';
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    CommonModule,
    TableColorDirective,
    IconDirective,
    ButtonDirective,
    IconComponent,
    IconModule,
    ModalHeaderComponent,
    ModalComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalToggleDirective,
    ModalTitleDirective,
    ButtonCloseDirective,
    FormsModule,
    FormControlDirective,
    FormLabelDirective,
    RowComponent
  ],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.scss',
  providers: [IconSetService]
})
export class ListarProductosComponent {
  productos: Product[] = [];
  icons = {...freeSet};
  selectedProduct: any = {};
  selectedProductForDeletion: any = {};
  modalMessage = '';
  modalVisible = false;
  confirmDeleteModalVisible = false; // Controla la visibilidad del modal de confirmación de eliminación


  constructor(private productService: ProductService,) {
    this.getProducts();

  }

  ngOnInit(): void {
  this.getProducts();
    this.modalVisible = false;
  }

  getProducts() {
    const query = {
      query: `
        {
          allProducts {
            codigoProducto
            nombreProducto
            stock
            precioUnitario
            categoria
            subcategoria
            proveedor
          }
        }
      `
    };


    this.productService.getProducts(query).subscribe(
      (response: any) => {
        if (response && response.data && response.data.allProducts) {
          this.productos = response.data.allProducts.sort((a: any, b: any) => a.codigoProducto.localeCompare(b.codigoProducto));
        } else {
          console.error("The response does not contain products:", response);
        }
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

  openDeleteModal(product: any) {
    this.selectedProductForDeletion = product;
    this.confirmDeleteModalVisible = true;
  }

  confirmDeleteProduct() {
    const productId = this.selectedProductForDeletion.codigoProducto;
    this.productService.deleteProduct(productId).subscribe(response => {
      console.log('Producto eliminado:', response);

      // Actualizar la lista de productos después de la eliminación
      this.getProducts();

      // Cerrar el modal de confirmación y mostrar un mensaje de éxito
      this.confirmDeleteModalVisible = false;
      this.modalMessage = 'Producto eliminado exitosamente';
      this.modalVisible = true;

    }, error => {
      console.error('Error al eliminar el producto:', error);
      this.modalMessage = 'Error al eliminar el producto';
      this.modalVisible = true;
    });
  }
  updateProduct(form: any) {
    if (form.valid) {
      this.productService.updateProduct(this.selectedProduct).subscribe(response => {
        console.log('Producto actualizado:', response);
        this.getProducts();

        document.getElementById('closeEditModalButton')?.click();

        this.modalMessage = 'Producto actualizado exitosamente';
        this.modalVisible = true;

        form.resetForm();
        this.selectedProduct = {}; // Limpia el producto seleccionado



      }, error => {
        console.error('Error al actualizar el producto:', error);
        this.modalMessage = 'Error al actualizar el producto';
        this.modalVisible = true;
      });
    }
    else {
      this.modalMessage = "Ocurrió un error al actualizar el producto. Por favor, intenta nuevamente.";
      this.modalVisible = true;
    }
  }

  setSelectedProduct(product: any) {
    this.selectedProduct = { ...product };

  }
  closeModal() {
    this.modalVisible = false;
  }

}
