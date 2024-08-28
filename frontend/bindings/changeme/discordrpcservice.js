// @ts-check
// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Call as $Call, Create as $Create} from "@wailsio/runtime";

/**
 * @returns {Promise<string> & { cancel(): void }}
 */
export function GetAppID() {
    let $resultPromise = /** @type {any} */($Call.ByID(2200334524));
    return $resultPromise;
}

/**
 * @returns {Promise<string> & { cancel(): void }}
 */
export function GetDiscordDetails() {
    let $resultPromise = /** @type {any} */($Call.ByID(1740260852));
    return $resultPromise;
}

/**
 * @returns {Promise<string> & { cancel(): void }}
 */
export function GetDiscordState() {
    let $resultPromise = /** @type {any} */($Call.ByID(1539453395));
    return $resultPromise;
}

/**
 * @param {string} appId
 * @param {string} state
 * @param {string} details
 * @returns {Promise<string> & { cancel(): void }}
 */
export function UpdatePresence(appId, state, details) {
    let $resultPromise = /** @type {any} */($Call.ByID(896545158, appId, state, details));
    return $resultPromise;
}
