import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader =
            request.headers['authorization'] ||
            request.headers['Authorization'];
        try {
            const { data } = await this.authService.verifyToken(
                authorizationHeader,
            );
            request.user = data;
            return true;
        } catch (err) {
            return false;
        }
    }
}
