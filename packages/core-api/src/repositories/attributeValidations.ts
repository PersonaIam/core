// tslint:disable-next-line:no-var-requires
const crypto = require("@arkecosystem/crypto/dist/index");
// tslint:disable-next-line:no-var-requires
const axios = require("axios");
// tslint:disable-next-line:no-var-requires
const defaults = require("../defaults");

import { IRepository } from "../interfaces";
import { constants } from "../versions/2/constants";
import { messages } from "../versions/2/messages";
import { Repository } from "./repository";
import { buildFilterQuery } from "./utils/build-filter-query";

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
    public async createAttributeValidationRequest(parameters = {} as any) {
        try {
            const validation = parameters.asset.validation[0];
            const transaction = crypto.Transactions.BuilderFactory.requestAttributeValidation()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.owner)
                .sign(parameters.secret)
                .getStruct();

            const response = await axios.post(
                "http://127.0.0.1:" + defaults.defaults.port + "/api/v2/transactions",
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
                    validation.reason = undefined;
                }
                if (!validation.validation_type) {
                    validation.validation_type = undefined;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = undefined;
                }
                validation.status = "PENDING_APPROVAL";
                await this.databaseService.connection.saveAttributeValidationRequest(validation);
                return { transactionId: transaction.id };
            } else {
                return { error: "Invalid Transaction" };
            }
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }

    /**
     * Approve Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    public async approveAttributeValidationRequest(parameters = {} as any) {
        try {
            const validation = parameters.asset.validation[0];
            const transaction = crypto.Transactions.BuilderFactory.approveAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.validator)
                .sign(parameters.secret)
                .getStruct();

            const response = await axios.post(
                "http://127.0.0.1:" + defaults.defaults.port + "/api/v2/transactions",
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
                    validation.reason = undefined;
                }
                if (!validation.validation_type) {
                    validation.validation_type = undefined;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = undefined;
                }
                validation.status = "IN_PROGRESS";
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id: validation.id,
                    action: "APPROVE",
                    timestamp: transaction.timestamp,
                });
                return { transactionId: transaction.id };
            } else {
                return { error: "Invalid Transaction" };
            }
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }

    /**
     * Decline Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    public async declineAttributeValidationRequest(parameters = {} as any) {
        try {
            const validation = parameters.asset.validation[0];
            const transaction = crypto.Transactions.BuilderFactory.declineAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.validator)
                .sign(parameters.secret)
                .getStruct();

            const response = await axios.post(
                "http://127.0.0.1:" + defaults.defaults.port + "/api/v2/transactions",
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
                    validation.reason = undefined;
                }
                if (!validation.validation_type) {
                    validation.validation_type = undefined;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = undefined;
                }
                validation.status = "DECLINED";
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id: validation.id,
                    action: "DECLINE",
                    timestamp: transaction.timestamp,
                });
                return { transactionId: transaction.id };
            } else {
                return { error: "Invalid Transaction" };
            }
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }

    /**
     * Cancel Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    public async cancelAttributeValidationRequest(parameters = {} as any) {
        try {
            const validation = parameters.asset.validation[0];
            const transaction = crypto.Transactions.BuilderFactory.cancelAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.owner)
                .sign(parameters.secret)
                .getStruct();

            const response = await axios.post(
                "http://127.0.0.1:" + defaults.defaults.port + "/api/v2/transactions",
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
                    validation.reason = undefined;
                }
                if (!validation.validation_type) {
                    validation.validation_type = undefined;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = undefined;
                }
                validation.status = "CANCELED";
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id: validation.id,
                    action: "CANCEL",
                    timestamp: transaction.timestamp,
                });
                return { transactionId: transaction.id };
            } else {
                return { error: "Invalid Transaction" };
            }
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }

    /**
     * Notarize Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    public async notarizeAttributeValidationRequest(parameters = {} as any) {
        try {
            const validation = parameters.asset.validation[0];
            const transaction = crypto.Transactions.BuilderFactory.notarizeAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.validator)
                .sign(parameters.secret)
                .getStruct();

            const response = await axios.post(
                "http://127.0.0.1:" + defaults.defaults.port + "/api/v2/transactions",
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
                    validation.reason = undefined;
                }
                if (!validation.validation_type) {
                    validation.validation_type = undefined;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = undefined;
                }
                validation.status = "COMPLETED";
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id: validation.id,
                    action: "NOTARIZE",
                    timestamp: transaction.timestamp,
                });
                return { transactionId: transaction.id };
            } else {
                return { error: "Invalid Transaction" };
            }
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }

    /**
     * Reject Attribute Validation request.
     * @param  {Object}  parameters
     * @return {Object}
     */
    public async rejectAttributeValidationRequest(parameters = {} as any) {
        try {
            const validation = parameters.asset.validation[0];
            const transaction = crypto.Transactions.BuilderFactory.rejectAttributeValidationRequest()
                .validationAsset(parameters.asset.validation)
                .amount(0)
                .recipientId(validation.validator)
                .sign(parameters.secret)
                .getStruct();

            const response = await axios.post(
                "http://127.0.0.1:" + defaults.defaults.port + "/api/v2/transactions",
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
                    validation.reason = undefined;
                }
                if (!validation.validation_type) {
                    validation.validation_type = undefined;
                }
                if (!validation.expire_timestamp) {
                    validation.expire_timestamp = undefined;
                }
                validation.status = "REJECTED";
                await this.databaseService.connection.updateAttributeValidationRequest(validation);
                await this.databaseService.connection.addAttributeValidationRequestAction({
                    id: validation.id,
                    action: "REJECT",
                    timestamp: transaction.timestamp,
                });
                console.log("1 : " + JSON.stringify(parameters));
                if (parameters.identityUsesIdsToReject) {
                    await this.databaseService.connection.updateIdentityUseWithReason({
                        status: constants.identityUseRequestStatus.REJECTED,
                        reason: messages.IDENTITY_USE_REQUEST_REJECTED_REASON,
                        ids: parameters.identityUsesIdsToReject,
                    });
                }
                return { transactionId: transaction.id };
            } else {
                return { error: "Invalid Transaction" };
            }
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }

    /**
     * getAttributeValidationScore.
     * @param  {Object}  parameters
     * @return {Object}
     */
    public async getAttributeValidationScore(parameters = {} as any) {
        try {
            const result = await this.databaseService.connection.getAttributeValidationScore(parameters);
            return { result };
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }

    /**
     * getAttributeValidationScore.
     * @param  {Object}  parameters
     * @return {Object}
     */
    public async getAttributeValidationRequests(parameters = {} as any) {
        try {
            return await this.databaseService.connection.getAttributeValidationRequests(parameters);
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }
}
