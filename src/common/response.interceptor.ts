import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode,
        message: 'Success',
        timestamp: Date.now(),
        path: request.url,
        data,
      })),
      catchError((err) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        let errorResponse: any = {
          statusCode,
          message: 'Something went wrong',
          error: err.name || 'Error',
          timestamp: Date.now(),
          path: request.url,
          data: {},
        };

        // If it's an HttpException, preserve the original response
        if (err instanceof HttpException) {
          const originalResponse = err.getResponse();

          errorResponse = {
            ...errorResponse,
            ...(
              typeof originalResponse === 'string'
                ? { message: originalResponse }
                : originalResponse
            ),
          };
        }

        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
