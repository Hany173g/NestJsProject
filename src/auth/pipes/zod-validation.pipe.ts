import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { createUserSchema } from '../auth.validation.js'

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const result = createUserSchema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(
        result.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
        })),
    );
    }

    return result.data;
  }
}