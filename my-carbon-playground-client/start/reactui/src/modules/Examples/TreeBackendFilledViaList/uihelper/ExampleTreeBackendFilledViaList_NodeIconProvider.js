import { Unknown, Folder, Cube } from "@carbon/icons-react";

export function getIcon(node) {
  try {
    if (node.children.length !== 0) {
      return Folder;  
    } else {
      return Cube;  
    }
  } catch (error) {
    return Unknown;  
  }
  
}