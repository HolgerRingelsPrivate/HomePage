import appSession from '@/singletons/session/AppSession';
import * as AppSessionData from '@/singletons/session/AppSessionData';

/**
 * This method delivers all roles of the current logged in user
 * @returns Array of roles, where each entry is defined in AppConstants.CONSTANTS.USER_ROLE_[XYZ] of **undefined** if not set
 */
export function getUserRoles() {
  let oUser = appSession.getObject(
    AppSessionData.OBJECT_DEF.LOGGED_IN_USER_ROLES
  );
  if (oUser === undefined) {
    return undefined;
  }
  let rolesArray = oUser.userroles;
  return rolesArray;
}

/**
 * This method checks, if the serRoles of the current logged in user includes a particular role (where roles are defined in AppConstants.CONSTANTS.USER_ROLE_[XYZ])
 * @param {*} role
 * @retrun true, if the roles is part of user's roles / false: if not
 */
export function hasUserRole(role) {
  let rolesArray = getUserRoles();
  if (rolesArray === undefined) {
    return false;
  }
  for (let i = 0; i < rolesArray.length; i++) {
    let candidateRole = rolesArray[i];
    if (role === candidateRole) {
      return true;
    }
  }

  return false;
}

/**
 * This method logs out the user and returns to the login page of the Browser Tab
 * and enters the Login Page (of StandardUi  or AdminUi
 * @returns
 */
export function setUiToLoggedOut() {
  if (typeof window !== 'undefined') {
    window.location.replace('/');
  }
  //    if (typeof wiiindow !== 'undefined') {
  //AdminUi ?
  // ...
  //StandardUi !
  //      wiiindow.location.replace('/');
  //    }
}
