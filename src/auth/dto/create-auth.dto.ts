import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'email sai định dạng' })
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;
  @IsNotEmpty({ message: 'password không được để trống' })
  password: string;
  name: string;
}
