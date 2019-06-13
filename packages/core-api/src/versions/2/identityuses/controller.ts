import Boom from "boom";
import Hapi from "hapi";
import { Controller } from "../shared/controller";

export class IdentityUsesController extends Controller {

    public async getIdentityUsesRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.identityuses.getIdentityUseRequest(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async createIdentityUseRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.identityuses.createIdentityUseRequest(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async approveIdentityUseRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.identityuses.identityUseRequestAnswer(request, "APPROVE");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async cancelIdentityUseRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.identityuses.identityUseRequestAnswer(request, "CANCEL");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async declineIdentityUseRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.identityuses.identityUseRequestAnswer(request, "DECLINE");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async notarizeIdentityUseRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.identityuses.identityUseRequestAnswer(request, "NOTARIZE");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async endIdentityUseRequest(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.identityuses.identityUseRequestAnswer(request, "END");

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }
}
