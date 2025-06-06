"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(success, data, message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
    static ok(data) {
        return new ApiResponse(true, data, null);
    }
    static created(data) {
        return new ApiResponse(true, data, null);
    }
    static error(message) {
        return new ApiResponse(false, null, message);
    }
}
exports.ApiResponse = ApiResponse;
