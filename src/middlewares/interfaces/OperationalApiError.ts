import { ApiError } from "../../helpers/api-erros";


export interface OperationalApiError extends ApiError {
    isOperational: boolean;
}