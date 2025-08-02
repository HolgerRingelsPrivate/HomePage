export const DEFINITION = {
    USER_LOOGED_IN  : "USER_LOOGED_IN",
    USER_LOOGED_OUT : "USER_LOOGED_OUT", //currently not used
    I18N_CHANGED : "I18N_CHANGED",
    LANDING_PAGE_CHANGED : "LANDING_PAGE_CHANGED",

}

export function getPayLoadObject(definition) {
    switch (definition) {
        case DEFINITION.USER_LOOGED_IN : return {user : undefined}; //set user = Name of logged in user
        case DEFINITION.USER_LOOGED_OUT : return {user : undefined}; //set user = undefined (indicated no logged-in user)
        case DEFINITION.I18N_CHANGED : return {i18n : null};
        case DEFINITION.LANDING_PAGE_CHANGED : return {page : undefined}; //set page = logical name to be display in ApplicationHeader ... see AppConstants.LANDING_PAGE_[XYZ]
        default:
          return {undefined : true};
      }
}
