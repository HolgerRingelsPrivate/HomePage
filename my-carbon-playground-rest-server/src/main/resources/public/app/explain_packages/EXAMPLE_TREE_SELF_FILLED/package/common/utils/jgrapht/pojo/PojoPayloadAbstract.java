package common.utils.jgrapht.pojo;

public class PojoPayloadAbstract {

	// In Java, the term clazz is often used as a convention for referring to a variable that holds a reference to a Class<?> object 
	// (an instance of java.lang.Class). It is not a keyword or special feature—just a common naming pattern used by developers.
	
	String clazz; //Identification of the PayLoad Class

	public PojoPayloadAbstract() {
		this.setClazz(this.getClass().getName());
	}

	public String getClazz() {
		return clazz;
	}

	public void setClazz(String clazz) {
		this.clazz = clazz;
	}
}
