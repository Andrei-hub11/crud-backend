import { ApiResponse } from "../../utils/ApiResponse";

describe("ApiResponse", () => {
  describe("ok", () => {
    it("should return a success response with the given data", () => {
      const data = { message: "Hello, world!" };
      const response = ApiResponse.ok(data);

      expect(response.success).toBe(true);
      expect(response.data).toBe(data);
      expect(response.message).toBeNull();
    });
  });

  describe("created", () => {
    it("should return a created response with the given data", () => {
      const data = { message: "Hello, world!" };
      const response = ApiResponse.created(data);

      expect(response.success).toBe(true);
      expect(response.data).toBe(data);
      expect(response.message).toBeNull();
    });
  });

  describe("error", () => {
    it("should return a error response with the given message", () => {
      const message = "Hello, world!";
      const response = ApiResponse.error(message);

      expect(response.success).toBe(false);
      expect(response.data).toBeNull();
      expect(response.message).toBe(message);
    });
  });
});
