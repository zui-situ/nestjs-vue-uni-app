import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';


@Crud({
    model: Course,
    routes:{        //关闭或开启对应的接口
        create:false,
        update:false,
        delete:false
    }
})

@Controller('courses')
@ApiTags('课程')
export class CoursesController {
    constructor(@InjectModel(Course) private model){}
}
