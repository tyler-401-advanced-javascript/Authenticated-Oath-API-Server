"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(requiredPermission) {
    return function (req, res, next) {
        console.log('**ACL** req.user.role  = ', req.user.role);
        if (req.user.role.name === requiredPermission || req.user.role.permission.includes(requiredPermission)) {
            next();
        }
        else {
            next(new Error('Wrong permissions: you shall not pass.'));
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=accessControlList.js.map