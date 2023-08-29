import { NextFunction, Request, Response } from "express"
import validator from "./validate_";

const idRequiredQuery = async (req: Request, res: Response, next: NextFunction) => {
    const ValidationRule = {
        "id": "required|string",
    }
    validator.validatorUtilWithCallbackQuery(ValidationRule, {}, req, res, next);
}
const idRequired = async (req: Request, res: Response, next: NextFunction) => {
    const ValidationRule = {
        "id": "required|string",
    }
    validator.validatorUtilWithCallback(ValidationRule, {}, req, res, next);
}



export default {
    idRequired,
    idRequiredQuery,
}