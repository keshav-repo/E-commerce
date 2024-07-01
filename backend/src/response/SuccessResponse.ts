import { ResponseType } from "../config/ResponseTypes";

export class SuccessResponse<T = any> {
    public successCode: string;
    public message: string;
    public data?: T;
    constructor(responseType: ResponseType, data?: T) {
        this.successCode = responseType.code;
        this.message = responseType.message;
        this.data = data;
    }
}
