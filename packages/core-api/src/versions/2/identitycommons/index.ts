import { slots } from "@arkecosystem/crypto";
import { attributesRepository } from "../../../repositories";
import { constants } from "../constants";
var _ = require('lodash');
var moment = require('moment');

export const extractAttributeDetails = async (attributes : any, request : any)  => {
    let ownerAttributes = attributes;
    attributes = request.type ? attributes.filter(a => a.type === request.type) : attributes;
    attributes = request.id ? attributes.filter(a => a.id === request.id) : attributes;

    let attributeDetails = await attributesRepository.getAttributesWithValidationDetails({
        since: slots.getTime(moment().subtract(constants.MONTHS_FOR_ACTIVE_VALIDATION, "months")),
        now: slots.getTime(),
        owner: request.owner,
        status: ['\'' + constants.validationRequestStatus.COMPLETED + '\'', '\'' + constants.validationRequestStatus.REJECTED + '\''],
        action: ['\'' + constants.validationRequestValidatorActions.NOTARIZE + '\'', '\'' + constants.validationRequestValidatorActions.REJECT + '\''],
    });

    let yellowFlags = [];
    let redFlags = [];
    attributeDetails = attributeDetails[0];
    attributeDetails.forEach(adu => {
        adu.rejected = false;
        adu.yellowFlags = attributeDetails
            .filter(ad => ad.id === adu.id && ad.action === constants.validationRequestValidatorActions.REJECT)
            .length;
        adu.redFlagsLastArray = attributeDetails
            .filter(ad => ad.id === adu.id)
            .slice(-1 * constants.MIN_RED_FLAGS_IN_A_ROW_FOR_REJECTED) // get last elements, to check for rejections
            .reverse();
        adu.redFlagsLast = _.takeWhile(adu.redFlagsLastArray, function (elem) {
            return elem.action === constants.validationRequestValidatorActions.REJECT
        }).length;
        adu.completed = attributeDetails.filter(ad => ad.id === adu.id && ad.action === constants.validationRequestValidatorActions.NOTARIZE).length;
    });
    attributes.forEach(attribute => {
        populateDetails(attribute, attributeDetails, ownerAttributes);
    });
    return attributes;
};


// helper methods

function isAttributeRejectedWithMaxConsecutiveRedFlags(attribute) {
    return attribute.redFlagsLast >= constants.MIN_RED_FLAGS_IN_A_ROW_FOR_REJECTED
}

function isAttributeRejectedWithNoMinNotarizationsInARowInFirstBatch(attributeDetails, id) {
    let attributeDetailsLocal = attributeDetails.filter(attribute => attribute.id = id).slice(0, constants.FIRST_NOTARIZATION_BATCH_SIZE)
    return attributeDetailsLocal.length >= constants.FIRST_NOTARIZATION_BATCH_SIZE && !hasMinNotarizationsInARow(attributeDetailsLocal)
}

function isAttributeAboutToBeRejectedWithNoMinNotarizationsInARowInFirstBatch(attributeDetails, id) {
    let attributeDetailsLocal = attributeDetails.filter(attribute => attribute.id = id);
    if (attributeDetailsLocal.length !== constants.FIRST_NOTARIZATION_BATCH_SIZE - 1) {
        return false;
    } else {
        attributeDetailsLocal = attributeDetailsLocal.slice(0, constants.FIRST_NOTARIZATION_BATCH_SIZE - 1);
        return !hasMinNotarizationsInARow(attributeDetailsLocal)
    }
}

function hasMinNotarizationsInARow(attributeDetails) {
    let score = 0;
    let result = false;
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
}

function isFirstValidationANotarizationInFirstBatch(attributeDetails, id) {
    let attributeDetailsLocal = attributeDetails.filter(attribute => attribute.id = id);
    let attributeDetail = attributeDetailsLocal.slice(0, 1);
    return attributeDetail[0].action === constants.validationRequestValidatorActions.NOTARIZE;
}

function getNumberOfRedFlags(attributeDetails, id) {
    let attributeDetailsLocal = attributeDetails.filter(attribute => attribute.id = id);
    let score = 0;
    let redFlags = 0;
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
}

function populateDetails(attribute, attributeDetails, ownerAttributes) {
    attribute.active = false;
    attribute.yellowFlags = 0;
    attribute.redFlags = 0;
    attribute.rejected = false;
    attribute.dangerOfRejection = false;
    let attributeDetailsFiltered = attributeDetails.filter(a => a.id === attribute.id);
    if (attributeDetailsFiltered && attributeDetailsFiltered.length > 0) {
        let attributeDetailsElement = attributeDetailsFiltered[0];
        attribute.yellowFlags = attributeDetailsElement.yellowFlags;
        attribute.redFlags = getNumberOfRedFlags(attributeDetailsFiltered, attributeDetailsElement.id);
        attribute.rejected =
            isAttributeRejectedWithMaxConsecutiveRedFlags(attributeDetailsElement) ||
            isAttributeRejectedWithNoMinNotarizationsInARowInFirstBatch(attributeDetailsFiltered, attributeDetailsElement.id);
        attribute.dangerOfRejection = !attribute.rejected && (attributeDetailsElement.redFlagsLast === constants.MIN_RED_FLAGS_IN_A_ROW_FOR_REJECTED - 1 ||
            isAttributeAboutToBeRejectedWithNoMinNotarizationsInARowInFirstBatch(attributeDetailsFiltered, attributeDetailsElement.id));
        attribute.active =
            !attribute.rejected &&
            (isFirstValidationANotarizationInFirstBatch(attributeDetailsFiltered, attributeDetailsElement.id) ||
                hasMinNotarizationsInARow(attributeDetailsFiltered));
        attribute.completed = attributeDetailsElement.completed;
    }
    attribute.documented = ownerAttributes.filter(a => a.associations && a.associations.includes(attribute.id)).length > 0;
}
