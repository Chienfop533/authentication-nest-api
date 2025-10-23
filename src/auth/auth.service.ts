import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await compareHashPassword(
      pass,
      user?.password ?? '',
    );
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user?._id, username: user?.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

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
