"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiResponse_1 = require("../../utils/ApiResponse");
describe("ApiResponse", () => {
    describe("ok", () => {
        it("should return a success response with the given data", () => {
            const data = { message: "Hello, world!" };
            const response = ApiResponse_1.ApiResponse.ok(data);
            expect(response.success).toBe(true);
            expect(response.data).toBe(data);
            expect(response.message).toBeNull();
        });
    });
    describe("created", () => {
        it("should return a created response with the given data", () => {
            const data = { message: "Hello, world!" };
            const response = ApiResponse_1.ApiResponse.created(data);
            expect(response.success).toBe(true);
            expect(response.data).toBe(data);
            expect(response.message).toBeNull();
        });
    });
    describe("error", () => {
        it("should return a error response with the given message", () => {
            const message = "Hello, world!";
            const response = ApiResponse_1.ApiResponse.error(message);
            expect(response.success).toBe(false);
            expect(response.data).toBeNull();
            expect(response.message).toBe(message);
        });
    });
});
