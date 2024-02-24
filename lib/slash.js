"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function slash(path) {
    const isExtendedLengthPath = path.startsWith("\\\\?\\");
    if (isExtendedLengthPath) {
        return path;
    }
    return path.replace(/\\/g, "/");
}
exports.default = slash;
//# sourceMappingURL=slash.js.map