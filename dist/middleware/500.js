"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function serverErrorHandler(err, req, res, next) {
    res.status(500).json({ error: err });
}
exports.default = serverErrorHandler;
//# sourceMappingURL=500.js.map