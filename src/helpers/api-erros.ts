export class ApiError extends Error {

	public readonly statusCode: number;
    public readonly isOperational: boolean;

	constructor(message: string, statusCode: number, isOperational: boolean = true) {
		super(message);
		this.statusCode = statusCode;
        this.isOperational = isOperational;
	};
};

export class BadRequestError extends ApiError {
	constructor(message: string) {
		super(message, 400)
	};
};

export class NotFoundError extends ApiError {
	constructor(message: string) {
		super(message, 404)
	};
};

export class UnauthorizedError extends ApiError {
	constructor(message: string) {
		super(message, 401)
	};
};

export class ForbiddenError extends ApiError {
    constructor(message: string) {
      super(message, 403);
    }
};

export class ConflictError extends ApiError {
    constructor(message: string) {
      super(message, 409);
    }
};
  
export class ValidationError extends ApiError {
    constructor(message: string) {
      super(message, 422);
    }
};
  
export class InternalServerError extends ApiError {
    constructor(message: string, isOperational: boolean = false) {
      super(message, 500, isOperational);
    }
};

export class NotImplemented extends ApiError {
    constructor(message: string) {
      super(message, 501);
    }
};

export class ServiceUnavailableError extends ApiError {
    constructor(message: string) {
      super(message, 503);
    }
};
  