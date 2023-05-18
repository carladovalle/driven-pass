import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthLoginDTO {

    @IsEmail()
    email: string;

    password: string;

}