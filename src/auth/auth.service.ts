import { Injectable  , NotFoundException , InternalServerErrorException , UnauthorizedException,  ConflictException} from '@nestjs/common';
import {UsersRepository} from "./auth.repository.js"
import { User } from './auth.schema.js';

@Injectable()
export class UserService {
    constructor(private readonly userRepository : UsersRepository )  {}
    async createUser(name : string , email : string , password : string) : Promise<User>  {
        let checkEmail = await this.userRepository.getUserByEmail(email)
        if (checkEmail) {
            throw new ConflictException("This email is already use , go to login")
        }
        let newUser = await this.userRepository.create({name,email,password})
        if (!newUser) {
            throw new InternalServerErrorException("Faild to create a new user")
        }
        return newUser
    }
    async login(email : string , password : string) {
        let checkEmail = await this.userRepository.getUserByEmail(email)
        if (!checkEmail) {
            throw new NotFoundException("This email not found")
        }
        let isMatch = checkEmail.password == password
        if (!isMatch) {
            throw new UnauthorizedException("Email or Password is wrong")
        }
        return "You is a real user"
    }
    async updateUser(id : string,data : Partial<User>) {
        let updateUser = await this.userRepository.update(id , data);
        if (!updateUser) {
            throw new InternalServerErrorException("Faild to update user")
        }
    }
    async deleteUser(id : string) {
        let deleteUser = await this.userRepository.delete(id)
        if (!deleteUser) {
            throw new InternalServerErrorException("Faild to delete user")
        }
    }
    async getUser(id: string) : Promise<User> {
        let user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new NotFoundException("User Not Found")
        }
        return user
    }
}