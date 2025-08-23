const fs = require('fs').promises;
const path = require('path');

async function setupProject() {
    console.log('🚀 Configurando proyecto de API de Productos y Carritos...\n');

    try {
        // Crear directorio data si no existe
        const dataDir = path.join(__dirname, 'data');
        try {
            await fs.access(dataDir);
            console.log('✅ Directorio data ya existe');
        } catch {
            await fs.mkdir(dataDir, { recursive: true });
            console.log('✅ Directorio data creado');
        }

        // Crear archivo products.json con datos de ejemplo
        const productsPath = path.join(dataDir, 'products.json');
        const sampleProducts = [
            {
                "id": 1,
                "title": "iPhone 15 Pro",
                "description": "El iPhone más avanzado con chip A17 Pro",
                "code": "IPHONE15PRO",
                "price": 1199.99,
                "status": true,
                "stock": 25,
                "category": "Smartphones",
                "thumbnails": ["iphone15pro_1.jpg", "iphone15pro_2.jpg"]
            },
            {
                "id": 2,
                "title": "MacBook Air M2",
                "description": "Laptop ultraligera con chip M2",
                "code": "MACBOOKAIRM2",
                "price": 1299.99,
                "status": true,
                "stock": 15,
                "category": "Laptops",
                "thumbnails": ["macbook_air_m2.jpg"]
            },
            {
                "id": 3,
                "title": "AirPods Pro",
                "description": "Auriculares inalámbricos con cancelación de ruido",
                "code": "AIRPODSPRO",
                "price": 249.99,
                "status": true,
                "stock": 50,
                "category": "Audio",
                "thumbnails": ["airpods_pro.jpg"]
            }
        ];

        await fs.writeFile(productsPath, JSON.stringify(sampleProducts, null, 2));
        console.log('✅ Archivo products.json creado con datos de ejemplo');

        // Crear archivo carts.json vacío
        const cartsPath = path.join(dataDir, 'carts.json');
        await fs.writeFile(cartsPath, JSON.stringify([], null, 2));
        console.log('✅ Archivo carts.json creado');

        console.log('\n🎉 ¡Configuración completada exitosamente!');
        console.log('\n📋 Próximos pasos:');
        console.log('1. Ejecuta: npm install');
        console.log('2. Ejecuta: npm run dev');
        console.log('3. El servidor estará disponible en: http://localhost:8080');
        console.log('4. Consulta el README.md para ejemplos de uso');
        console.log('\n🔗 Endpoints disponibles:');
        console.log('- Productos: http://localhost:8080/api/products');
        console.log('- Carritos: http://localhost:8080/api/carts');

    } catch (error) {
        console.error('❌ Error durante la configuración:', error.message);
        process.exit(1);
    }
}

// Ejecutar setup si se llama directamente
if (require.main === module) {
    setupProject();
}

module.exports = setupProject;
