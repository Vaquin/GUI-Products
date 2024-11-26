import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

const Search: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string>("");

  const buscarProducto = async () => {
    setError("");
    setProductos([]);
    try {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .ilike("nombre", `%${nombre}%`);
      if (error) throw error;
      if (data && data.length > 0) {
        setProductos(data);
      } else {
        setError("Producto no encontrado.");
      }
    } catch (err: any) {
      setError("Ocurrió un error al buscar el producto.");
    }
  };

  return (
    <div>
      <h2 style={{ color: "#FFFFFF", textAlign: "start" }}>Buscar Producto</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa el nombre del producto"
          style={{
            flex: "1",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            color: "#FFFFFF",
          }}
        />
        <button
          onClick={buscarProducto}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {productos.length > 0 &&
          productos.map((producto) => (
            <div
              key={producto.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                width: "calc(33.333% - 1rem)",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  backgroundColor: "#f0f0f0",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ color: "#aaa" }}>Espacio para Imagen</p>
              </div>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#000" }}>
                {producto.nombre}
              </h3>
              <p style={{ margin: "0 0 0.5rem 0", color: "#000" }}>
                <strong>Precio:</strong> ${producto.precio}
              </p>
              <p style={{ margin: 0, color: "#000" }}>
                <strong>Stock:</strong> {producto.stock}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
