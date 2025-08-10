package restserver.objects.tree.object.payload;

import common.utils.jgrapht.pojo.PojoPayloadAbstract;

public class PojoFilePayload extends PojoPayloadAbstract {

	//Object related attributes
	boolean flagExists;
	boolean flagCanRead;
	boolean flagCanWrite;
	boolean flagIsDirectory;
	boolean flagIsFile;
	boolean flagIsHidden;
	long lastModified;
	long length;
	
	
	public boolean isFlagExists() {
		return flagExists;
	}
	public void setFlagExists(boolean flagExists) {
		this.flagExists = flagExists;
	}
	public boolean isFlagCanRead() {
		return flagCanRead;
	}
	public void setFlagCanRead(boolean flagCanRead) {
		this.flagCanRead = flagCanRead;
	}
	public boolean isFlagCanWrite() {
		return flagCanWrite;
	}
	public void setFlagCanWrite(boolean flagCanWrite) {
		this.flagCanWrite = flagCanWrite;
	}
	public boolean isFlagIsDirectory() {
		return flagIsDirectory;
	}
	public void setFlagIsDirectory(boolean flagIsDirectory) {
		this.flagIsDirectory = flagIsDirectory;
	}
	public boolean isFlagIsFile() {
		return flagIsFile;
	}
	public void setFlagIsFile(boolean flagIsFile) {
		this.flagIsFile = flagIsFile;
	}
	public boolean isFlagIsHidden() {
		return flagIsHidden;
	}
	public void setFlagIsHidden(boolean flagIsHidden) {
		this.flagIsHidden = flagIsHidden;
	}
	public long getLength() {
		return length;
	}
	public void setLength(long length) {
		this.length = length;
	}
	public long getLastModified() {
		return lastModified;
	}
	public void setLastModified(long lastModified) {
		this.lastModified = lastModified;
	}
		
}
