import { Component } from '@angular/core';
import {CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, TableDirective} from "@coreui/angular";

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective
  ],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.scss'
})
export class ListarProductosComponent {

}
