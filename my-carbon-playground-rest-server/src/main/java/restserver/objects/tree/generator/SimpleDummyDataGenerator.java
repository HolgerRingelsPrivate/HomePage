package restserver.objects.tree.generator;

import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleDirectedGraph;

import common.utils.jgrapht.pojo.PojoJGraphtTreeNode;
import common.utils.jgrapht.pojo.PojoPayloadUiControl;
import common.utils.jgrapht.transformer.JGraphTParentChildrenPopulator;
import restserver.objects.tree.object.payload.PojoSimpleObjectPayload;
import server.app.model.codetable.CT_carbonplay_VertexTypes;

public class SimpleDummyDataGenerator {

	/**
	 * This method creates a tree and delivers this as graph
	 * @return
	 * @throws Exception
	 */
	public static SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> gatherTree() throws Exception {

        // ===========================================
		// a) create Nodes of Pojos
        // ===========================================

		PojoJGraphtTreeNode pojoJGraphtTreeNode01 = createNode("A_id", 	"A", CT_carbonplay_VertexTypes.TAXONOMY);
		PojoJGraphtTreeNode pojoJGraphtTreeNode02 = createNode("B_id", 	"B", CT_carbonplay_VertexTypes.TAXONOMY);
		PojoJGraphtTreeNode pojoJGraphtTreeNode03 = createNode("A1_id", "A1", CT_carbonplay_VertexTypes.TAXONOMY);
		PojoJGraphtTreeNode pojoJGraphtTreeNode04 = createNode("A2_id", "A2", CT_carbonplay_VertexTypes.TAXONOMY);
		PojoJGraphtTreeNode pojoJGraphtTreeNode05 = createNode("B1_id", "B1", CT_carbonplay_VertexTypes.TAXONOMY);
		PojoJGraphtTreeNode pojoJGraphtTreeNode06 = createNode("B2_id", "B2", CT_carbonplay_VertexTypes.TAXONOMY);

		PojoJGraphtTreeNode pojoJGraphtTreeNode07 = createNode("x_id", 	"x", CT_carbonplay_VertexTypes.NORMAL);
		
		PojoJGraphtTreeNode pojoJGraphtTreeNode08 = createNode("y_id", 	"y", CT_carbonplay_VertexTypes.NORMAL); //these 2 nodes:  create the same payload (entityID = "y"),
		PojoJGraphtTreeNode pojoJGraphtTreeNode09 = createNode("y_id", 	"y", CT_carbonplay_VertexTypes.NORMAL); //but for different TreeNode-iDs (to add "y_label" 1x to "A2" and  1x to "B1")

		PojoJGraphtTreeNode pojoJGraphtTreeNode10 = createNode("ya_id", "ya",CT_carbonplay_VertexTypes.NORMAL);
		PojoJGraphtTreeNode pojoJGraphtTreeNode11 = createNode("yb_id", "yb",CT_carbonplay_VertexTypes.NORMAL);
		PojoJGraphtTreeNode pojoJGraphtTreeNode12 = createNode("za_id",	"za",CT_carbonplay_VertexTypes.NORMAL);
		PojoJGraphtTreeNode pojoJGraphtTreeNode13 = createNode("zb_id",	"zb",CT_carbonplay_VertexTypes.NORMAL);
		PojoJGraphtTreeNode pojoJGraphtTreeNode14 = createNode("zc_id",	"zc",CT_carbonplay_VertexTypes.NORMAL);

		PojoJGraphtTreeNode pojoJGraphtTreeNode15 = createNode("C_id",	"C",CT_carbonplay_VertexTypes.TAXONOMY);
		PojoJGraphtTreeNode pojoJGraphtTreeNode16 = createNode("D_id",	"D",CT_carbonplay_VertexTypes.TAXONOMY);

		
        // ==========================================
		// b) create tree as graph (Vertices & Edges)
        // ==========================================
		
		SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph = new SimpleDirectedGraph<>(DefaultEdge.class);

		graph.addVertex(pojoJGraphtTreeNode01); 
		graph.addVertex(pojoJGraphtTreeNode02); 
		graph.addVertex(pojoJGraphtTreeNode03); 
		graph.addVertex(pojoJGraphtTreeNode04); 
		graph.addVertex(pojoJGraphtTreeNode05); 
		graph.addVertex(pojoJGraphtTreeNode06); 
		graph.addVertex(pojoJGraphtTreeNode07); 
		graph.addVertex(pojoJGraphtTreeNode08); 
		graph.addVertex(pojoJGraphtTreeNode09); 
		graph.addVertex(pojoJGraphtTreeNode10); 
		graph.addVertex(pojoJGraphtTreeNode11); 
		graph.addVertex(pojoJGraphtTreeNode12); 
		graph.addVertex(pojoJGraphtTreeNode13); 
		graph.addVertex(pojoJGraphtTreeNode14); 
		graph.addVertex(pojoJGraphtTreeNode15); 
		graph.addVertex(pojoJGraphtTreeNode16); 
		
		graph.addEdge(pojoJGraphtTreeNode03, pojoJGraphtTreeNode01); 	// A1 ==> A 
		graph.addEdge(pojoJGraphtTreeNode04, pojoJGraphtTreeNode01);  	// A2 ==> A

		graph.addEdge(pojoJGraphtTreeNode05, pojoJGraphtTreeNode02); 	// B1 ==> B
		graph.addEdge(pojoJGraphtTreeNode06, pojoJGraphtTreeNode02);    // B2 ==> B

		graph.addEdge(pojoJGraphtTreeNode13, pojoJGraphtTreeNode03);    // zb ==> A1
		graph.addEdge(pojoJGraphtTreeNode14, pojoJGraphtTreeNode03);    // zc ==> A1

		graph.addEdge(pojoJGraphtTreeNode07, pojoJGraphtTreeNode04);    // x  ==> A2
		graph.addEdge(pojoJGraphtTreeNode08, pojoJGraphtTreeNode04);    // y  ==> A2

		graph.addEdge(pojoJGraphtTreeNode09, pojoJGraphtTreeNode05);    // y (double) ==> B1 
		
		graph.addEdge(pojoJGraphtTreeNode10, pojoJGraphtTreeNode06);    // y   ==> B2
		graph.addEdge(pojoJGraphtTreeNode11, pojoJGraphtTreeNode06);    // yb  ==> B2
		graph.addEdge(pojoJGraphtTreeNode12, pojoJGraphtTreeNode06);    // za  ==> B2
		
		
        // ==========================================
		// c) calculate parent and children
        // ==========================================

		JGraphTParentChildrenPopulator.calcParentIDAndChildrens(graph);

		return graph;

	}
	

	
	
	
	
	
	
	/**
	 * This method creates a Graph-Vertex ( = PojoJGraphtTreeNode ) which holds a payload with entity - information
	 * @param objectId ID of the Object
	 * @param objectLabel Label of the Object
	 * @param vertexType Code taken from CT_carbonplay_VertexTypes
	 * @return
	 */
	private static PojoJGraphtTreeNode createNode(String objectId, String objectLabel, String vertexType) {
		
		//What is an entity ... PojoEntityPayload is the payload, which answers this question 
		PojoSimpleObjectPayload pojoObjectPayload = new PojoSimpleObjectPayload();
		pojoObjectPayload.setId(objectId);
		pojoObjectPayload.setName(objectLabel);
		pojoObjectPayload.setVertexType(vertexType);
		
		PojoPayloadUiControl pojoPayloadUiControl = new PojoPayloadUiControl();
				
		PojoJGraphtTreeNode pojoTreeNode = new PojoJGraphtTreeNode();
		pojoTreeNode.setLabel(objectLabel);
		pojoTreeNode.setPayload(pojoObjectPayload);
		pojoTreeNode.setUicontrol(pojoPayloadUiControl);
		
		return pojoTreeNode;
	}
	
	
}
