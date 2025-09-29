package restserver.objects.tree.generator;

import java.io.File;
import java.nio.file.Path;

import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleDirectedGraph;

import common.utils.StringUtils;
import common.utils.jgrapht.pojo.PojoJGraphtTreeNode;
import common.utils.jgrapht.pojo.PojoPayloadUiControl;
import common.utils.jgrapht.transformer.JGraphTParentChildrenPopulator;
import restserver.objects.tree.object.payload.PojoFilePayload;
import server.app.model.codetable.CT_carbonplay_VertexTypes;

public class DataGeneratorForDirectory {

	/**
	 * This method creates a tree based on a Directory as startPoint and delivers the content as Tree
	 * @param p Starting Point of Directory Structure
	 * @return
	 * @throws Exception
	 */
	public static SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> gatherTree(Path p) throws Exception {


        // =========================================================
		// a) create tree as graph (Vertices & Edges) recursively
        // =========================================================

		SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph = new SimpleDirectedGraph<>(DefaultEdge.class);
		
		PojoJGraphtTreeNode pojoRoot = new PojoJGraphtTreeNode();
		walkDirectory(graph, p, p.toFile(), pojoRoot);
		
        // ==========================================
		// b) calculate parent and children
        // ==========================================

		JGraphTParentChildrenPopulator.calcParentIDAndChildrens(graph);

		return graph;
	}

	
	
	

	/**
	 * This method walks through files in root-directory recursively 
	 * @param graph SimpleDirectedGraph to populate
	 * @param root Root-Directory (with prefix which is always to be removed from filename)
	 * @param f current directory or file to handle
	 * @param pojo PojoTreeNode to populate
	 */
	private static void walkDirectory(SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph, Path root, File f, PojoJGraphtTreeNode pojo) {

		populatePojoWithFileData(root, f, pojo);
		graph.addVertex(pojo);

		
		File[] files = f.listFiles();
        if (files == null) return; // Could be due to permission issues

        //walk through childs
        for (File fChild : files) {

        	PojoJGraphtTreeNode pojoChild = new PojoJGraphtTreeNode();
        	
    		populatePojoWithFileData(root, fChild, pojoChild);
    		graph.addVertex(pojoChild);
    		
    		graph.addEdge(pojoChild, pojo);
        	
            if (fChild.isDirectory()) {
                walkDirectory(graph, root, fChild, pojoChild); // Recurse into sub-directory
            }
        }
    }	
	
	
	
	/**
	 * This method populates a PojoJGraphtTreeNode with 
	 * <ul>
	 * <li>Payload File</li>
	 * <li>Payload UiControl</li>
	 * </ul>
	 * @param root Root-Directory (with prefix which is always to be removed from filename)
	 * @param f File relative to RootPath
	 * @param pojo to populate
	 */
	private static void populatePojoWithFileData(Path root, File f, PojoJGraphtTreeNode pojo) {

		String id = f.getAbsolutePath();
		id = id.replaceFirst(root.toString(), "");
		id = id.replaceFirst(File.separator, "");

		//id = only relative path to root
		String input = f.getAbsolutePath();
		String marker = root.toString();
		int index = input.indexOf(marker);
		String label = (index != -1) ? input.substring(index + marker.length()) : input;
		String[] explode = StringUtils.explode(id, "/");
		if (explode.length != 0) {
			label = explode[explode.length-1];
		}
		
		
		pojo.setId(id);
		pojo.setLabel(label);
		pojo.setValue("");
		pojo.setChildren(new PojoJGraphtTreeNode[0]);
		PojoFilePayload pojoFilePayload = createPojoFilePayload(f);
		pojo.setPayload(pojoFilePayload);

		PojoPayloadUiControl pojoPayloadUiControl = new PojoPayloadUiControl();
		pojo.setUicontrol(pojoPayloadUiControl);
	}

	
	/**
	 * FrontEnds like Carbon require real Pojos to access File's information
	 * This method transfers required File Attributes for a file to a Pojo
	 * @param pFile Path to File
	 * @return PojoPayloadFile
	 */
	private static PojoFilePayload createPojoFilePayload(File f) {
		PojoFilePayload pojoFilePayload = new PojoFilePayload();
		pojoFilePayload.setFlagExists(f.exists());
		if (f.exists()) {
			pojoFilePayload.setFlagCanRead(f.canRead());
			pojoFilePayload.setFlagCanWrite(f.canWrite());
			pojoFilePayload.setFlagIsDirectory(f.isDirectory());
			pojoFilePayload.setFlagIsFile(f.isFile());
			pojoFilePayload.setFlagIsHidden(f.isHidden());
			pojoFilePayload.setLastModified(f.lastModified());
			pojoFilePayload.setLength(f.length());
			
			if (f.isDirectory()) {
				pojoFilePayload.setVertexType(CT_carbonplay_VertexTypes.TAXONOMY);
			} else {
				pojoFilePayload.setVertexType(CT_carbonplay_VertexTypes.NORMAL);
			}
		}
		return pojoFilePayload;
	}
	
	
	
	
}
