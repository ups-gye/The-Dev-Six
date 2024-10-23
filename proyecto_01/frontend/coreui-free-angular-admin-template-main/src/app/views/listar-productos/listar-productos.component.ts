import { Component } from '@angular/core';
import {CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, TableDirective} from "@coreui/angular";
import {Product} from "../../models/Product";
import {ProductService} from "../../services/product.service";
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http'; // Importa el proveedor HttpClient

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    CommonModule
  ],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.scss'
})
export class ListarProductosComponent {
  productos: Product[]=[];

  constructor(private productService:ProductService) {}
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
