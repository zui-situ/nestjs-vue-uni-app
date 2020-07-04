import { prop, modelOptions, DocumentType, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Course } from './course.model';

export type UserDocument = DocumentType<User>

//为模型添加创建时间createdAt和更新时间updatedAt
@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class User {
    //@prop()标记属性
    @ApiProperty({ description:'用户名',example:'user1' })
    @prop()
    username:string

    @ApiProperty({ description:'密码',example:'pass1' })
    @prop({
        select: false,  //表示常规请求不展示这个值
        get(val){
            return val
        },
        set(val){//表示返回改造后的新值保存到数据库
            return val ? hashSync(val) :val
        }
    })
    password:string

    @arrayProp({ ref:'Course' })
    likes:Ref<Course>[]

}