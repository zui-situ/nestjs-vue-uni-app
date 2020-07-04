import { prop,modelOptions, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';

//为模型添加创建时间createdAt和更新时间updatedAt
@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class Episode {
    @prop()
    name: string
    
    @prop()
    file: string

    //关联Course
    @prop({ ref:'Course' })
    course: Ref<Course>
}