import { Component } from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  TableColorDirective,
  TableDirective
} from "@coreui/angular";
import {Product} from "../../models/Product";
import {ProductService} from "../../services/product.service";
import { CommonModule } from '@angular/common';
import { freeSet } from '@coreui/icons'; // Importar solo el conjunto de iconos gratuitos
import {IconComponent, IconDirective, IconSetService,IconModule} from '@coreui/icons-angular';
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
    IconModule
  ],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.scss',
  providers: [IconSetService]
})
export class ListarProductosComponent {
  productos: Product[]=[];
  icons = { ...freeSet };
  constructor(private productService:ProductService, ) {
  }
ngOnInit(): void {

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
          this.productos = response.data.allProducts; // Assign the products to the array
        } else {
          console.error("The response does not contain products:", response);
        }
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }
}
