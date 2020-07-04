import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';

//Crud是模块的增删改查
@Crud({
    model:Course
})

@Controller('courses')
@ApiTags('课程')
export class CoursesController {
    //注入模型
    constructor(@InjectModel(Course) private readonly model:ReturnModelType<typeof Course>){}


    //添加路由
    @Get('option')
    option(){
        return {
            title:'课程管理',
            column:[
                { prop:'name',label:'课程名称', sortable:true, search:true , regex:true, row:true },
                {   prop:'cover',
                    label:'课程封面图', 
                    type:'upload', 
                    listType: 'picture-img',
                    action: '/upload'
                }
            ]
        }
    }


}
