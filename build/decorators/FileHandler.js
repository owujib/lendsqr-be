"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHelper = exports.uploadFileHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const axios_1 = require("axios");
const helpers_1 = __importDefault(require("../helpers"));
const fileConfig_1 = __importDefault(require("../config/fileConfig"));
const helpers_2 = __importDefault(require("../helpers"));
let storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, fileConfig_1.default.disks.local.root);
    },
    filename: (req, file, callback) => {
        callback(null, helpers_2.default.generateUniqueFilename(file.originalname));
    },
});
function uploadFileHandler({ fields, validationFunction, limit, }) {
    return function (target, propertyKey, descriptor) {
        const upload = (0, multer_1.default)({
            storage: storage,
            fileFilter: validationFunction,
            limits: {
                fileSize: limit || helpers_1.default.convertToBytes(2),
            },
        });
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            upload.fields(fields)(req, res, (err) => {
                if (err instanceof multer_1.default.MulterError) {
                    throw next(new ApiError_1.default('Request File Error', axios_1.HttpStatusCode.BadRequest, err));
                }
                else if (err) {
                    throw next(new ApiError_1.default('Server error', axios_1.HttpStatusCode.BadRequest, err));
                }
                const filePath = req.files;
                return originalMethod.call(this, req, res, next);
            });
        };
    };
}
exports.uploadFileHandler = uploadFileHandler;
const uploadHelper = ({ validationFunction, fields, limit, }) => {
    const upload = (0, multer_1.default)({
        storage: storage,
        fileFilter: validationFunction,
        limits: {
            fileSize: limit || helpers_1.default.convertToBytes(2),
        },
    });
    return upload.fields(fields);
};
exports.uploadHelper = uploadHelper;
