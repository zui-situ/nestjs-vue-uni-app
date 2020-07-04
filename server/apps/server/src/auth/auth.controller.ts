import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current.user.decorator';


@Controller('auth')
@ApiTags('用户')
export class AuthController {
    //注入模型
    constructor(
        private JwtService: JwtService,
        @InjectModel(User) private usermodel:ReturnModelType<typeof User>
    ){}

    @Post('register')
    @ApiOperation({summary: '注册'})
    async register(@Body() dto: RegisterDto){
        const { username, password } = dto; 
        const user = await this.usermodel.create({
            username,
            password
        })
        return user
    }

    @Post('login')
    @ApiOperation({summary: '登录'})
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument){
        console.log(user);
        return {
            token: this.JwtService.sign(String(user._id))
        }
    }

    @Get('user')
    @ApiOperation({summary: '获取个人信息'})
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async user(@CurrentUser() user: UserDocument){
        return user;
    }
}
