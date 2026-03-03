import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { SigninDto } from "./dto/signin.dto";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("signup")
  signup(@Body() dto: SignupDto) {
    return this.auth.signup(dto.email, dto.password);
  }

  @Post("signin")
  signin(@Body() dto: SigninDto) {
    return this.auth.signin(dto.email, dto.password);
  }

  @Get("profile")
  @UseGuards(AuthGuard("jwt"))
  profile(@Req() req: any) {
    return req.user;
  }
}