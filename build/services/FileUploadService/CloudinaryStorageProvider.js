"use strict";
// CloudinaryStorageProvider.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const fileConfig_1 = __importDefault(require("../../config/fileConfig"));
class CloudinaryStorageProvider {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: fileConfig_1.default.disks.cloudinary.cloud_name,
            api_key: fileConfig_1.default.disks.cloudinary.api_key,
            api_secret: fileConfig_1.default.disks.cloudinary.api_secret,
            secure: fileConfig_1.default.disks.cloudinary.secure,
        });
    }
    removeFile(publicId, resourceType) {
        return __awaiter(this, void 0, void 0, function* () {
            return cloudinary_1.v2.uploader.destroy(publicId, {
                resource_type: resourceType,
            });
        });
    }
    uploadFile(file, resource_type, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            return cloudinary_1.v2.uploader.upload(file.path, { resource_type, folder });
        });
    }
}
exports.default = CloudinaryStorageProvider;
