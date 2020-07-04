import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';

//把所有模型引用进来再导出去
const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode
])

//标记为全局引用模块
@Global()

@Module({
  imports:[
    //ConfigModule加载完成后才允许，避免找不到配置项报错
    TypegooseModule.forRootAsync({
      useFactory(){
        return {
          uri:process.env.DB,
          useNewUrlParser:true,
          useUnifiedTopology:true,
          useCreateIndex:true,
          useFindAndModify:false
        }
      }
    }),
    //连接数据库
    // TypegooseModule.forRoot(process.env.DB,{
    //     useNewUrlParser:true,
    //     useUnifiedTopology:true,
    //     useCreateIndex:true,
    //     useFindAndModify:false
    // }),
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule {}
