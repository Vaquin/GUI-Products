require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const buscarProducto = async (nombre) => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('nombre', `%${nombre}%`);

  if (error) throw error;
  return data;
};

const main = () => {
  rl.question('Ingresa el nombre del producto que deseas buscar:', async (nombre) => {
    try {
      const productos = await buscarProducto(nombre);

      if (productos.length > 0) {
        console.log('✅ Productos encontrados:');
        productos.forEach((producto, index) => {
          console.log(`${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Stock: ${producto.stock}`);
        });
      } else {
        console.log('❌ Producto no encontrado. Intenta con otro nombre.');
      }
    } catch (error) {
      console.error('⚠️ Error al buscar el producto:', error.message);
    }

    rl.question('¿Deseas buscar otro producto? (s/n): ', (respuesta) => {
      if (respuesta.toLowerCase() === 's') {
        main();
      } else {
        console.log('👋 ¡Hasta luego!');
        rl.close();
      }
    });
  });
};

main();
