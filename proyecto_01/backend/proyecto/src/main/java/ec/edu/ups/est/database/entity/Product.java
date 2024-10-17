package ec.edu.ups.est.database.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;



@Entity
@Table(name = "productos")
public class Product {

    @Id
    @Size(max = 20)
    @NotBlank
    @Column(name = "codigo_producto", length = 20, nullable = false, unique = true)
    private String codigoProducto;

    @Size(max = 50)
    @NotBlank
    @Column(name = "nombre_producto", length = 50, nullable = false)
    private String nombreProducto;

    @NotNull
    @Min(0)
    @Column(name = "stock", nullable = false)
    private Integer stock;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer = 10, fraction = 2)
    @Column(name = "precio_unitario", nullable = false, precision = 12, scale = 2)
    private BigDecimal precioUnitario;

    @Size(max = 50)
    @Column(name = "categoria", length = 50)
    private String categoria;

    @Size(max = 50)
    @Column(name = "subcategoria", length = 50)
    private String subcategoria;

    @Size(max = 50)
    @Column(name = "proveedor", length = 50)
    private String proveedor;

    public @Size(max = 20) @NotBlank String getCodigoProducto() {
        return codigoProducto;
    }

    public void setCodigoProducto(@Size(max = 20) @NotBlank String codigoProducto) {
        this.codigoProducto = codigoProducto;
    }

    public @Size(max = 50) @NotBlank String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(@Size(max = 50) @NotBlank String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public @NotNull @Min(0) Integer getStock() {
        return stock;
    }

    public void setStock(@NotNull @Min(0) Integer stock) {
        this.stock = stock;
    }

    public @NotNull @DecimalMin(value = "0.0", inclusive = false) @Digits(integer = 10, fraction = 2) BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(@NotNull @DecimalMin(value = "0.0", inclusive = false) @Digits(integer = 10, fraction = 2) BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public @Size(max = 50) String getCategoria() {
        return categoria;
    }

    public void setCategoria(@Size(max = 50) String categoria) {
        this.categoria = categoria;
    }

    public @Size(max = 50) String getSubcategoria() {
        return subcategoria;
    }

    public void setSubcategoria(@Size(max = 50) String subcategoria) {
        this.subcategoria = subcategoria;
    }

    public @Size(max = 50) String getProveedor() {
        return proveedor;
    }

    public void setProveedor(@Size(max = 50) String proveedor) {
        this.proveedor = proveedor;
    }
}
