package tools.development;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.swing.Box.Filler;

import org.apache.commons.io.FileUtils;
import org.yaml.snakeyaml.extensions.compactnotation.PackageCompactConstructor;

import common.utils.ZipUtil;

public class CreatePackageZips {
	
	public static void main(String[] args) {
		
		String absolutePath = new File(".").getAbsolutePath();
		String sProjectPath = absolutePath.replace("/.", "");
		Path pExplainPackages = Paths.get(sProjectPath, "src/main/resources/public/app/explain_packages");		
		buildZips(pExplainPackages);
	}
	
	/**
	 * This method helps to create content in src/main/resources/public/app/explain_packages<br/>
	 * What this method does:
	 * <ul>
	 * <li>Walk through all subdirectories of explain_packages</li>
	 * <li>Pickup content of Package from [subdirectory]/package</li>
	 * <li>provide a zip-file with this content into [subdirectory]/zip</li>
	 * <li>Name this file: [subdirectory].zip</li>
	 * </ul>
	 * @param pExplainPackages RootPath of Explain Packages
	 * 
	 */	
	private static void buildZips(Path pExplainPackages) {
		
		String[] list = pExplainPackages.toFile().list();
		for (String packageId : list) {
			Path packagePath = Paths.get(pExplainPackages.toString(), packageId);
			
			boolean indIsAPackage = isPackagePathAPackage(packagePath);

			
			if (indIsAPackage) {

				System.out.println();
				System.out.println(packagePath.toString() + " is a package");
				System.out.println("Fill zip-directory with fresh content of package");

				System.out.print(" - grant Empty Zip Directory ...");
				Path pZipDirectory = grantEmptyZipDirectory(packagePath);
				
				if (pZipDirectory != null) {

					System.out.println("OK");
					
					Path packageDirPath = Paths.get(packagePath.toString(), "package");
					Path zipFilePath = Paths.get(packagePath.toString(), "zip", packageId+ ".zip");
					System.out.print("creating " + packageId+ ".zip");
					try {
						System.out.println("OK");
						ZipUtil.addFilesToZip(packageDirPath .toFile(), zipFilePath.toFile());
					} catch (Exception e) {
						System.err.println("FAILED");
						e.printStackTrace();
					}

				}
				
				else {
					System.err.println("NOT OK");
				}

			}

		}
		
	}
	
	/**
	 * This method checks, if a packagePath identifies a directory, which holds a sub-directory named 'package'
	 * @param packagePath
	 * @return
	 */
	private static boolean isPackagePathAPackage(Path packagePath) {
		
		File packageFile = packagePath.toFile();

		//if packagePath does not identify a directory, then return false
		if (!packageFile.isDirectory()) { return false; }

		
		//check, if the directory has a sub-directory called 'package'
		boolean indPackageDirAvailable = false;

		String[] packageEntries = packagePath.toFile().list();
		for (String entry : packageEntries) {
			
			Path path = Paths.get(packagePath.toString(), entry);
			
			if ( "package".equals(entry) && path.toFile().isDirectory() ) {
				indPackageDirAvailable = true;
			}
		}
		
		//if the sub-directory called 'package' is available, then return true
		if (indPackageDirAvailable) {
			return true;
		} else {
			return false;
		}
		
	}


	
	/**
	 * This method grants an empty directory zip within Package Directory 
	 * @param packagePath identifies the package directory
	 * @return Path of empty zip-directory or null (if it could mot be granted)
	 */
 	private static Path grantEmptyZipDirectory(Path packagePath) {

		//check, if the directory has a sub-directory called 'zip'

		String[] packageEntries = packagePath.toFile().list();

		boolean indZipDirAvailable = false;
		for (String entry : packageEntries) {

			Path path = Paths.get(packagePath.toString(), entry);
			
			if ( "zip".equals(entry) && path.toFile().isDirectory() ) {
				indZipDirAvailable = true;
			}
		}

		
		if (indZipDirAvailable) {
			
			//zip-directory has been found in packagePath
			Path path = Paths.get(packagePath.toString(), "zip");
			try {
				FileUtils.cleanDirectory(path.toFile());
				return path;
			} catch (Exception e) {
				return null;
			}
		} else {
			
			//zip-directory has not been found in packagePath
			Path path = Paths.get(packagePath.toString(), "zip");
			boolean indCreated = path.toFile().mkdirs();
			if (indCreated) {
				return path; 
			} else {
				return null;
			}
		}
		
//		//zip-directory has been found in packagePath
//		try {
//			FileUtils.cleanDirectory(path.toFile());
//		} catch (Exception e) {
//			return path;			}
//		
//		
//	} else {
//		
//		boolean indCreated = path.toFile().mkdirs();
//		if (!indCreated) {
//			throw new IOException("Directory could not be created: " + path.toString());
//		}
		
		
	}
	
}
