import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';

import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/validationSchemas/validation.pipe';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('signup')
    async signupUser(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,

    ): Promise<Omit<UserModel, 'password'>> {
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<Omit<UserModel, 'password'> | null> {
        return this.userService.user({ id });

    }

}
