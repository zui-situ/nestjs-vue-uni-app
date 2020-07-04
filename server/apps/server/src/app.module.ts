import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db/db.module';
import { CommonModule } from '@app/common';
import { MulterModule } from '@nestjs/platform-express';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    CoursesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
