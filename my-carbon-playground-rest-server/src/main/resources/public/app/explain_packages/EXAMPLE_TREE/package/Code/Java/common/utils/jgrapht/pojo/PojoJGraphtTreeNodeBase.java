package common.utils.jgrapht.pojo;

import java.util.UUID;

/**
 * This is the implementation of a JGraphT Vertex, which is intended to handle hierarchies
 */
public class PojoJGraphtTreeNodeBase extends PojoJGraphtVertex {

	private String label; 	    		//mandatory
	private String value;     			//optional: set to null for NO Value
	private String parentId;  			//optional: set to null for 'no parent'
	  
	private Object payload;   			// any kind of Pojo with relevant data
	
	PojoJGraphtTreeNode[] children;     // mandatory (required for technologies similar to IBM Carbon
										// set to empty array, if there are no children 
	
	//having a root is a natural behavior of a tree
	public static final String ROOT_ID = "";  
	
	/**
	 * Constructor
	 */
	public PojoJGraphtTreeNodeBase() {
		super();
		this.id = UUID.randomUUID().toString();
		this.label = null;
		this.value = null;
		this.parentId = null;
		this.payload = null;
		this.children = new PojoJGraphtTreeNode[0];
	}

	// ---- GETTER und SETTER -----
	
	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public Object getPayload() {
		return payload;
	}

	public void setPayload(Object payload) {
		this.payload = payload;
	}

	public PojoJGraphtTreeNode[] getChildren() {
		return children;
	}

	public void setChildren(PojoJGraphtTreeNode[] children) {
		this.children = children;
	}


	@Override
	public String toString() {
		return " Label: " + label + " ### ID :" + id + " ### Value: " + value;
	}
	
		
}
