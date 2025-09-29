export const OBJECT_DEF = {
    LOGGED_IN_USER              : "LOGGED_IN_USER",
    LOGGED_IN_USER_ROLES        : "LOGGED_IN_USER_ROLES",
    JSON_WEB_TOKEN              : "JSON_WEB_TOKEN",

    TREE_05                     : 'TREE_05',

}

//Values are delivered as JSON-String, which can be transformed into an Object
export function getDefaultJSON(definition) {
    switch (definition) {
        case OBJECT_DEF.LOGGED_IN_USER          : return '{"user":""}';
        case OBJECT_DEF.LOGGED_IN_USER_ROLES    : return '{"userroles":[]}'; //an array of roles - e.g. 'admin', '...', '...' ...
        case OBJECT_DEF.JSON_WEB_TOKEN          : return '{"token":""}';

        default:
          return '{"unknown":"definition"}';
      }
}

export function getDefaultObject(definition) {
    let json = getDefaultJSON(definition);
    let obj = JSON.parse(json);
    return obj;
}

