package common.utils.jgrapht.pojo;

/**
 * This is the simples (minimal) implementation of a JGraphT Vertex
 */
public class PojoJGraphtVertex {

	protected String id; 			//mandatory (filled string ... not ""

	  
	  
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	
	
	//optional, but important for Comparing and HashSet/Use in Graphs
	  
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PojoJGraphtVertex)) return false;
        PojoJGraphtVertex vertex = (PojoJGraphtVertex) o;
        return id.equals(vertex.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public String toString() {
        return id;
    }
    
}
