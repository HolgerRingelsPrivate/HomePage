package common.utils.jgrapht.transformer;

import java.util.ArrayList;
import java.util.Set;

import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleDirectedGraph;

import common.utils.jgrapht.pojo.PojoJGraphtTreeNode;

public class JGraphTParentChildrenPopulator {

	/**
	 * This method calculates partent_IDs and children[] as used by TreeViewer
	 * based on SimpleDirectedGraphs vertices and edges
	 * @param graph SimpleDirectedGraph based on Vertex = PojoJGraphtTreeNode, Edge = DefaultEdge
	 * @return an array of Vertices, which does not have a parent (these are the root-Nodes (there can be more than one)
	 */
	public static PojoJGraphtTreeNode[] calcParentIDAndChildrens(SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph) {

		ArrayList<PojoJGraphtTreeNode> roots = new ArrayList<PojoJGraphtTreeNode>();

		//loop over all known nodes (Vertices)
		for (PojoJGraphtTreeNode vertex : graph.vertexSet()) {

			// +----------------------------------------
			// | Calculate Parent IDs
			// +----------------------------------------
			
			//identify outgoing edges
			Set<DefaultEdge> outgoing = graph.outgoingEdgesOf(vertex);
			Object[] arrayOutgoing = outgoing.toArray();
			
			//is there any outgoing edge ?
			if (arrayOutgoing.length > 0) {
				
				//within a SimpleDirectedGraph there is only on outgoing edge:
				DefaultEdge edge = (DefaultEdge)arrayOutgoing[0];
				
				//find target of edge ( the parent )
				PojoJGraphtTreeNode parent = graph.getEdgeTarget(edge);
				
				//set current Vertex's parent id = id of parent
				vertex.setParentId(parent.getId());
			} else {
				
				//there is no outgoing edge ... ok... this Node is a root-Node
				roots.add(vertex);
			}
			
			// +----------------------------------------
			// | Calculate Children
			// +----------------------------------------

			//identify incoming edges
			Set<DefaultEdge> incoming = graph.incomingEdgesOf(vertex);
			Object[] arrayIncoming = incoming.toArray();

			//create children
			PojoJGraphtTreeNode[] children = new PojoJGraphtTreeNode[arrayIncoming.length];
			for (int i = 0; i < arrayIncoming.length; i++) {

				Object object = arrayIncoming[i];
				DefaultEdge edge = (DefaultEdge)object;
				
				//find source of edge ( the child )
				PojoJGraphtTreeNode child = graph.getEdgeSource(edge);

				children[i] = child;
				
			}
			
			vertex.setChildren(children);
			System.out.println();

		}
		
		PojoJGraphtTreeNode[] aryRoots = roots.toArray(new PojoJGraphtTreeNode[0]);
		return aryRoots;

		
	}

}
