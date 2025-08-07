package restserver.objects.tree.object.payload;

import common.utils.jgrapht.pojo.PojoPayloadAbstract;

public class PojoSimpleObjectPayload extends PojoPayloadAbstract{

	private String objectLabel; //visual label for the object


	//this is the id of the object itself
 	//it is NOT identical with a Vertex-id,
 	//because one object can be represented by
 	//different Vertices
	
	private String objectID;


	public String getObjectLabel() {
		return objectLabel;
	}


	public void setObjectLabel(String objectLabel) {
		this.objectLabel = objectLabel;
	}


	public String getObjectID() {
		return objectID;
	}


	public void setObjectID(String objectID) {
		this.objectID = objectID;
	}
	
	
	
	
}
