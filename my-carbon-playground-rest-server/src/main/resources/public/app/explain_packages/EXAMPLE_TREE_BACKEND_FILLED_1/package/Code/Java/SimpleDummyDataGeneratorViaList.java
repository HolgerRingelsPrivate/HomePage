package restserver.objects.tree.generator;

import java.util.HashMap;
import java.util.Map;

import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleDirectedGraph;

import common.utils.jgrapht.pojo.PojoJGraphtTreeNode;
import common.utils.jgrapht.pojo.PojoPayloadUiControl;
import common.utils.jgrapht.transformer.JGraphTParentChildrenPopulator;
import restserver.objects.tree.object.payload.PojoSimpleObjectPayload;

public class SimpleDummyDataGeneratorViaList {

	/**
	 * This method creates a tree based on a list with hierarchical information and delivers this as graph
	 * @return
	 * @throws Exception
	 */
	public static SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> gatherTree() throws Exception {

	    // =====================================================
		// a) create Pojos with hierarchical information inside
	    // =====================================================

		HashMap<String, PojoJGraphtTreeNode> hashMap = new HashMap<String, PojoJGraphtTreeNode>();
		
		//please remember: the key of the hashmap is the id of the node (3rd parameter)
		hashMap.put( "1", createNode("A_id", 	"A",   "1", null));
		hashMap.put( "2", createNode("B_id", 	"B",   "2", null));
		hashMap.put( "3", createNode("A1_id", 	"A1",  "3",  "1"));
		hashMap.put( "4", createNode("A2_id", 	"A2",  "4",  "1"));
		hashMap.put( "5", createNode("B1_id", 	"B1",  "5",  "2"));
		hashMap.put( "6", createNode("B2_id", 	"B2",  "6",  "2"));
		hashMap.put( "7", createNode("x_id", 	"x",   "7",  "4"));
		
		hashMap.put( "8", createNode("y_id", 	"y",   "8",  "4")); // these 2 nodes:  create the same payload (entityID = "y"),
		hashMap.put( "9", createNode("y_id", 	"y",   "9",  "5")); // but for different TreeNode-iDs 
																	// (to add "y_label" 1x to "A2" and  1x to "B1")

		hashMap.put("10", createNode("ya_id", 	"ya", "10",  "6"));
		hashMap.put("11", createNode("yb_id", 	"yb", "11",  "6"));
		hashMap.put("12", createNode("za_id",	"za", "12",  "6"));
		hashMap.put("13", createNode("zb_id",	"zb", "13",  "3"));
		hashMap.put("14", createNode("zc_id",	"zc", "14",  "3"));
		
		hashMap.put("15", createNode("C_id",	"C",  "15", null));
		hashMap.put("16", createNode("D_id",	"D",  "16", null));

		
        // ====================================================
		// b) create tree as graph (Vertices & Edges)
        // ====================================================

		SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph = new SimpleDirectedGraph<>(DefaultEdge.class);

		//create all Vertices
		for (Map.Entry<String, PojoJGraphtTreeNode> entry : hashMap.entrySet()) {
			PojoJGraphtTreeNode vertex = entry.getValue();
			graph.addVertex(vertex); 
        }
		
		//create all Edges
		for (Map.Entry<String, PojoJGraphtTreeNode> entry : hashMap.entrySet()) {
			PojoJGraphtTreeNode vertex = entry.getValue();
			if (vertex.getParentId() != null) {
				PojoJGraphtTreeNode vertexParent = hashMap.get(vertex.getParentId());
				graph.addEdge(vertex, vertexParent);
			}
        }

        // ====================================================
		// c) calculate children
        // ====================================================

		JGraphTParentChildrenPopulator.calcParentIDAndChildrens(graph);

		return graph;

	}



	
	/**
	 * This method creates a Graph-Vertex ( = PojoJGraphtTreeNode ) which holds a payload with entity - information
	 * @param objectId ID of the Object
	 * @param objectLabel Label of the Object
	 * @param id Id of the Vertex
	 * @param parentId Id of Vertex's parent
	 * @return
	 */
	private static PojoJGraphtTreeNode createNode(String objectId, String objectLabel, String id, String parentId ) {
		
		//What is an entity ... PojoEntityPayload is the payload, which answers this question 
		PojoSimpleObjectPayload pojoObjectPayload = new PojoSimpleObjectPayload();
		pojoObjectPayload.setObjectID(objectId);
		pojoObjectPayload.setObjectLabel(objectLabel);
		
		PojoPayloadUiControl pojoPayloadUiControl = new PojoPayloadUiControl();
				
		PojoJGraphtTreeNode pojoTreeNode = new PojoJGraphtTreeNode();
		pojoTreeNode.setLabel(objectLabel);
		pojoTreeNode.setPayload(pojoObjectPayload);
		pojoTreeNode.setUicontrol(pojoPayloadUiControl);
		
		//set parent information
		pojoTreeNode.setId(id);
		pojoTreeNode.setParentId(parentId);
		return pojoTreeNode;
	}

}
