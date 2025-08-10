package restserver.controller;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import common.folder.director.CommonFileDownloadController;
import common.service.ServiceFactory;
import common.service.ServiceLocator;
import common.service.app.access.IAppDirectoryService;

@RestController
public class ExplainDocumentDeliverController extends CommonFileDownloadController {

	// ************************************************************************************************************************
	public static final String EXPLAIN_PACKAGE_DELIVER = "/Explain/Package/Deliver/{identification}";
	// ************************************************************************************************************************
	/**
	 * This method delivers a Documentation-Package (typically a zip-file), which
	 * <ul>
	 * <li>explains a Topic or an Example</li>
	 * <li>contains sources</li>
	 * </ul> 
	 * @param identification of Package (see Codetable CT_carbonplay_TopicsAndExamples)  
	 * @return a file download
	 */
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, value = EXPLAIN_PACKAGE_DELIVER)
	public ResponseEntity<Resource> doGetPackage(
			@PathVariable String identification,
			@RequestHeader(value = "appHeaderMetaData", required = false) String metaData, 
			@RequestHeader(value = "appHeaderProcessId" , required = false) String processId
			) {

		try {

			ServiceLocator sl = ServiceFactory.getInstance().getServiceLocator();
			IAppDirectoryService appDirectoryService = sl.getAppDirectoryService();
			Path pRoot = appDirectoryService.getAppDirectory("explain_packages");
			Path pExampleDir = Paths.get(pRoot.toString(), identification, "zip");
			File file = pExampleDir.toFile();
			String[] list = file.list();
			
			Path pExampleFile = Paths.get(pRoot.toString(), identification, "zip", list[0]);
			
			ResponseEntity<Resource> doFileDownload = this.doFileDownload(pExampleFile);
			return doFileDownload;

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
		
	}
}
