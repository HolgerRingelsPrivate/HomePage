package server.app.model.codetable;

public final class CT_carbonplay_VertexTypes {

	/** CODETABLE: carbonplay_VertexTypes **/
	public static final String CODETABLE = "carbonplay_VertexTypes";
	
	/** DEFAULTCODE=null **/
	public static final String DEFAULTCODE = null;

//
// Access to Codes (via Java)
//
	/**
	 * Code 'NORMAL' = Value 'Normal'
	 */
	public static final String NORMAL = "NORMAL";

	/**
	 * Code 'TAXONOMY' = Value 'Taxonomy'
	 */
	public static final String TAXONOMY = "TAXONOMY";

//
// Access to English Text (via Java) ... e.g. for REST-Service Implementation
//


	/**
	 * Get detals with english text for a code
	 * @param sDetails
	 * @param code
	 * @return
	 */
	public static final String detailsForCode(String sDetails, String code) {
		String sResult = sDetails + ":" + textForCode(code);
		return sResult;
	}

	/**
	 * Get english text for a code
	 * @param code
	 * @return
	 */
	public static final String textForCode(String code) {
		if (code == null) {
			return "";
		}
		if (code.equals("NORMAL")) { return "Normal";}
		if (code.equals("TAXONOMY")) { return "Taxonomy";}
		return "";
	}


	/**
	 * Get english text for a code
	 * @param code
	 * @return
	 */
	public static final String hintForCode(String code) {
		if (code == null) {
			return "";
		}
		if (code.equals("NORMAL")) { return "";}
		if (code.equals("TAXONOMY")) { return "";}
		return "";
	}


	/**
	 * Check if code is a valid code
	 * @param code
	 * @return
	 */
	public static final boolean isKnownCode(String code) {
		if (code == null) {
			return false;
		}
		if (code.equals("NORMAL")) { return true; }
		if (code.equals("TAXONOMY")) { return true; }
		return false;
	}



	/**
	 * Delivers a list of codes, delimited by delimiter
	 * @param delimiter if null, then commata is used, otherwise the selected delimter is used;
	 * @return
	 */
	public static final String deliverListOfCodes(String delimiter) {
		String sResult = "";
		if (delimiter == null) {
			delimiter = ",";
		}
		sResult = sResult + "NORMAL" + delimiter;
		sResult = sResult + "TAXONOMY" + delimiter;
		sResult = sResult.substring(0, sResult.length() - delimiter.length());
		return sResult;
		
	}



}
