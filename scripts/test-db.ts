import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testDatabaseConnection() {
  try {
    // 1. Probar la conexión
    console.log('1. Probando conexión a la base de datos...');
    await prisma.$connect();
    console.log('✅ Conexión exitosa a la base de datos');

    // 2. Crear un usuario de prueba
    console.log('\n2. Creando usuario de prueba...');
    const testUser = {
      email: 'test@example.com',
      username: 'testuser',
      password: await bcrypt.hash('password123', 10),
      name: 'Usuario de Prueba'
    };

    const user = await prisma.user.create({
      data: testUser
    });
    console.log('✅ Usuario creado exitosamente:', user);

    // 3. Buscar el usuario creado
    console.log('\n3. Buscando usuario creado...');
    const foundUser = await prisma.user.findUnique({
      where: { email: testUser.email }
    });
    console.log('✅ Usuario encontrado:', foundUser);

    // 4. Eliminar el usuario de prueba
    console.log('\n4. Eliminando usuario de prueba...');
    await prisma.user.delete({
      where: { id: user.id }
    });
    console.log('✅ Usuario eliminado exitosamente');

  } catch (error) {
    console.error('❌ Error durante las pruebas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar las pruebas
testDatabaseConnection()
  .then(() => console.log('\n✅ Pruebas completadas'))
  .catch(console.error); 