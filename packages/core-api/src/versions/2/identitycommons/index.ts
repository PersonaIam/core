import { Crypto } from "../../../../../crypto";
import { attributesRepository } from "../../../repositories";
import { constants } from "../constants";

// tslint:disable-next-line:no-var-requires
const _ = require("lodash");
// tslint:disable-next-line:no-var-requires
const moment = require("moment");

const hasMinNotarizationsInARow = attributeDetails => {
    let score = 0;
    let result = false;
    // tslint:disable-next-line:ban
    attributeDetails.forEach(detail => {
        if (detail.action === constants.validationRequestValidatorActions.NOTARIZE) {
            score++;
        }
        if (detail.action === constants.validationRequestValidatorActions.REJECT) {
            score = 0;
        }
        if (score === constants.MIN_NOTARIZATIONS_IN_A_ROW) {
            result = true;
        }
    });
    return result;
};

// helper methods

const isAttributeRejectedWithMaxConsecutiveRedFlags = (attribute): boolean => {
    return attribute.redFlagsLast >= constants.MIN_RED_FLAGS_IN_A_ROW_FOR_REJECTED;
};

const isAttributeRejectedWithNoMinNotarizationsInARowInFirstBatch = (attributeDetails, id): boolean => {
    const attributeDetailsLocal = attributeDetails
        .filter(attribute => (attribute.id = id))
        .slice(0, constants.FIRST_NOTARIZATION_BATCH_SIZE);
    return (
        attributeDetailsLocal.length >= constants.FIRST_NOTARIZATION_BATCH_SIZE &&
        !hasMinNotarizationsInARow(attributeDetailsLocal)
    );
};

const isAttributeAboutToBeRejectedWithNoMinNotarizationsInARowInFirstBatch = (attributeDetails, id): boolean => {
    let attributeDetailsLocal = attributeDetails.filter(attribute => (attribute.id = id));
    if (attributeDetailsLocal.length !== constants.FIRST_NOTARIZATION_BATCH_SIZE - 1) {
        return false;
    } else {
        attributeDetailsLocal = attributeDetailsLocal.slice(0, constants.FIRST_NOTARIZATION_BATCH_SIZE - 1);
        return !hasMinNotarizationsInARow(attributeDetailsLocal);
    }
};

const isFirstValidationANotarizationInFirstBatch = (attributeDetails, id) => {
    const attributeDetailsLocal = attributeDetails.filter(attribute => (attribute.id = id));
    const attributeDetail = attributeDetailsLocal.slice(0, 1);
    return attributeDetail[0].action === constants.validationRequestValidatorActions.NOTARIZE;
};

const getNumberOfRedFlags = (attributeDetails, id): number => {
    const attributeDetailsLocal = attributeDetails.filter(attribute => (attribute.id = id));
    let score = 0;
    let redFlags = 0;
    // tslint:disable-next-line:ban
    attributeDetailsLocal.forEach(detail => {
        if (detail.action === constants.validationRequestValidatorActions.NOTARIZE) {
            score++;
        }
        if (detail.action === constants.validationRequestValidatorActions.REJECT) {
            redFlags++;
            score = 0;
        }
        if (score === constants.MIN_NOTARIZATIONS_IN_A_ROW) {
            redFlags = 0;
        }
    });
    return redFlags;
};

const populateDetails = (attribute, attributeDetails, ownerAttributes): void => {
    attribute.active = false;
    attribute.yellowFlags = 0;
    attribute.redFlags = 0;
    attribute.rejected = false;
    attribute.dangerOfRejection = false;
    const attributeDetailsFiltered = attributeDetails.filter(a => a.id === attribute.id);
    if (attributeDetailsFiltered && attributeDetailsFiltered.length > 0) {
        const attributeDetailsElement = attributeDetailsFiltered[0];
        attribute.yellowFlags = attributeDetailsElement.yellowFlags;
        attribute.redFlags = getNumberOfRedFlags(attributeDetailsFiltered, attributeDetailsElement.id);
        attribute.rejected =
            isAttributeRejectedWithMaxConsecutiveRedFlags(attributeDetailsElement) ||
            isAttributeRejectedWithNoMinNotarizationsInARowInFirstBatch(
                attributeDetailsFiltered,
                attributeDetailsElement.id,
            );
        attribute.dangerOfRejection =
            !attribute.rejected &&
            (attributeDetailsElement.redFlagsLast === constants.MIN_RED_FLAGS_IN_A_ROW_FOR_REJECTED - 1 ||
                isAttributeAboutToBeRejectedWithNoMinNotarizationsInARowInFirstBatch(
                    attributeDetailsFiltered,
                    attributeDetailsElement.id,
                ));
        attribute.active =
            !attribute.rejected &&
            (isFirstValidationANotarizationInFirstBatch(attributeDetailsFiltered, attributeDetailsElement.id) ||
                hasMinNotarizationsInARow(attributeDetailsFiltered));
        attribute.completed = attributeDetailsElement.completed;
    }
    attribute.documented =
        ownerAttributes.filter(a => a.associations && a.associations.includes(attribute.id)).length > 0;
};

export const extractAttributeDetails = async (attributes: any, request: any) => {
    const ownerAttributes = attributes;
    attributes = request.type ? attributes.filter(a => a.type === request.type) : attributes;
    attributes = request.id ? attributes.filter(a => a.id === request.id) : attributes;

    let attributeDetails = await attributesRepository.getAttributesWithValidationDetails({
        since: Crypto.Slots.getTime(moment().subtract(constants.MONTHS_FOR_ACTIVE_VALIDATION, "months")),
        now: Crypto.Slots.getTime(),
        owner: request.owner,
        status: [
            "'" + constants.validationRequestStatus.COMPLETED + "'",
            "'" + constants.validationRequestStatus.REJECTED + "'",
        ],
        action: [
            "'" + constants.validationRequestValidatorActions.NOTARIZE + "'",
            "'" + constants.validationRequestValidatorActions.REJECT + "'",
        ],
    });

    attributeDetails = attributeDetails[0];
    // tslint:disable-next-line:ban
    attributeDetails.forEach(adu => {
        adu.rejected = false;
        adu.yellowFlags = attributeDetails.filter(
            ad => ad.id === adu.id && ad.action === constants.validationRequestValidatorActions.REJECT,
        ).length;
        adu.redFlagsLastArray = attributeDetails
            .filter(ad => ad.id === adu.id)
            .slice(-1 * constants.MIN_RED_FLAGS_IN_A_ROW_FOR_REJECTED) // get last elements, to check for rejections
            .reverse();
        // tslint:disable-next-line:only-arrow-functions
        adu.redFlagsLast = _.takeWhile(adu.redFlagsLastArray, function(elem) {
            return elem.action === constants.validationRequestValidatorActions.REJECT;
        }).length;
        adu.completed = attributeDetails.filter(
            ad => ad.id === adu.id && ad.action === constants.validationRequestValidatorActions.NOTARIZE,
        ).length;
    });
    // tslint:disable-next-line:ban
    attributes.forEach(attribute => {
        populateDetails(attribute, attributeDetails, ownerAttributes);
    });
    return attributes;
};
