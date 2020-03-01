"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFoundHandler(req, res, next) {
    res.status(404).json({ message: 'The resource you requested does not exist. Please hang up and try again later' });
}
exports.default = notFoundHandler;
//# sourceMappingURL=404.js.map