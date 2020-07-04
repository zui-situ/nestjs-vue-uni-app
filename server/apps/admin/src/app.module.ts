import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodeController } from './episode/episode.controller';
import { EpisodeModule } from './episode/episode.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    //异步加载配置
    MulterModule.registerAsync({
      useFactory(){
        return{
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId:  process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret:  process.env.OSS_ACCESS_KEY_SECRET,
              bucket:  process.env.OSS_BUCKET
            }
          })
        }
      }
    }),
    // MulterModule.register({
    //   // dest:'uploads'
    //   storage: MAO({
    //     config: {
    //       region: 'oss-cn-shenzhen',
    //       accessKeyId: 'LTAI4G1kR3ufCMsVZRvh6UAn',
    //       accessKeySecret: 'agFLjnDyb3fyhT4hDwPWT350GNZVeA',
    //       bucket: 'nestjs-test'
    //     }
    //   })
    // }),//创建上传文件的本地路径
    UsersModule,
    CoursesModule,
    EpisodeModule
  ],
  controllers: [AppController, EpisodeController],
  providers: [AppService],
})
export class AppModule {}
