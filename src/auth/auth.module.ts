import { Controller , Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './auth.schema.js';
import { UsersRepository } from './auth.repository.js';
import { UserService } from './auth.service.js';
import { UserContoller } from './auth.contoller.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserContoller],
  providers: [UsersRepository, UserService],
})
export class AuthModule {}