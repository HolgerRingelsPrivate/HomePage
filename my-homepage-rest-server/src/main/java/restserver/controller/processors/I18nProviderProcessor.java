package restserver.controller.processors;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;
import java.util.Vector;

import common.model.pojo.keyval.config.PojoKeyVal;
import common.service.ServiceFactory;
import common.service.ServiceLocator;
import common.service.app.access.IAppDirectoryService;
import common.utils.PropertiesReadUtil;
import common.utils.PropertiesToKeyValUtil;



public class I18nProviderProcessor {

	private static final String DEFAULT_LOCALE = "en";

	public PojoKeyVal getI18nConfiguration() {

		PojoKeyVal pojoResult = new PojoKeyVal();
		pojoResult.setKey("i18n");

		
		Vector<PojoKeyVal> vList = new Vector<PojoKeyVal>();
		
		{ // set default locale
			PojoKeyVal pojo = getDefaultLocale();
			vList.add(pojo);
		}
		{ // add locales
			PojoKeyVal pojo = getLocales();
			vList.add(pojo);
		}
		
		PojoKeyVal[] arySubConfigs = vList.toArray(new PojoKeyVal[0]);
		pojoResult.setVal(arySubConfigs);
		
		return pojoResult;
	}
	

	private PojoKeyVal getDefaultLocale() {
		PojoKeyVal pojoKeyVal = new PojoKeyVal();
		pojoKeyVal.setKey("default_locale");
		pojoKeyVal.setVal(DEFAULT_LOCALE);
		return pojoKeyVal;
		
	}
	
	private PojoKeyVal getLocales() {

		PojoKeyVal pojoKeyVal = new PojoKeyVal();
		pojoKeyVal.setKey("locales");
		
		ServiceLocator serviceLocator = ServiceFactory.getInstance().getServiceLocator();
		IAppDirectoryService appDirectoryService = serviceLocator.getAppDirectoryService();
		Path appDirectory = appDirectoryService.getAppDirectory("i18n/locales");
		//Path appDirectory = AppDirectoryUtils.getAppDirectory("i18n/locales");
		String[] locales = appDirectory.toFile().list();
		
		Vector<PojoKeyVal> vList = new Vector<PojoKeyVal>();
		for (String locale : locales) {
			PojoKeyVal pojo = new PojoKeyVal();
			pojo.setKey(locale);
			
			Path appLocale = Paths.get(appDirectory.toString(), locale, "translation.properties");
			Properties properties = PropertiesReadUtil.getProperties(appLocale);
			if (properties != null) {
				PojoKeyVal pjoKeyValFromProperties = PropertiesToKeyValUtil.getKeyValFromProperties(locale, properties);
				vList.add(pjoKeyValFromProperties);
			}
			

		}
		PojoKeyVal[] arySubConfigs = vList.toArray(new PojoKeyVal[0]);
		pojoKeyVal.setVal(arySubConfigs);
		
		return pojoKeyVal;

	}
	
}


