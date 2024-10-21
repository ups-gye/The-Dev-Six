import { Component } from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent, FormControlDirective,
  FormLabelDirective,
  RowComponent
} from "@coreui/angular";

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
    FormControlDirective,
    ButtonDirective
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {

}
