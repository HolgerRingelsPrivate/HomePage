package common.utils.jgrapht.pojo;

import java.util.UUID;

/**
 * This class represents a Vertex in a SimpleDirectedGraph, which can also be used
 * in Carbon's TreeView
 */
public class PojoJGraphtTreeNode extends PojoJGraphtVertex{

	private String label; 	    		//mandatory
	private String value;     			//optional: set to null for NO Value
	private String parentId;  			//optional: set to null for 'no parent'
	  
	private Object payload;   			// any kind of Pojo with relevant data

	private PojoPayloadUiControl uicontrol; //enable the backend to set particular front end behavior
	
	PojoJGraphtTreeNode[] children;     // mandatory (required for technologies similar to IBM Carbon
										// set to empty array, if there are no children 
	
	//having a root is a natural behavior of a tree
	public static final String ROOT_ID = "";  
	
	/**
	 * Constructor
	 */
	public PojoJGraphtTreeNode() {
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

	
	
	public PojoPayloadUiControl getUicontrol() {
		return uicontrol;
	}

	public void setUicontrol(PojoPayloadUiControl uicontrol) {
		this.uicontrol = uicontrol;
	}

	public PojoJGraphtTreeNode[] getChildren() {
		return children;
	}

	public void setChildren(PojoJGraphtTreeNode[] children) {
		this.children = children;
	}
	
	
	
}
