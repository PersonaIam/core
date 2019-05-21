import Boom from "boom";
import Hapi from "hapi";
import { Controller } from "../shared/controller";

export class AttributeValidationsController extends Controller {

    public async getAttributeValidationRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributevalidations.getAttributeValidationRequest(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async createAttributeValidationRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributevalidations.createAttributeValidationRequest(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async approveAttributeValidationRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributevalidations.attributeValidationRequestAnswer(request, "APPROVE");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async cancelAttributeValidationRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributevalidations.attributeValidationRequestAnswer(request, "CANCEL");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async declineAttributeValidationRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributevalidations.attributeValidationRequestAnswer(request, "DECLINE");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async notarizeAttributeValidationRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributevalidations.attributeValidationRequestAnswer(request, "NOTARIZE");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async rejectAttributeValidationRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributevalidations.attributeValidationRequestAnswer(request, "REJECT");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async getAttributeValidationScore(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributevalidations.getAttributeValidationScore(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async getAttributeCredibility(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributevalidations.getAttributeCredibility(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }


}
