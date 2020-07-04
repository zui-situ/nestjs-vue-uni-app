import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@libs/db';
import { JwtModule } from '@nestjs/jwt'


@Global()//标记为全局模块
@Module({
  imports: [
    //设置配置项
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.registerAsync({//生成token的模块
      useFactory(){
        return {
          secret:process.env.SECRET
        }
      }
    }),
    DbModule,
  ],
  providers: [CommonService],
  exports: [CommonService,JwtModule],
})
export class CommonModule {}
