import * as FileSystem from 'expo-file-system';

// create file
export const createFile = async (fileUri, content) => {
    try {
      await FileSystem.writeAsStringAsync(fileUri, content);
      console.log('File created successfully!');
    } catch (error) {
      console.log('Error creating file:', error);
    }
};
  
  // Usage
const fileUri = FileSystem.documentDirectory + 'example.txt';
const content = 'This is the content of the file';
createFile(fileUri, content);

// read file
export const readFile = async (fileUri) => {
    try {
      const content = await FileSystem.readAsStringAsync(fileUri);
      console.log('File content:', content);
    } catch (error) {
      console.log('Error reading file:', error);
    }
  };
  
  // Usage
const fileUri2 = FileSystem.documentDirectory + 'example.txt';
readFile(fileUri2);

// update file
export const updateFile = async (fileUri, content) => {
    try {
      await FileSystem.writeAsStringAsync(fileUri, content);
      console.log('File updated successfully!');
    } catch (error) {
      console.log('Error updating file:', error);
    }
};
  
  // Usage
const fileUri3 = FileSystem.documentDirectory + 'example.txt';
const newContent = 'This is the updated content';
updateFile(fileUri3, newContent);

// delete file
export const deleteFile = async (fileUri) => {
    try {
      await FileSystem.deleteAsync(fileUri);
      console.log('File deleted successfully!');
    } catch (error) {
      console.log('Error deleting file:', error);
    }
  };
  
  // Usage
const fileUri4 = FileSystem.documentDirectory + 'example.txt';
deleteFile(fileUri4);

// create folder
export const createFolder = async (folderUri) => {
    try {
      await FileSystem.makeDirectoryAsync(folderUri);
      console.log('Folder created successfully!');
    } catch (error) {
      console.log('Error creating folder:', error);
    }
};
  
  // Usage
const folderUri = FileSystem.documentDirectory + 'example_folder/';
createFolder(folderUri);

// delete folder
export const deleteFolder = async (folderUri) => {
    try {
      await FileSystem.deleteAsync(folderUri);
      console.log('Folder deleted successfully!');
    } catch (error) {
      console.log('Error deleting folder:', error);
    }
};
  
  // Usage
const folderUri2 = FileSystem.documentDirectory + 'example_folder/';
deleteFolder(folderUri2);

// check if folder exist
export const checkFolderExists = async (folderUri) => {
    try {
      const folderInfo = await FileSystem.getInfoAsync(folderUri);
      if (folderInfo.exists && folderInfo.isDirectory) {
        console.log('Folder exists');
      } else {
        console.log('Folder does not exist');
      }
    } catch (error) {
      console.log('Error checking folder existence:', error);
    }
};
  
// Usage
const folderUri3 = FileSystem.documentDirectory + 'example_folder/';
checkFolderExists(folderUri3);