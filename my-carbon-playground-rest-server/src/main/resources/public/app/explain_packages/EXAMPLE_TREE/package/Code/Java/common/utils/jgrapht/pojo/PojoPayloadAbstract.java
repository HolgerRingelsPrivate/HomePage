package common.utils.jgrapht.pojo;

public abstract class PojoPayloadAbstract {

	String clazz; //Identification of the PayLoad Class
	String id;
	String name; //visual label for the object
	String vertexType;   //e.g. used to distinguish between Taxonomy and Leaves
						 //typically filled by a CodeTable
	
	public PojoPayloadAbstract() {
		this.setClazz(this.getClass().getName());
	}

	public String getClazz() {
		return clazz;
	}

	public void setClazz(String clazz) {
		this.clazz = clazz;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getVertexType() {
		return vertexType;
	}

	public void setVertexType(String vertexType) {
		this.vertexType = vertexType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
}
