import { Alert } from "react-native";
import { Client,Account, Databases} from "react-native-appwrite";
import { ID } from "react-native-appwrite";
// import Snackbar from "react-native-snackbar";
const client = new Client();
const databases= new Databases(client);
const account = new Account(client); 

export const config={
  endpoint:'https://cloud.appwrite.io/v1',
  projectID:'66bbd6a3002e6b190ee6',
  platform:'com.anonymous.FireSide',
  databaseID:'66be13ef00129d795773',
  usersCollectionID:'66be147e003b5e733eb8'
}

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectID)
  .setPlatform(config.platform);
// Register User
export const createUser= async (email,password,username)=>{
  try {
    const newAccount= await  account.create(
      ID.unique(),
      email,
      password,
      username
    )
    if(!newAccount) throw  Error;
    await signIn(email,password);
    const newUser= await databases.createDocument(
      config.databaseID,
      config.usersCollectionID,
      ID.unique(),
      {
        accoutID:newAccount.$id,
        username,
        email,
      }
    )
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
    
  }
}

export async function signIn(email,password) {
  try {
    const session = await account.createEmailPasswordSession(
      email,password)
      return session;
  } catch (error) {
    throw new Error(error);
    
    
  }
  
}