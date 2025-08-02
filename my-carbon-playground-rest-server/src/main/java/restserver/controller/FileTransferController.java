package restserver.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import common.model.rest.controller.ModelFileTranfserController;

@RestController
public class FileTransferController extends ModelFileTranfserController {

	private static final String URI_METHOD_GET 	= "GET  : ";
	private static final String URI_METHOD_POST = "POST : ";

	private static final String THIS_PATH_SINGLE_FILE_UPLOAD_CALL   = "Common/file/upload"; 
	private static final String THIS_PATH_SINGLE_FILE_DOWNLOAD_CALL = "Common/file/download/{fileID}"; 

	@CrossOrigin
	@RequestMapping(method=RequestMethod.POST, value=THIS_PATH_SINGLE_FILE_UPLOAD_CALL)
    public ResponseEntity<Object> uploadFile(
			@RequestHeader(value = "appHeaderMetaData", required = false) String metaData, 
			@RequestHeader(value = "appHeaderProcessId" , required = false) String processId,
    		@RequestParam("file_0") MultipartFile file
    		) {

		this.systemOutRessourceIndentifier(URI_METHOD_POST, THIS_PATH_SINGLE_FILE_UPLOAD_CALL);

		return this.doFileUpload(file);
		
	}		
	



		@CrossOrigin
		@RequestMapping(method=RequestMethod.GET, value=THIS_PATH_SINGLE_FILE_DOWNLOAD_CALL)

	    public ResponseEntity<Resource> downloadFile(
				@RequestHeader(value = "appHeaderMetaData", required = false) String metaData, 
				@RequestHeader(value = "appHeaderProcessId" , required = false) String processId,
	    		@PathVariable String fileID
	    		) {
			
			this.systemOutRessourceIndentifier(URI_METHOD_GET, THIS_PATH_SINGLE_FILE_DOWNLOAD_CALL + "/" + fileID);

			return this.doFileDownload(fileID);
	    }	
	
	

	
	
    
    

}
