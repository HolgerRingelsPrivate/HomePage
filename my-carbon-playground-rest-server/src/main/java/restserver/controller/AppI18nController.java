package restserver.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import common.model.pojo.keyval.config.PojoKeyVal;
import restserver.controller.processors.I18nProviderProcessor;

@RestController
public class AppI18nController {
	
	@CrossOrigin
	@RequestMapping(method=RequestMethod.GET, value="/Common/I18n")
	public ResponseEntity<Object>  deliverI18n() {
		
		I18nProviderProcessor processor = new I18nProviderProcessor();
		PojoKeyVal pojoI18nConfiguration = processor.getI18nConfiguration();
		
		ResponseEntity<Object> responseEntity 
		= new ResponseEntity<Object>(pojoI18nConfiguration, HttpStatus.OK);
		
		return responseEntity;

		
	}

}