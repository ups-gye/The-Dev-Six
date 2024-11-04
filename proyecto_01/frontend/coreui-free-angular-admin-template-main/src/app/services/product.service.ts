import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url_graphql : string;
  private url_rest: string;

  constructor(private http: HttpClient) {
    this.url_graphql = environment.url_graphql
    this.url_rest = environment.url_rest

  }

  getProducts(body: any): Observable<any> {
    return this.http.post(this.url_graphql, body);
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
    return this.http.post(this.url_graphql, body);
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
    return this.http.post(this.url_graphql, body);
  }

  deleteProduct(productId: string) {
    const body = {
      query: `mutation {
      deleteProduct(productId: "${productId}")
    }`
    };
    return this.http.post(this.url_graphql, body);
  }

  buscarProductos(filtros: any): Observable<Product[]> {
    let params = new HttpParams();
    if (filtros.productName) params = params.set('productName', filtros.productName);
    if (filtros.minPrice) params = params.set('minPrice', filtros.minPrice);
    if (filtros.maxPrice) params = params.set('maxPrice', filtros.maxPrice);
    if (filtros.category) params = params.set('category', filtros.category);
    if (filtros.subcategory) params = params.set('subcategory', filtros.subcategory);

    return this.http.get<any>(this.url_rest, { params }).pipe(
      map(response => response.frame || []) // Extrae el array de productos desde `frame`
    );
  }

}
