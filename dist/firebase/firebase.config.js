"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const firebaseConfig = {
    projectId: config_1.config.projectId,
    private_key: config_1.config.private_key,
    client_email: config_1.config.client_email,
};
exports.default = firebaseConfig;
//# sourceMappingURL=firebase.config.js.map