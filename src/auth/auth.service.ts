import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async signup(email: string, password: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new BadRequestException("Email already exists");

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.users.createUser(email, passwordHash);
    return { _id: user._id, email: user.email };
  }

  async signin(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    const payload = { sub: user._id.toString(), email: user.email };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}