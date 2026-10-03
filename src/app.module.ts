import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AuthModule } from './auth/auth.module.js';
import { MongooseModule } from '@nestjs/mongoose';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/myapp'),
    AuthModule
  ],
  
})


export class AppModule {}
