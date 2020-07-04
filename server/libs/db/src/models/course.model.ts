import { prop,arrayProp,modelOptions,Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from './episode.model';


@modelOptions({
    schemaOptions:{
        timestamps:true,//为模型添加创建时间createdAt和更新时间updatedAt
        toJSON: { virtuals: true },   //查询虚拟字段
    }
})
export class Course {
    //@prop()标记属性,明确告知系统这个是数据库字段
    @ApiProperty({ description:'课程名称' })
    @prop()
    name: string

    @ApiProperty({ description:'封面图' })
    @prop()
    cover: string

    @arrayProp({
        ref:'Episode',
        localField: '_id',     //使用本地键_id关联episode
        foreignField: 'course'
    })
    episodes: Ref<Episode>[]
}