import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';


@Module({
  imports: [AuthModule],
  providers: [UserService],
  controllers: [UserController],

})
export class AppModule { }
