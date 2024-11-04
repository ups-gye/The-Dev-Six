import {Component, OnInit} from '@angular/core';
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
import {Subscription} from "rxjs";
import {WebSocketService} from "../web-socket.service";

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
export class ListarProductosComponent  implements  OnInit{
  productos: Product[] = [];
  icons = {...freeSet};
  selectedProduct: any = {};
  selectedProductForDeletion: any = {};
  modalMessage = '';
  modalVisible = false;
  confirmDeleteModalVisible = false; // Controla la visibilidad del modal de confirmación de eliminación
  private messagesSubscription?: Subscription;
  updateVisibleModal=false;

  constructor(private productService: ProductService, private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.listenToWebSocket();

  }

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
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
    this.productService.deleteProduct(productId).subscribe(() => {
      console.log('Producto eliminado');
      this.getProducts();
      this.confirmDeleteModalVisible = false;
    }, error => {
      console.error('Error al eliminar el producto:', error);
    });
  }

  updateProduct(form: any) {
    if (form.valid) {
      this.productService.updateProduct(this.selectedProduct).subscribe(() => {
        console.log('Producto actualizado');
        this.getProducts();
        this.updateVisibleModal=false;

        form.resetForm();
        this.selectedProduct = {}; // Limpia el producto seleccionado
      }, error => {
        console.error('Error al actualizar el producto:', error);
      });
    }
  }

  setSelectedProduct(product: any) {
    this.selectedProduct = {...product};
    this.updateVisibleModal=true;
  }

  closeModal() {
    this.modalVisible = false;
  }


  private listenToWebSocket() {
    this.messagesSubscription = this.webSocketService.getMessages().subscribe(
      (message) => {
        console.log('Mensaje recibido desde el WebSocket:', message);
        this.showModalWithMessage(message);
      },
      (error) => {
        console.error('Error al recibir mensajes del WebSocket:', error);
      }
    );
  }

  private showModalWithMessage(message: string) {
    this.modalMessage = message;
    this.modalVisible = true;
  }
}
