import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url
  }

  getProducts(body: any): Observable<any> {
    return this.http.post(this.url, body);
  }

  createProduct(product: any) {
    const body = {
      query: `mutation {
      addProduct(product: {
        codigoProducto: "${product.codigoProducto}",
        nombreProducto: "${product.nombreProducto}",
        stock: ${product.stock},
        precioUnitario: ${product.precioUnitario},
        categoria: "${product.categoria}",
        subcategoria: "${product.subcategoria}",
        proveedor: "${product.proveedor}"
      }) {
        codigoProducto,
        nombreProducto,
        stock,
        precioUnitario,
        categoria,
        subcategoria,
        proveedor
      }
    }`
    };
    console.log(body);
    return this.http.post(this.url, body);
  }

  updateProduct(product: any) {
    const body = {
      query: `mutation {
      updateProduct(productId: "${product.codigoProducto}", product: {
        codigoProducto: "${product.codigoProducto}",
        nombreProducto: "${product.nombreProducto}",
        stock: ${product.stock},
        precioUnitario: ${product.precioUnitario},
        categoria: "${product.categoria}",
        subcategoria: "${product.subcategoria}",
        proveedor: "${product.proveedor}"
      }) {
        codigoProducto,
        nombreProducto,
        stock,
        precioUnitario,
        categoria,
        subcategoria,
        proveedor
      }
    }`
    };
    console.log(body);
    return this.http.post(this.url, body);
  }

  deleteProduct(productId: string) {
    const body = {
      query: `mutation {
      deleteProduct(productId: "${productId}")
    }`
    };
    return this.http.post(this.url, body);
  }


}
