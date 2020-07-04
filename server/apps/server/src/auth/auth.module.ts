import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy';
import { jwtStrategy } from './jwt.strategy';


@Module({
  imports:[
    PassportModule,
  ],
  controllers: [AuthController],
  providers:[LocalStrategy,jwtStrategy]
})
export class AuthModule {}
