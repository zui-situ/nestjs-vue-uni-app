import { prop,modelOptions, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';
import { User } from './user.model';
import { Episode } from './episode.model';

//为模型添加创建时间createdAt和更新时间updatedAt
@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class Action {
    @prop({ ref:'User' })
    user: Ref<User>

    @prop({ enum: ['Course', 'Episode'] })
    type: string;

    @prop({ refPath:'type' })
    object: Ref<Course|Episode>;

    @prop({ enum: ['like','upVote'] })
    name: string;
}