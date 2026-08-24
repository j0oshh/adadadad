import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 1. Importa las herramientas de Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Configura los datos básicos de tu documentación
  const config = new DocumentBuilder()
    .setTitle('API de Roles y Autenticación')
    .setDescription('Documentación de los endpoints del proyecto')
    .setVersion('1.0')
    .addBearerAuth() // Añade esto si usas JWT para bloquear endpoints
    .build();

  // 3. Crea el documento oficial
  const document = SwaggerModule.createDocument(app, config);

  // 4. Define la ruta web para ver el Swagger (en este caso: /docs)
  SwaggerModule.setup('docs', app, document);

  // Tu servidor arranca aquí
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
