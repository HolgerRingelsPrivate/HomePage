package common.utils.jgrapht.exceptions;

public class InconsistentHierarchyException extends Exception {
	
    private static final long serialVersionUID = 1L;

	public InconsistentHierarchyException() {
        super("Edge does not match SimpleDirectedGraph's Rules");
    }
	
}