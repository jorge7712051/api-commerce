import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.usuario.create({
    data: {
      nombre: 'Admin',
      correoElectronico: 'admin@crm.com',
      contrasena: await bcrypt.hash('admin123', 10),
      rol: 'ADMIN',
    },
  });

  await prisma.usuario.create({
    data: {
      nombre: 'Auxiliar',
      correoElectronico: 'auxiliar@crm.com',
      contrasena: await bcrypt.hash('aux123', 10),
      rol: 'AUXILIAR',
    },
  });

  for (let i = 1; i <= 5; i++) {
    const comerciante = await prisma.comerciante.create({
      data: {
        nombre: `Comerciante ${i}`,
        municipio: `Municipio ${i}`,
        estado: 'ACTIVO',
        usuarioActualizacionId: admin.id,
      },
    });

    for (let j = 1; j <= 2; j++) {
      await prisma.establecimiento.create({
        data: {
          nombre: `Establecimiento ${i}-${j}`,
          ingresos: 1000.5 + i * j,
          numeroEmpleados: 5 + j,
          comercianteId: comerciante.id,
          usuarioActualizacionId: admin.id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
