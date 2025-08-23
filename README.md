# API de Productos y Carritos de Compra

## Descripción

Esta es una API REST desarrollada con Node.js y Express para gestionar productos y carritos de compra. La aplicación utiliza persistencia en archivos JSON y está diseñada como parte del curso de Desarrollo Avanzado de Backend de CoderHouse.

## Características

- ✅ Gestión completa de productos (CRUD)
- ✅ Gestión de carritos de compra
- ✅ Persistencia en archivos JSON
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ CORS habilitado
- ✅ Respuestas JSON estructuradas
- ✅ Arquitectura MVC (Model-View-Controller)
- ✅ Separación de responsabilidades
- ✅ Código modular y escalable

## Estructura del Proyecto

```
├── index.js              # Inicia el servidor (app.listen)
├── package.json          # Dependencias del proyecto
├── README.md            # Documentación
├── setup.js             # Script de configuración inicial
├── .gitignore           # Archivos a ignorar en Git
├── src/                 # Código fuente principal
│   ├── app.js           # Configura Express y middlewares
│   ├── config/          # Archivos de configuración
│   │   ├── config.js    # Configuración general
│   │   └── env.js       # Variables de entorno
│   ├── controllers/     # Controladores (manejan requests/responses)
│   │   ├── productController.js # Llama a los servicios y responde a la API
│   │   └── cartController.js    # Llama a los servicios y responde a la API
│   ├── services/        # Servicios (contienen la lógica de negocio)
│   │   ├── productService.js # Contiene la lógica como Product.getAll()
│   │   └── cartService.js    # Contiene la lógica como Cart.getAll()
│   ├── models/          # Modelos (definen estructuras de datos)
│   │   ├── Product.js   # Define el modelo de Producto
│   │   └── Cart.js      # Define el modelo de Carrito
│   ├── routes/          # Rutas (definen endpoints)
│   │   ├── productRoutes.js # Define las rutas /products, etc.
│   │   └── cartRoutes.js    # Define las rutas /carts, etc.
│   └── db/              # Base de datos
│       └── index.js     # Configura y conecta con la DB (archivos JSON)
└── data/                # Archivos de persistencia (se crea automáticamente)
    ├── products.json    # Datos de productos
    └── carts.json       # Datos de carritos
```

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd coderhouse-backend-api
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor:**
   ```bash
   # Modo desarrollo (con nodemon)
   npm run dev
   
   # Modo producción
   npm start
   ```

El servidor estará disponible en `http://localhost:8080`

## Endpoints de la API

### Productos (`/api/products`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Listar todos los productos |
| GET | `/api/products` | Listar todos los productos |
| GET | `/api/products/:pid` | Obtener producto por ID |
| GET | `/api/products/category/:category` | Obtener productos por categoría |
| GET | `/api/products/price-range?min=X&max=Y` | Obtener productos por rango de precio |
| POST | `/api/products` | Crear nuevo producto |
| PUT | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto |

### Carritos (`/api/carts`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/carts` | Listar todos los carritos |
| POST | `/api/carts` | Crear nuevo carrito |
| GET | `/api/carts/:cid` | Obtener carrito por ID |
| POST | `/api/carts/:cid/product/:pid` | Agregar producto al carrito |
| PUT | `/api/carts/:cid/product/:pid` | Actualizar cantidad de producto |
| DELETE | `/api/carts/:cid/product/:pid` | Eliminar producto del carrito |
| DELETE | `/api/carts/:cid` | Vaciar carrito |


## Respuestas de la API

### Respuesta exitosa
```json
{
  "status": "success",
  "data": {...},
  "message": "Operación realizada exitosamente"
}
```

### Respuesta de error
```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

## Códigos de Estado HTTP

- `200` - Operación exitosa
- `201` - Recurso creado exitosamente
- `400` - Error en los datos enviados
- `404` - Recurso no encontrado
- `500` - Error interno del servidor

## Arquitectura del Proyecto

Este proyecto sigue el patrón **MVC (Model-View-Controller)** con separación clara de responsabilidades:

- **Models**: Definen las estructuras de datos y validaciones
- **Services**: Contienen la lógica de negocio y operaciones con la base de datos
- **Controllers**: Manejan las peticiones HTTP y respuestas de la API
- **Routes**: Definen los endpoints y conectan con los controladores
- **Database**: Gestiona la persistencia de datos (archivos JSON)

## Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **File System (fs)** - Persistencia en archivos JSON
- **dotenv** - Gestión de variables de entorno

## Testing

Puedes probar la API usando:
- **Postman**
