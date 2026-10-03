import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Types} from 'mongoose';

import { User } from './auth.schema.js';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(data: User) : Promise<User> {
    return this.userModel.create(data);
  }
  async update(id: string, data: Partial<User>){
    return this.userModel.findOneAndUpdate({ _id: id }, data , { new: true });
   }
  async delete(id: string) {
    return this.userModel.findOneAndDelete({_id:id})
  } 
  async getUserById(id: string) {
    return this.userModel.findById(id)
  }
  async getUserByName(name: string) {
    return this.userModel.findOne({name})
  }
  async getUserByEmail(email : string) {
    return this.userModel.findOne({email})
  }
}