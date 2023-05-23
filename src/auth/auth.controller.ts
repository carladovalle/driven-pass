import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("sign-in")
    async signin(@Body() body: AuthLoginDTO) {
        const { email, password } = body;
        return this.authService.signin(email, password);
    }

    @Post("sign-up")
    async signup(@Body() body: AuthRegisterDTO) {
        return this.authService.signup(body);
    }

}
