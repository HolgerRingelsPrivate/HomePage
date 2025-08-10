package common.utils.jgrapht.pojo;

/**
 * This class represents a simples (minimal) implementation of a JGraphT Vertex
 * Any created Vertex-implementations with more information are expected to extend this class.
 */
public class PojoJGraphtVertex {

	protected String id; 			//mandatory (filled string ... not ""

	  
	  
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

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
