import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //允许跨域
  app.enableCors();
  //静态文件托管
  app.useStaticAssets('uploads',{
    prefix:'/uploads'//添加前缀
  });
  const options = new DocumentBuilder()
    .setTitle('全栈之巅后台管理API')
    .setDescription('提供后台管理界面调用的服务器API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT || 3002;
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
