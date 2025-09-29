package common.utils.jgrapht.pojo;

public class PojoPayloadUiControl {

	private boolean visible;    //is the Node visible ?
	private boolean expanded;   //is the Node expanded ?
	private boolean selectable; //is there a checkbox ?
	private boolean selected;   //is the checkbox checked ?
	

	/**
	 * This method creates the PojoPayloadUiControl with these standard settings
	 * <ul>
	 * <li>Vertex is visible</li>
	 * <li>Vertex is not expanded</li>
	 * <li>Vertex is selectable</li>
	 * <li>Vertex is not selected</li>
	 * </ul> 
	 * <b>Note:</b>
	 * <br/>
	 * <br/> These are the default-setting, when the tree is handed over to the client
	 * <br/> These settings are modified within Ui without turn-around (calling REST-Endpoints of the Server)
	 * <br/><br/><b>Please use</b> setter()-Methods to modify this Pojo after creating the instance
	 */	
	public PojoPayloadUiControl() {
		super();
		this.visible = true;     
		this.expanded = false;
		this.selectable = true;
		this.selected= false;
	}


	public boolean isVisible() {
		return visible;
	}


	public void setVisible(boolean visible) {
		this.visible = visible;
	}


	public boolean isExpanded() {
		return expanded;
	}


	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}


	public boolean isSelectable() {
		return selectable;
	}


	public void setSelectable(boolean selectable) {
		this.selectable = selectable;
	}


	public boolean isSelected() {
		return selected;
	}


	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	
	
}
