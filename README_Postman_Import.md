# 🚀 Guía de Importación para Postman - CoderHouse API

## 📋 Archivos Incluidos

Este proyecto incluye los siguientes archivos para configurar Postman:

1. **`CoderHouse_API_Collection.json`** - Colección principal con todas las rutas
2. **`CoderHouse_API_Environment.json`** - Variables de entorno
3. **`API_Documentation_Postman.txt`** - Documentación completa de las APIs

## 🔧 Pasos para Importar en Postman

### Paso 1: Importar la Colección

1. Abre **Postman**
2. Haz clic en **"Import"** (botón en la esquina superior izquierda)
3. Selecciona la pestaña **"File"**
4. Haz clic en **"Upload Files"**
5. Selecciona el archivo `CoderHouse_API_Collection.json`
6. Haz clic en **"Import"**

### Paso 2: Importar las Variables de Entorno

1. En Postman, ve a **"Environments"** (en el panel izquierdo)
2. Haz clic en **"Import"**
3. Selecciona el archivo `CoderHouse_API_Environment.json`
4. Haz clic en **"Import"**

### Paso 3: Configurar el Entorno

1. En la esquina superior derecha de Postman, verás un selector de entorno
2. Selecciona **"CoderHouse API - Local"** del dropdown
3. Verifica que las variables estén cargadas correctamente

## 📁 Estructura de la Colección

La colección está organizada en las siguientes carpetas:

### 🏠 Ruta de Prueba
- **GET /** - Verificar que la API esté funcionando

### 📦 Productos
- **GET /api/products** - Listar todos los productos
- **GET /api/products/:pid** - Obtener producto por ID
- **POST /api/products** - Crear nuevo producto
- **PUT /api/products/:pid** - Actualizar producto
- **DELETE /api/products/:pid** - Eliminar producto
- **GET /api/products/category/:category** - Filtrar por categoría
- **GET /api/products/price-range** - Filtrar por rango de precio

### 🛒 Carritos
- **GET /api/carts** - Listar todos los carritos
- **POST /api/carts** - Crear nuevo carrito
- **GET /api/carts/:cid** - Obtener carrito por ID
- **POST /api/carts/:cid/product/:pid** - Agregar producto al carrito
- **PUT /api/carts/:cid/product/:pid** - Actualizar cantidad
- **DELETE /api/carts/:cid/product/:pid** - Eliminar producto del carrito
- **DELETE /api/carts/:cid** - Vaciar carrito

## 🔧 Variables de Entorno Configuradas

| Variable | Valor por Defecto | Descripción |
|----------|-------------------|-------------|
| `baseUrl` | `http://localhost:8080` | URL base de la API |
| `productId` | `1` | ID de producto para pruebas |
| `cartId` | `1` | ID de carrito para pruebas |
| `category` | `Electrónicos` | Categoría para filtros |
| `minPrice` | `50` | Precio mínimo para filtros |
| `maxPrice` | `200` | Precio máximo para filtros |
| `quantity` | `2` | Cantidad para productos en carrito |

## 🚀 Cómo Usar la Colección

### 1. Verificar la API
1. Selecciona **"Ruta de Prueba"**
2. Haz clic en **"Send"**
3. Deberías recibir una respuesta confirmando que la API funciona

### 2. Crear un Producto
1. Ve a **"Productos" > "Crear nuevo producto"**
2. El body ya está preconfigurado con un ejemplo
3. Modifica los datos según necesites
4. Haz clic en **"Send"**

### 3. Crear un Carrito
1. Ve a **"Carritos" > "Crear nuevo carrito"**
2. Haz clic en **"Send"**
3. Guarda el ID del carrito creado

### 4. Agregar Producto al Carrito
1. Ve a **"Carritos" > "Agregar producto al carrito"**
2. Modifica el `cartId` y `productId` en la URL si es necesario
3. Ajusta la cantidad en el body
4. Haz clic en **"Send"**

## 🔄 Flujo de Pruebas Recomendado

### Secuencia Básica:
1. **Verificar API** - Asegúrate de que el servidor esté funcionando
2. **Crear Producto** - Crea al menos un producto para trabajar
3. **Listar Productos** - Verifica que el producto se creó correctamente
4. **Crear Carrito** - Crea un nuevo carrito
5. **Agregar Producto** - Añade el producto al carrito
6. **Ver Carrito** - Verifica que el producto esté en el carrito
7. **Actualizar Cantidad** - Modifica la cantidad del producto
8. **Eliminar Producto** - Quita el producto del carrito

### Pruebas Avanzadas:
- **Filtros por Categoría** - Prueba diferentes categorías
- **Filtros por Precio** - Ajusta los rangos de precio
- **Actualizar Producto** - Modifica datos de productos existentes
- **Vaciar Carrito** - Prueba la funcionalidad de limpiar carrito

## ⚙️ Personalización

### Cambiar URL Base
Si tu API corre en un puerto diferente:
1. Ve a **"Environments"**
2. Selecciona **"CoderHouse API - Local"**
3. Cambia el valor de `baseUrl` a tu URL

### Modificar Variables
Puedes cambiar cualquier variable de entorno:
- `productId` - Para trabajar con productos específicos
- `cartId` - Para trabajar con carritos específicos
- `category` - Para probar diferentes categorías
- `quantity` - Para diferentes cantidades

## 🐛 Solución de Problemas

### Error 404 - Not Found
- Verifica que el servidor esté corriendo en `http://localhost:8080`
- Asegúrate de que la variable `baseUrl` esté configurada correctamente

### Error 400 - Bad Request
- Revisa que el body JSON esté bien formateado
- Verifica que todos los campos requeridos estén presentes

### Error 500 - Internal Server Error
- Revisa los logs del servidor
- Verifica que los archivos de datos (`data/products.json`, `data/carts.json`) existan

## 📝 Notas Importantes

- **IDs**: Todos los IDs son strings en este proyecto
- **Precios**: Deben ser números positivos
- **Stock**: Debe ser un número entero positivo
- **Cantidades**: Deben ser números enteros positivos
- **Categorías**: Son case-sensitive (ej: "Electrónicos" ≠ "electrónicos")

## 🔗 Recursos Adicionales

- **Documentación Completa**: Revisa `API_Documentation_Postman.txt` para detalles técnicos
- **Código Fuente**: Explora los archivos del proyecto para entender la implementación
- **Logs del Servidor**: Revisa la consola donde corre tu servidor para debugging

---

¡Listo! Ya tienes tu colección de Postman completamente configurada para probar todas las funcionalidades de tu API de CoderHouse. 🎉

