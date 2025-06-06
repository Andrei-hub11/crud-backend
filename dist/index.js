"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const ApiError_1 = require("./utils/errors/ApiError");
const ApiResponse_1 = require("./utils/ApiResponse");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)(isProduction ? "combined" : "dev"));
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/careers/", postRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`, {
        stack: isProduction ? undefined : err.stack,
        path: req.path,
        method: req.method,
    });
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.statusCode).json(ApiResponse_1.ApiResponse.error(err.message));
    }
    else {
        const message = isProduction ? "Internal Server Error" : err.message;
        res.status(500).json(ApiResponse_1.ApiResponse.error(message));
    }
});
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
}
exports.default = app;
