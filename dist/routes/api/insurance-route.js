"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_list_1 = require("@common/roles-list");
const verify_roles_1 = require("@middleware/verify-roles");
const insurance_controller_1 = require("@controllers/api/insurance-controller");
const insurance_validators_1 = require("@serializers/validators/insurance-validators");
const insuranceRouter = (0, express_1.Router)();
insuranceRouter.route('/')
    .get(insurance_controller_1.insuranceListController)
    .post((0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin, roles_list_1.ROLES_LIST.Editor), insurance_controller_1.createInsuranceController);
insuranceRouter.route('/:id')
    .get(insurance_validators_1.getInsuranceValidator, insurance_controller_1.getInsuranceController)
    .put(insurance_validators_1.updateInsuranceValidator, (0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin, roles_list_1.ROLES_LIST.Editor), insurance_controller_1.updateInsuranceController)
    .delete(insurance_validators_1.deleteInsuranceValidator, (0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), insurance_controller_1.deleteInsuranceController);
exports.default = insuranceRouter;
//# sourceMappingURL=insurance-route.js.map