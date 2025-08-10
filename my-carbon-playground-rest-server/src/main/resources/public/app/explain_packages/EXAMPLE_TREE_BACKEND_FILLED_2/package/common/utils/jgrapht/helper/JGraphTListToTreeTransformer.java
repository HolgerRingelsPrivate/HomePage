package common.utils.jgrapht.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleDirectedGraph;

import common.utils.jgrapht.exceptions.InconsistentHierarchyException;
import common.utils.jgrapht.pojo.PojoJGraphtTreeNode;

public class JGraphTListToTreeTransformer {

	/**
	 * This method handles a SimpleDirectedGraph, which is expected to NOT have any Edges defined yet<br/>
	 * IF there are already Edges within the graph, THEN they are completely removed and re-generated<br/><br/>
	 * This method
	 * <ul>
	 * <li>(re-) builds Edges based on the hierarchical information of the Nodes (field: parentId)</li>
	 * <li>(re-) builds children[] property in Parent-Nodes</li>
	 * </ul>
	 * @param graph
	 * @throws InconsistentHierarchyException if inconsistent hierarchical information is found
	 */
	public static void transformToTree(SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph) throws InconsistentHierarchyException {

		// remove unexpected existing edges
        graph.removeAllEdges(graph.edgeSet());
        
	    //map: id as string => PojoJGraphtTreeNode
		HashMap<String, PojoJGraphtTreeNode> map = convertGraphToMapOfVertices(graph);

		//(Re-)Build Edges based on the hierarchical information of the Nodes (field: parentId)
		{
			
			Set<String> nodeIDs = map.keySet();
			for (String nodeId : nodeIDs) {
				PojoJGraphtTreeNode pojoNode = map.get(nodeId);
				
				//IF there is hierarchical information in the node ?
				if (pojoNode.getParentId() != null) {
					
					// THEN set Edges in the graph
					PojoJGraphtTreeNode pojoParentNode = map.get(pojoNode.getParentId());
					
					DefaultEdge addedEdge = graph.addEdge(pojoNode, pojoParentNode);
					
					//check, if the edge could be properly added 
					//for example edges causing loops would not be added 
					//  => this means: The input information is not valid
					//       => on invalid input information this method throws an Exception
					//
					// an edge within a SimpleDirectedGraph points from node to parent:
					if (addedEdge == null) {
						throw new InconsistentHierarchyException();
					}
				}
			}
			
		}

		//(Re-)Build Children[] property in Parent-Nodes
		{

			Set<String> nodeIDs = map.keySet();
			for (String nodeId : nodeIDs) {
				PojoJGraphtTreeNode pojoNode = map.get(nodeId);

				ArrayList<PojoJGraphtTreeNode> alChilds = new ArrayList<PojoJGraphtTreeNode>();
				for (DefaultEdge edge : graph.incomingEdgesOf(pojoNode)) {
					PojoJGraphtTreeNode pojoChild 	= graph.getEdgeSource(edge);
					alChilds.add(pojoChild);
		        }
				PojoJGraphtTreeNode[] children = alChilds.toArray(new PojoJGraphtTreeNode[0]);
				pojoNode.setChildren(children);
			}		

		}


	}
	
	
	
	/**
	 * This method delivers the Root-Nodes of a graph.<br/> 
	 * This can be more than one Node (depending on the graph)<br/>
	 * Roots are identified as Nodes, which do not have a parentId<br/><br/>
	 * Note: This method is typically to be called after calling transformToTree()
	 * @param graph
	 * @return Array of aryRoots, which are identified as Roots
	 */
	public static PojoJGraphtTreeNode[] getTreeRootNodes(SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph) {
		
		ArrayList<PojoJGraphtTreeNode> roots = new ArrayList<PojoJGraphtTreeNode>();
	    //map: id as string => PojoJGraphtTreeNode
		HashMap<String, PojoJGraphtTreeNode> map = convertGraphToMapOfVertices(graph);

		//(Re-)Build Edges based on the hierarchical information of the Nodes (field: parentId)
		{
			
			Set<String> nodeIDs = map.keySet();
			for (String nodeId : nodeIDs) {
				PojoJGraphtTreeNode pojoNode = map.get(nodeId);
				
				//IF there is hierarchical information in the node ?
				if (pojoNode.getParentId() == null) {
					roots.add(pojoNode);
					
				}
			}
			
		}

		PojoJGraphtTreeNode[] aryRoots = roots.toArray(new PojoJGraphtTreeNode[0]);
		return aryRoots;
	}

	
	/**
	 * This method creates a HashMap (ID => PojoJGraphtTreeNode) based on a Graph.<br/>
	 * @param graph
	 * @return HashMap (ID => PojoJGraphtTreeNode)
	 */
	private static HashMap<String, PojoJGraphtTreeNode> convertGraphToMapOfVertices(SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph){
		
		HashMap<String, PojoJGraphtTreeNode> map = new HashMap<String, PojoJGraphtTreeNode>();
		
		PojoJGraphtTreeNode[] allVerticesInGraph = graph.vertexSet().toArray(new PojoJGraphtTreeNode[0]);
		for (int i = 0; i < allVerticesInGraph.length; i++) {
			PojoJGraphtTreeNode node = allVerticesInGraph[i];
			map.put(node.getId(), node);
		}
		return map;
	}

	
	/**
	 * This method adds an entry PojoJGraphtTreeNode to an existing array of PojoJGraphtTreeNode
	 * @param array Array of PojoJGraphtTreeNode, where a PojoJGraphtTreeNode is added to
	 * @param entry PojoJGraphtTreeNode to add
	 * @return
	 */
	public static PojoJGraphtTreeNode[] push(PojoJGraphtTreeNode[] array, PojoJGraphtTreeNode entry) {
		ArrayList<PojoJGraphtTreeNode> arrayNew = new ArrayList<PojoJGraphtTreeNode>();
		for (int i = 0; i < array.length; i++) {
			PojoJGraphtTreeNode node = array[i];
			arrayNew.add(node);
		}
		arrayNew.add(entry);
		PojoJGraphtTreeNode[] result = arrayNew.toArray(new PojoJGraphtTreeNode[0]);
		return result;
	}
	
}
