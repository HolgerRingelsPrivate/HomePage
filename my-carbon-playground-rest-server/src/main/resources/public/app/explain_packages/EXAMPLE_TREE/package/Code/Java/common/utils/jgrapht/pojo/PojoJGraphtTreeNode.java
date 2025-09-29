package common.utils.jgrapht.pojo;

/**
 * This is the implementation of a JGraphT Vertex, which is intended to handle hierarchies
 */
public class PojoJGraphtTreeNode extends PojoJGraphtTreeNodeBase {

	private PojoPayloadUiControl uicontrol; //enable the backend to set particular front end behavior
	
	

	public PojoPayloadUiControl getUicontrol() {
		return uicontrol;
	}



	public void setUicontrol(PojoPayloadUiControl uicontrol) {
		this.uicontrol = uicontrol;
	}



	@Override
	public String toString() {
		return " Label: " + super.getLabel() + " ### ID :" + super.getId() + " ### Value: " + super.getValue();
	}
	
	
	
}
