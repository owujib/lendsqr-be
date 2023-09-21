"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LocalDiskStorageProvider.js
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileConfig_1 = __importDefault(require("../../config/fileConfig"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '../../.env' });
class LocalDiskStorageProvider {
    constructor() {
        this.uploadDirectory = fileConfig_1.default.disks.local.root;
    }
    // Method to save the file to the disk
    uploadFile(file, resource_type, folder) {
        return new Promise((resolve, reject) => {
            fs_1.default.rename(file.path, path_1.default.join(process.env.UPLOADS_DIR, file.filename), (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(`${process.env.UPLOADS_DIR}/${file.filename}`);
                }
            });
        });
    }
    // Method to delete a file from the disk
    removeFile(filename) {
        // return new Promise((resolve, reject) => {
        //   fs.unlink(path.join(this.uploadDirectory, filename), (err) => {
        //     if (err) {
        //       reject(err);
        //     } else {
        //       resolve();
        //     }
        //   });
        // });
    }
}
exports.default = LocalDiskStorageProvider;
