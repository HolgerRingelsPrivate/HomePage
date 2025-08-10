package common.utils.jgrapht.pojo;

public class PojoPayloadUiControl {

	boolean visible;  
	boolean expanded;
	
	/**
	 * This method creates the PojoPayloadUiControl with this standard settings
	 * <ul>
	 * <li>Vertex is not expanded</li>
	 * </ul> 
	 * Please use setter()-Methods to modify this Pojo after creating the instance
	 */
	public PojoPayloadUiControl() {
		super();
		this.visible = true;     
		this.expanded = false;    
	}

	public boolean isExpanded() {
		return expanded;
	}

	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}

	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}
	
	
	
}
