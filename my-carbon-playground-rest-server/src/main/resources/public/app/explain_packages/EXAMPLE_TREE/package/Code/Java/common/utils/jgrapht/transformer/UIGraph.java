package common.utils.jgrapht.transformer;

import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleDirectedGraph;

import common.utils.jgrapht.pojo.PojoJGraphtTreeNode;

public class UIGraph {

	private  SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph;
	PojoJGraphtTreeNode[] rootNodes;
	
	public UIGraph(SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph) {
		this.graph = graph;
		this.rootNodes = null;
	}

	// **************************************************
	//  Support Methods
	// **************************************************

	
	/**
	 * This method calculates partentIDs and children<br/><br/> 
	 * It is the <i>typically used method</i> to retrieve a PojoJGraphtTreeNode[],<br/>
	 * which is usable in Carbon's Tree View Component
	 * @return Identified root nodes
	 */
	public PojoJGraphtTreeNode[] getUIArray() {
		return this.getUIArray(false);
	}
	
	/**
	 * This method calculates partentIDs and children<br/><br/>
	 * It enforces the re-calculation
	 * @return Identified root nodes
	 */
	public PojoJGraphtTreeNode[] getRefreshedUIArray() {
		return this.getUIArray(true);
	}
	
	/**
	 * This method calculates partentIDs and children<br/><br/>
	 * This method re-calculates the result, if
	 * <ul>
	 * <li>not yet calculated</li>
	 * <li>re-calculation is enforced</li>
	 * </ul>
	 * @param enforce true = enforce re-calculation
	 * @return Identified root nodes
	 */
	public PojoJGraphtTreeNode[] getUIArray(boolean enforce) {
		if (rootNodes == null) {
			rootNodes = JGraphTParentChildrenPopulator.calcParentIDAndChildrens(graph);
		} else {
			if (enforce) {
				rootNodes = JGraphTParentChildrenPopulator.calcParentIDAndChildrens(graph);
			}
		}
		return rootNodes;
	}

	
	
	// **************************************************
	//  Getter and Setter
	// **************************************************
	
	public SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> getGraph() {
		return graph;
	}


	

}


