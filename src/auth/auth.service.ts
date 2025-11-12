import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareHashPassword } from 'src/helpers/utils';
import { UsersService } from 'src/modules/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await compareHashPassword(
      pass,
      user?.password ?? '',
    );
    if (!user || !isValidPassword) return null;
    return user;
  }

  login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async handleRegister(registerDto: CreateAuthDto) {
    return await this.usersService.handleRegister(registerDto);
  }
}
