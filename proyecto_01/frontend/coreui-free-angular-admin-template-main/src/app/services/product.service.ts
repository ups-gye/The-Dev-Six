import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import {map} from "rxjs/operators";
import {User} from "../models/User";

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

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Agrega el JWT en el encabezado Authorization
    });
  }
  getProducts(body: any): Observable<any> {
    return this.http.post(this.url_graphql, body, { headers: this.getAuthHeaders() });
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
    return this.http.post(this.url_graphql, body, { headers: this.getAuthHeaders() });
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
    return this.http.post(this.url_graphql, body, { headers: this.getAuthHeaders() });
  }

  deleteProduct(productId: string) {
    const body = {
      query: `mutation {
      deleteProduct(productId: "${productId}")
    }`
    };
    return this.http.post(this.url_graphql, body, { headers: this.getAuthHeaders() });
  }

  buscarProductos(filtros: any): Observable<Product[]> {
    let params = new HttpParams();
    if (filtros.productName) params = params.set('productName', filtros.productName);
    if (filtros.minPrice) params = params.set('minPrice', filtros.minPrice);
    if (filtros.maxPrice) params = params.set('maxPrice', filtros.maxPrice);
    if (filtros.category) params = params.set('category', filtros.category);
    if (filtros.subcategory) params = params.set('subcategory', filtros.subcategory);

    return this.http.get<any>(this.url_rest+'products/search', { params,
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.frame || []) // Extrae el array de productos desde `frame`
    );
  }

}
