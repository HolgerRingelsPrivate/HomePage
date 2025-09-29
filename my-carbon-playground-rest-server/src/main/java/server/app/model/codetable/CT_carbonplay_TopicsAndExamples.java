package server.app.model.codetable;

public final class CT_carbonplay_TopicsAndExamples {

	/** CODETABLE: carbonplay_TopicsAndExamples **/
	public static final String CODETABLE = "carbonplay_TopicsAndExamples";
	
	/** DEFAULTCODE=null **/
	public static final String DEFAULTCODE = null;

//
// Access to Codes (via Java)
//
	/**
	 * Code 'EXAMPLE_BUTTONS' = Value 'Buttons'
	 */
	public static final String EXAMPLE_BUTTONS = "EXAMPLE_BUTTONS";

	/**
	 * Code 'EXAMPLE_TREE' = Value 'Topic: Tree'
	 */
	public static final String EXAMPLE_TREE = "EXAMPLE_TREE";

	/**
	 * Code 'EXAMPLE_TREE_SELF_FILLED' = Value 'Tree (via Java Script filled)'
	 */
	public static final String EXAMPLE_TREE_SELF_FILLED = "EXAMPLE_TREE_SELF_FILLED";

	/**
	 * Code 'EXAMPLE_TREE_BACKEND_FILLED_1' = Value 'Tree (filled by Backend)'
	 */
	public static final String EXAMPLE_TREE_BACKEND_FILLED_1 = "EXAMPLE_TREE_BACKEND_FILLED_1";

	/**
	 * Code 'EXAMPLE_TREE_BACKEND_FILLED_2' = Value 'Tree (filled by Backend-List)'
	 */
	public static final String EXAMPLE_TREE_BACKEND_FILLED_2 = "EXAMPLE_TREE_BACKEND_FILLED_2";

	/**
	 * Code 'EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY' = Value 'Tree (filled from Explain-Directory)'
	 */
	public static final String EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY = "EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY";

	/**
	 * Code 'EXAMPLE_TREE_FEATURED_UI' = Value 'Tree (with handling options)'
	 */
	public static final String EXAMPLE_TREE_FEATURED_UI = "EXAMPLE_TREE_FEATURED_UI";

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
		if (code.equals("EXAMPLE_BUTTONS")) { return "Buttons";}
		if (code.equals("EXAMPLE_TREE")) { return "Topic: Tree";}
		if (code.equals("EXAMPLE_TREE_SELF_FILLED")) { return "Tree (via Java Script filled)";}
		if (code.equals("EXAMPLE_TREE_BACKEND_FILLED_1")) { return "Tree (filled by Backend)";}
		if (code.equals("EXAMPLE_TREE_BACKEND_FILLED_2")) { return "Tree (filled by Backend-List)";}
		if (code.equals("EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY")) { return "Tree (filled from Explain-Directory)";}
		if (code.equals("EXAMPLE_TREE_FEATURED_UI")) { return "Tree (with handling options)";}
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
		if (code.equals("EXAMPLE_BUTTONS")) { return "";}
		if (code.equals("EXAMPLE_TREE")) { return "";}
		if (code.equals("EXAMPLE_TREE_SELF_FILLED")) { return "";}
		if (code.equals("EXAMPLE_TREE_BACKEND_FILLED_1")) { return "";}
		if (code.equals("EXAMPLE_TREE_BACKEND_FILLED_2")) { return "";}
		if (code.equals("EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY")) { return "";}
		if (code.equals("EXAMPLE_TREE_FEATURED_UI")) { return "";}
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
		if (code.equals("EXAMPLE_BUTTONS")) { return true; }
		if (code.equals("EXAMPLE_TREE")) { return true; }
		if (code.equals("EXAMPLE_TREE_SELF_FILLED")) { return true; }
		if (code.equals("EXAMPLE_TREE_BACKEND_FILLED_1")) { return true; }
		if (code.equals("EXAMPLE_TREE_BACKEND_FILLED_2")) { return true; }
		if (code.equals("EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY")) { return true; }
		if (code.equals("EXAMPLE_TREE_FEATURED_UI")) { return true; }
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
		sResult = sResult + "EXAMPLE_BUTTONS" + delimiter;
		sResult = sResult + "EXAMPLE_TREE" + delimiter;
		sResult = sResult + "EXAMPLE_TREE_SELF_FILLED" + delimiter;
		sResult = sResult + "EXAMPLE_TREE_BACKEND_FILLED_1" + delimiter;
		sResult = sResult + "EXAMPLE_TREE_BACKEND_FILLED_2" + delimiter;
		sResult = sResult + "EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY" + delimiter;
		sResult = sResult + "EXAMPLE_TREE_FEATURED_UI" + delimiter;
		sResult = sResult.substring(0, sResult.length() - delimiter.length());
		return sResult;
		
	}



}
