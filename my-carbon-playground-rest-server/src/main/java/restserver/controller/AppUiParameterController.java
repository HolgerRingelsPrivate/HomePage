package restserver.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import common.model.pojo.keyval.config.PojoKeyVal;
import restserver.controller.processors.UiParamsProviderProcessor;

@RestController
public class AppUiParameterController {

	@CrossOrigin
	@RequestMapping(method=RequestMethod.GET, value="/Common/UI/params")
	public ResponseEntity<Object>  deliverI18n() {
		
		UiParamsProviderProcessor uiParamsProviderProcessor = new UiParamsProviderProcessor();
		PojoKeyVal pojoUiParams = uiParamsProviderProcessor.getUiParams();
		
		ResponseEntity<Object> responseEntity 
		= new ResponseEntity<Object>(pojoUiParams, HttpStatus.OK);
		
		return responseEntity;

		
	}

}
