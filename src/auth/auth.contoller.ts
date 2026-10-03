import { Body, Controller, Injectable, Post} from '@nestjs/common';
import { UserService } from './auth.service.js';
import {CreateUserPipe} from "./pipes/zod-validation.pipe.js"
import * as authValidation from "./auth.validation.js"

@Injectable()

@Controller('/api/auth')
export class UserContoller {
    constructor(private readonly userService : UserService ) {}
    @Post('register')
    async createUser(@Body(new CreateUserPipe()) body: authValidation.CreateUserInput) {
        return this.userService.createUser(body.name , body.email , body.password)
    }
}