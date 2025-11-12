import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {
  // Thêm các trường khác tuỳ ý ở đây
}
