
export class UnAuthenticatedError extends Error {
    
}

export class UnAuthorizedError extends Error {
    
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    
    super(message);
    this.status = status;
    this.name = "ApiError";

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}


