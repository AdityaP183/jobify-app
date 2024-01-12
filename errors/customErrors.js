import { StatusCodes } from "http-status-codes";

export class NotFound extends Error{
    constructor(message){
        super(message)
        this.name = 'NotFoundError'
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export class BadRequest extends Error{
    constructor(message){
        super(message)
        this.name = 'BadRequestError'
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export class UnAuthenticated extends Error{
    constructor(message){
        super(message)
        this.name = 'UnAuthenticatedError'
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export class UnAuthorized extends Error{
    constructor(message){
        super(message)
        this.name = 'UnAuthorizedError'
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}
