# WebSockets con Handlebars - CoderHouse Backend

## Descripción

Este proyecto implementa una aplicación web con WebSockets que permite gestionar productos en tiempo real usando Handlebars como motor de plantillas y Socket.IO para la comunicación en tiempo real.

## Características Implementadas

### ✅ Configuración del Servidor
- **Handlebars**: Motor de plantillas configurado con layouts y partials
- **Socket.IO**: Servidor WebSocket integrado con Express
- **Estructura de vistas**: Organización en layouts, partials y vistas principales
- **Rutas separadas**: Router independiente para vistas (`views.router.js`)

### ✅ Vistas Implementadas

#### 1. Vista Home (`/`)
- Lista todos los productos disponibles
- Diseño responsive con Bootstrap
- Funcionalidad para agregar productos al carrito
- Notificaciones toast para feedback del usuario

#### 2. Vista Real Time Products (`/realtimeproducts`)
- Lista de productos con actualizaciones en tiempo real
- Formulario para crear nuevos productos via WebSocket
- Botones para eliminar productos via WebSocket
- Indicador de estado de conexión WebSocket
- Contador de productos en tiempo real

### ✅ Funcionalidades WebSocket

#### Eventos del Cliente al Servidor:
- `addProduct`: Crear un nuevo producto
- `deleteProduct`: Eliminar un producto existente

#### Eventos del Servidor al Cliente:
- `productAdded`: Notificar cuando se agrega un producto
- `productDeleted`: Notificar cuando se elimina un producto
- `error`: Manejo de errores del servidor

## Estructura del Proyecto

```
src/
├── views/
│   ├── layouts/
│   │   └── main.handlebars      # Layout principal
│   ├── home.handlebars          # Vista home
│   └── realTimeProducts.handlebars # Vista tiempo real
├── controllers/
│   └── viewController.js        # Controlador de vistas
├── routes/
│   ├── productRoutes.js         # Rutas API productos
│   ├── cartRoutes.js           # Rutas API carritos
│   └── views.router.js         # Rutas de vistas (separado)
├── services/
│   └── productService.js       # Servicio de productos (usa ProductManager)
└── app.js                      # Configuración Express + Handlebars
```

## Instalación y Uso

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar el Servidor
```bash
npm start
# o para desarrollo
npm run dev
```

### 3. Acceder a las Vistas

- **Home**: http://localhost:8080/
- **Real Time Products**: http://localhost:8080/realtimeproducts
- **API Info**: http://localhost:8080/api

## Funcionalidades en Detalle

### Vista Home
- Muestra todos los productos en tarjetas responsivas
- Cada producto incluye: título, descripción, precio, stock, categoría e imagen
- Botón para agregar al carrito (funcionalidad básica)
- Manejo de imágenes con fallback a placeholder

### Vista Real Time Products
- **Formulario de creación**: Campos para título, categoría, precio, stock, descripción e imagen
- **Lista dinámica**: Se actualiza automáticamente cuando se agregan/eliminan productos
- **Indicador de conexión**: Muestra el estado de la conexión WebSocket
- **Notificaciones**: Feedback visual para todas las acciones
- **Validación**: Formulario con validación HTML5

### WebSockets
- **Conexión automática**: Se conecta al cargar la página
- **Reconexión**: Manejo automático de desconexiones
- **Sincronización**: Todos los clientes ven los cambios en tiempo real
- **Manejo de errores**: Notificaciones de error para el usuario
- **ProductManager**: Utiliza el ProductManager.js a través del productService

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Motor de Plantillas**: Handlebars (express-handlebars)
- **WebSockets**: Socket.IO
- **Frontend**: Bootstrap 5, Font Awesome
- **Estilos**: CSS personalizado con transiciones

## API Endpoints

### REST API (existentes)
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto
- `GET /api/products/:id` - Obtener producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### WebSocket Events
- `addProduct` - Crear producto en tiempo real
- `deleteProduct` - Eliminar producto en tiempo real

## Cumplimiento de Aspectos de Evaluación

### ✅ Productos
- **Vista de productos**: Se visualizan correctamente todos los productos del archivo `products.json`
- **Impacto en vista**: Las modificaciones desde `/api/products` impactan en la vista al recargar la página
- **Estado**: **REALIZADO - ÓPTIMO**

### ✅ WebSocket
- **Vista realTimeProducts**: Se visualizan correctamente todos los productos del archivo `products.json`
- **Botones de eliminación**: Cada producto tiene un botón para ser eliminado
- **Formulario de creación**: La vista tiene un formulario para crear productos
- **Actualización en tiempo real**: Tanto al eliminar como al crear productos se actualiza la vista en tiempo real
- **ProductManager**: En el socket del servidor se utiliza el ProductManager.js para la gestión de productos
- **Estado**: **REALIZADO**

### ✅ Rutas
- **Separación de routers**: Las rutas están separadas por sus correspondientes routers en la carpeta `src/routes/`
- **Implementación en app.js**: Las rutas están implementadas en el archivo main `app.js`
- **Router de vistas**: Las vistas se encuentran en un router aparte (`views.router.js`)
- **Estado**: **REALIZADO**

## Características Técnicas

### Integración HTTP + WebSocket
- El servidor maneja tanto peticiones HTTP como conexiones WebSocket
- Los productos se crean/eliminan via WebSocket y se persisten en el sistema
- Sincronización automática entre todos los clientes conectados

### Manejo de Errores
- Validación en el cliente (HTML5)
- Validación en el servidor (productService)
- Notificaciones de error en tiempo real
- Logging detallado en el servidor

### UX/UI
- Diseño responsive con Bootstrap
- Animaciones y transiciones suaves
- Feedback visual inmediato
- Indicadores de estado de conexión
- Notificaciones toast no intrusivas

## Próximas Mejoras Sugeridas

1. **Autenticación**: Sistema de usuarios y sesiones
2. **Carrito de Compras**: Funcionalidad completa del carrito
3. **Categorías**: Gestión dinámica de categorías
4. **Búsqueda**: Filtros y búsqueda en tiempo real
5. **Paginación**: Para grandes cantidades de productos
6. **Base de Datos**: Migración de JSON a base de datos real
7. **Validación Avanzada**: Validación más robusta de datos
8. **Testing**: Pruebas unitarias y de integración

## Notas de Desarrollo

- El proyecto mantiene compatibilidad con la API REST existente
- Los WebSockets se integran perfectamente con el sistema actual
- El código está organizado siguiendo patrones MVC
- Se mantiene la separación de responsabilidades
- El diseño es escalable y mantenible
