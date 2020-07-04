import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Episode } from '@libs/db/models/episode.model';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';

@Crud({
    model:Episode
})

@Controller('episodes')
@ApiTags('课时')
export class EpisodeController {
    //注入模型
    constructor(
        @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
        @InjectModel(Course) private readonly courseModel: ReturnModelType<typeof Course>
    ){}


    //添加路由
    @Get('option')
    async option(){
        const courses = (await this.courseModel.find()).map(v=>({
            label:v.name,
            value:v._id
        }))
        return {
            title:'课时管理',
            translate:false,//标记上则不返回待$符号的参数
            column:[
                { prop: "course", label: '所属课程', type:'select',dicData:courses, row:true },
                { prop:'name', label:'课时名称', search:true, row:true },
                { prop:'file', label:'视频文件', type:'upload', row:true, action:'/upload', listType:'picture-img' },
            ]
        }
    }
}
