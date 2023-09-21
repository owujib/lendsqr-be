"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    sendSuccessResponse(res, data, message, statusCode) {
        return res.status(200 || statusCode).json({
            status: 'success',
            data,
            message,
        });
    }
}
exports.default = Controller;
