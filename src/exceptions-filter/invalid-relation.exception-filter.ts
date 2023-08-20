import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InvalidRelationError } from 'src/errors/invalid-relation.error';

@Catch(InvalidRelationError)
export class InvalidRelationExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    return response.status(422).json({
      statusCode: 422,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
