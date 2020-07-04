import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

//Crud是模块的增删改查
@Crud({
    model:User
})

@Controller('users')
@ApiTags('用户')
export class UsersController {
    //注入模型
    constructor(@InjectModel(User) private readonly model){}
    //添加路由
    @Get('option')
    option(){
        return {
            title:'课时管理',
            column:[
                {prop:'username',label:'用户名'},
            ]
        }
    }
}
