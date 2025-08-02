import * as ArchitecturalConstants from './ArchitecturalConstants';

/**
 * This function delivers the RestService Url used by retrieval of common topics like i18n and ui Parameters
 */
export function getRestServiceUrl() {
  if (typeof window !== 'undefined') {
    let link = window.location.protocol + '//' + window.location.hostname;
    let result =
      link + '/api/' + ArchitecturalConstants.CONSTANTS.LOGICAL_NAME + '/';
    return result;
  }
  return null;
}

/**
 * This function delivers the first part of the RestService Url used to access entity data
 * Entities do provide the ArchitecturalConstant LOGICAL_NAME themself
 * Note: Try to imagine you have a joined app dealing with entities from different RESRT-Servers
 */
export function getEntityRestServiceUrl() {
  if (typeof window !== 'undefined') {
    let link = window.location.protocol + '//' + window.location.hostname;
    let result = link + '/api/';
    return result;
  }
  return null;
}
