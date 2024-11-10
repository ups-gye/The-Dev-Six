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
import {WebSocketService} from "../web-socket.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-buscar-productos',
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
  templateUrl: './buscar-productos.component.html',
  styleUrl: './buscar-productos.component.scss'
})
export class BuscarProductosComponent implements OnInit {
  productos: Product[] = [];
  icons = {...freeSet};
  private messagesSubscription?: Subscription;
  updateVisibleModal = false;
  filtros = {
    productName: '',
    minPrice: '',
    maxPrice: '',
    category: '',
    subcategory: '',
  };
  constructor(private productService: ProductService, private webSocketService: WebSocketService,
              private router: Router) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userRole = user?.role;

    if (!token ) {
      console.error(' Redirigiendo al login.');
      this.router.navigate(['/login']); // Redirige al login si no se cumple el acceso
      return;
    }
   }

  buscarProductos(): void {
    this.productService.buscarProductos(this.filtros).subscribe(
      (productos) => {
        this.productos = productos; // Aquí `productos` ya es el array extraído de `frame`
      },
      (error) => {
        console.error('Error al buscar productos:', error);
      }
    );
  }

  limpiarFiltros(): void {
    this.filtros = { productName: '', minPrice: '', maxPrice: '', category: '', subcategory: '' };
    this.productos = [];

    // this.buscarProductos();

  }
}
