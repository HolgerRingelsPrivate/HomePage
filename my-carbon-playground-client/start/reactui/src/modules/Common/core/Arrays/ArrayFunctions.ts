/* **************************************************************************************
 *
 * Licensed Materials - Property of IBM
 *
 * (C) Copyright IBM Corp. 2025
 * All Rights Reserved
 *
 * US Government Users Restricted Rights -Use, duplication or
 *
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 ************************************************************************************** */


/* +------------------------------------------------------------------------------- */
/* | Base Functions to handle Arrays   */
/* +------------------------------------------------------------------------------- */

/**
 * This method adds a string to a string-array, if the string does not yet exist within the array
 * @param array 
 * @param s 
 * @returns 
 */
export function addStringUnique(array: string[], s: string): string[] {
  if (!array.includes(s)) {
    array.push(s);
  }
  return array;
}
