import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

   async validateUserCredentials(
    email: string,
    password: string
   ) {
    return await this.usersService.validate(email, password);
   }

   async login(user: User) {
    const payload = { email: user.email, sub: user.id }

    return {
        access_token: this.jwtService.sign(payload),
    }
   }
}
