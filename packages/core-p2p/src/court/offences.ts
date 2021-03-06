export const offences = {
    BLACKLISTED: {
        number: 1,
        period: "addYears",
        reason: "Blacklisted",
        weight: 10,
        critical: true,
    },
    NO_COMMON_BLOCKS: {
        number: 5,
        period: "addMinutes",
        reason: "No Common Blocks",
        weight: 1,
        critical: true,
    },
    NO_COMMON_ID: {
        number: 5,
        period: "addMinutes",
        reason: "No Common Id",
        weight: 1,
        critical: true,
    },
    INVALID_VERSION: {
        number: 5,
        period: "addMinutes",
        reason: "Invalid Version",
        weight: 2,
    },
    INVALID_MILESTONE_HASH: {
        number: 5,
        period: "addMinutes",
        reason: "Invalid Milestones",
        weight: 2,
    },
    INVALID_HEIGHT: {
        number: 10,
        period: "addMinutes",
        reason: "Node is not at height",
        weight: 3,
    },
    INVALID_NETWORK: {
        number: 5,
        period: "addMinutes",
        reason: "Invalid Network",
        weight: 5,
        critical: true,
    },
    INVALID_STATUS: {
        number: 5,
        period: "addMinutes",
        reason: "Invalid Response Status",
        weight: 3,
    },
    TIMEOUT: {
        number: 30,
        period: "addSeconds",
        reason: "Timeout",
        weight: 2,
    },
    HIGH_LATENCY: {
        number: 1,
        period: "addMinutes",
        reason: "High Latency",
        weight: 1,
    },
    BLOCKCHAIN_NOT_READY: {
        number: 30,
        period: "addSeconds",
        reason: "Blockchain not ready",
        weight: 0,
    },
    TOO_MANY_REQUESTS: {
        number: 60,
        period: "addSeconds",
        reason: "Rate limit exceeded",
        weight: 0,
    },
    FORK: {
        number: 15,
        period: "addMinutes",
        reason: "Fork",
        weight: 10,
    },
    UNKNOWN: {
        number: 10,
        period: "addMinutes",
        reason: "Unknown",
        weight: 5,
    },
    REPEAT_OFFENDER: {
        number: 1,
        period: "addDays",
        reason: "Repeat Offender",
        weight: 100,
    },
};
