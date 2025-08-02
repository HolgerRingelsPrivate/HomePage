package restserver.controller.processors;

import java.util.Vector;

import common.model.pojo.keyval.config.PojoKeyVal;
import common.service.ServiceFactory;
import common.service.ServiceLocator;
import common.service.env.PojoPomXMLContent;

public class UiParamsProviderProcessor {

	public PojoKeyVal getUiParams() {
		
		PojoKeyVal pojoResult = new PojoKeyVal();
		pojoResult.setKey("params");
		
		Vector<PojoKeyVal> vList = new Vector<PojoKeyVal>();

		{
			PojoKeyVal pojoKey = getPojoKeyValDevelopmentModus();
			vList.add(pojoKey);
		}
		

		
		
		PojoKeyVal[] aryList = vList.toArray(new PojoKeyVal[0]);
		pojoResult.setVal(aryList);
		
		return pojoResult;

	}
	
	PojoKeyVal getPojoKeyValDevelopmentModus() {

		ServiceLocator serviceLocator = ServiceFactory.getInstance().getServiceLocator();
		PojoPomXMLContent capturedPomXml = serviceLocator.getEnvironmentService().capturedPomXml();
		
		PojoKeyVal pojoKeyVal = new PojoKeyVal();
		pojoKeyVal.setKey("developmentModus");
		pojoKeyVal.setVal(Boolean.toString(capturedPomXml.isDevelopmentEnvironment()));
		
		return pojoKeyVal;
		}
	
}
