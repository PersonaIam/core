const crypto = require("@arkecosystem/crypto/dist/index");
const axios = require("axios");

import { IRepository } from "../interfaces";
import { Repository } from "./repository";
import { buildFilterQuery } from "./utils/build-filter-query";
import { constants } from "../versions/2/constants";
import { messages } from "../versions/2/messages";

export class AttributeValidationsRepository extends Repository implements IRepository {
    constructor() {
        super();
    }

    public getModel(): any {
        return (this.databaseService.connection as any).models.attributevalidation;
    }

    /**
     * Get all attributes for the given parameters.
     * @param  {Object}  parameters
     * @return {Object}
     */
    public async findByCriteria(parameters: any = {}): Promise<any> {
        const selectQuery = this.query.select().from(this.query);

        const conditions = Object.entries(this._formatConditions(parameters));

        if (conditions.length) {
            const first = conditions.shift();

            selectQuery.where(this.query[first[0]].equals(first[1]));

            for (const condition of conditions) {
                selectQuery.and(this.query[condition[0]].equals(condition[1]));
            }
        }
    }

    /**
     * Search all attribute validation requests.
     * @param  {Object} parameters
     * @return {Object}
     */
    public async search(parameters): Promise<any> {
        const selectQuery = this.query.select().from(this.query);

        const conditions = buildFilterQuery(this._formatConditions(parameters), {
            exact: ["id", "attribute_id", "validator"],
        });

        if (conditions.length) {
            const first = conditions.shift();

            selectQuery.where(this.query[first.column][first.method](first.value));

            for (const condition of conditions) {
                selectQuery.and(this.query[condition.column][condition.method](condition.value));
            }
        }

        return this._findManyWithCount(selectQuery, {
            limit: parameters.limit,
            offset: parameters.offset,
            orderBy: this.__orderBy(parameters),
        });
    }

    public __orderBy(parameters): string[] {
        if (!parameters.orderBy) {
            return ["id", "asc"];
        }

        const orderBy = parameters.orderBy.split(":").map(p => p.toLowerCase());
        if (orderBy.length !== 2 || ["desc", "asc"].includes(orderBy[1]) !== true) {
            return ["id", "asc"];
        }

        return orderBy;
    }

    /**
     * Create Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    async createAttributeValidationRequest(parameters = <any>{}) {

        try {
            let validation = parameters.asset.validation[0];
            const transaction = crypto.transactionBuilder
                .requestAttributeValidation()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.owner)
                .sign(parameters.secret)
                .getStruct();

            let response = await axios.post(
                "http://127.0.0.1:4003/api/v2/transactions",
                {
                    transactions: [transaction],
                },
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (response.data.data.invalid.length === 0) {
                validation.timestamp = transaction.timestamp;
                if (!validation.reason) {
                    validation.reason = null;
                }
                if (!validation.validation_type) {
                    validation.validation_type = null;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = null;
                }
                validation.status = 'PENDING_APPROVAL';
                await this.databaseService.connection.saveAttributeValidationRequest(validation);
                return {"transactionId" : transaction.id};
            } else {
                return {"error" : "Invalid Transaction"}
            }

        } catch (err) {
            console.log(err);
            return {"error" : err};
        }
    }

    /**
     * Approve Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    async approveAttributeValidationRequest(parameters = <any>{}) {

        try {
            let validation = parameters.asset.validation[0];
            const transaction = crypto.transactionBuilder
                .approveAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.validator)
                .sign(parameters.secret)
                .getStruct();

            let response = await axios.post(
                "http://127.0.0.1:4003/api/v2/transactions",
                {
                    transactions: [transaction],
                },
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (response.data.data.invalid.length === 0) {
                validation.timestamp = transaction.timestamp;
                if (!validation.reason) {
                    validation.reason = null;
                }
                if (!validation.validation_type) {
                    validation.validation_type = null;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = null;
                }
                validation.status = 'IN_PROGRESS';
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id : validation.id,
                    action : 'APPROVE',
                    timestamp : transaction.timestamp
                });
                return {"transactionId" : transaction.id};
            } else {
                return {"error" : "Invalid Transaction"}
            }

        } catch (err) {
            console.log(err);
            return {"error" : err};
        }
    }

    /**
     * Decline Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    async declineAttributeValidationRequest(parameters = <any>{}) {

        try {
            let validation = parameters.asset.validation[0];
            const transaction = crypto.transactionBuilder
                .declineAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.validator)
                .sign(parameters.secret)
                .getStruct();

            let response = await axios.post(
                "http://127.0.0.1:4003/api/v2/transactions",
                {
                    transactions: [transaction],
                },
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (response.data.data.invalid.length === 0) {
                validation.timestamp = transaction.timestamp;
                if (!validation.reason) {
                    validation.reason = null;
                }
                if (!validation.validation_type) {
                    validation.validation_type = null;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = null;
                }
                validation.status = 'DECLINED';
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id : validation.id,
                    action : 'DECLINE',
                    timestamp : transaction.timestamp
                });
                return {"transactionId" : transaction.id};
            } else {
                return {"error" : "Invalid Transaction"}
            }

        } catch (err) {
            console.log(err);
            return {"error" : err};
        }
    }

    /**
     * Cancel Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    async cancelAttributeValidationRequest(parameters = <any>{}) {

        try {
            let validation = parameters.asset.validation[0];
            const transaction = crypto.transactionBuilder
                .cancelAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.owner)
                .sign(parameters.secret)
                .getStruct();

            let response = await axios.post(
                "http://127.0.0.1:4003/api/v2/transactions",
                {
                    transactions: [transaction],
                },
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (response.data.data.invalid.length === 0) {
                validation.timestamp = transaction.timestamp;
                if (!validation.reason) {
                    validation.reason = null;
                }
                if (!validation.validation_type) {
                    validation.validation_type = null;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = null;
                }
                validation.status = 'CANCELED';
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id : validation.id,
                    action : 'CANCEL',
                    timestamp : transaction.timestamp
                });
                return {"transactionId" : transaction.id};
            } else {
                return {"error" : "Invalid Transaction"}
            }

        } catch (err) {
            console.log(err);
            return {"error" : err};
        }
    }

    /**
     * Notarize Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    async notarizeAttributeValidationRequest(parameters = <any>{}) {

        try {
            let validation = parameters.asset.validation[0];
            const transaction = crypto.transactionBuilder
                .notarizeAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.validator)
                .sign(parameters.secret)
                .getStruct();

            let response = await axios.post(
                "http://127.0.0.1:4003/api/v2/transactions",
                {
                    transactions: [transaction],
                },
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (response.data.data.invalid.length === 0) {
                validation.timestamp = transaction.timestamp;
                if (!validation.reason) {
                    validation.reason = null;
                }
                if (!validation.validation_type) {
                    validation.validation_type = null;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = null;
                }
                validation.status = 'COMPLETED';
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id : validation.id,
                    action : 'NOTARIZE',
                    timestamp : transaction.timestamp
                });
                return {"transactionId" : transaction.id};
            } else {
                return {"error" : "Invalid Transaction"}
            }

        } catch (err) {
            console.log(err);
            return {"error" : err};
        }
    }

    /**
     * Reject Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    async rejectAttributeValidationRequest(parameters = <any>{}) {

        try {
            let validation = parameters.asset.validation[0];
            const transaction = crypto.transactionBuilder
                .rejectAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.validator)
                .sign(parameters.secret)
                .getStruct();

            let response = await axios.post(
                "http://127.0.0.1:4003/api/v2/transactions",
                {
                    transactions: [transaction],
                },
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (response.data.data.invalid.length === 0) {
                validation.timestamp = transaction.timestamp;
                if (!validation.reason) {
                    validation.reason = null;
                }
                if (!validation.validation_type) {
                    validation.validation_type = null;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = null;
                }
                validation.status = 'REJECTED';
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id : validation.id,
                    action : 'REJECT',
                    timestamp : transaction.timestamp
                });
                console.log('1 : ' + JSON.stringify(parameters))
                if (parameters.identityUsesIdsToReject) {
                    await this.databaseService.connection.updateIdentityUseWithReason({
                        status: constants.identityUseRequestStatus.REJECTED,
                        reason: messages.IDENTITY_USE_REQUEST_REJECTED_REASON,
                        ids: parameters.identityUsesIdsToReject
                    });
                }
                return {"transactionId" : transaction.id};
            } else {
                return {"error" : "Invalid Transaction"}
            }

        } catch (err) {
            console.log(err);
            return {"error" : err};
        }
    }

    /**
     * getAttributeValidationScore.
     * @param  {Object}  parameters
     * @return {Object}
     */
    async getAttributeValidationScore(parameters = <any>{}) {

        try {
            const result = await this.databaseService.connection.getAttributeValidationScore(parameters);
            return { "result": result };

        } catch (err) {
            console.log(err);
            return { "error": err };
        }
    }

    /**
     * getAttributeValidationScore.
     * @param  {Object}  parameters
     * @return {Object}
     */
    async getAttributeValidationRequests(parameters = <any>{}) {

        try {
            return await this.databaseService.connection.getAttributeValidationRequests(parameters);

        } catch (err) {
            console.log(err);
            return { "error": err };
        }
    }
}
