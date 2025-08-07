package restserver.controller;

import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleDirectedGraph;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import common.constants.Constants_CT_ErrorCodes;
import common.model.pojo.PojoErrorResult;
import common.utils.jgrapht.helper.JGraphTListToTreeTransformer;
import common.utils.jgrapht.pojo.PojoJGraphtTreeNode;
import restserver.objects.tree.generator.SimpleDummyDataGenerator;

@RestController
public class TreeController {

	// *************************
	// * Approach 1 
	// ************************************************************************************************************************
	public static final String EXAMPLE_TREE_APPROACH_1 = "/Example/Tree";
	// ************************************************************************************************************************
	/**
	 * This method retrieves a tree of all entities related to a Profile<br/>
	 * @param profileID Profile's ID  
	 * @return Tree's Root-Elements
	 */
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, value = EXAMPLE_TREE_APPROACH_1)
	public ResponseEntity<Object> doGetModelEntitiesDirect() {

		String endPointInfo = EXAMPLE_TREE_APPROACH_1 + " GET"; 

		Logger logger = LoggerFactory.getLogger(TreeController.class);
		logger.info("");
		logger.info(endPointInfo);
		logger.info("");

		ResponseEntity<Object> result = null;

		try {
			//========== >

			//get data as Graph without any edges
			SimpleDirectedGraph<PojoJGraphtTreeNode, DefaultEdge> graph = SimpleDummyDataGenerator.gatherEntitiesTree();

			//identify root-nodes
			PojoJGraphtTreeNode[] array = JGraphTListToTreeTransformer.getTreeRootNodes(graph);

			//<==========

			result =  new ResponseEntity<>(array,HttpStatus.OK);

			ResponseEntity<Object> responseEntity 
			= new ResponseEntity<Object>(result, HttpStatus.OK);
			return responseEntity;		

		} catch (Exception e) {
			logger.error("", e);
			PojoErrorResult pojoErrorResult = new PojoErrorResult("", Constants_CT_ErrorCodes.NO_ERROR_CODE, e);
			ResponseEntity<Object> responseEntity 
			= new ResponseEntity<Object>(pojoErrorResult, HttpStatus.INTERNAL_SERVER_ERROR);
			return responseEntity;		
		}
	
	}

	
	
}
