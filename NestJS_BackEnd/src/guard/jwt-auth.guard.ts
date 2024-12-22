import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      console.log('Authorization header missing');
      return false;
    }

    const token = authorization.split(' ')[1]; // Assuming 'Bearer token'

    if (!token) {
      console.log('Token missing');
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token);
      //console.log('Decoded JWT Token:', decoded); // Check decoded JWT
      request.user = decoded; // Attach user data to request object
      return true;
    } catch (err) {
      console.error('JWT Verification failed:', err); // Check error message
      return false;
    }
  }
}
