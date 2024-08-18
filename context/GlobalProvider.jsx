import { createContext,useContext,useState,useEffect } from "react";
import { getCurrentUser } from "../lib/appwriteConfig";
const GlobalContext = createContext()

export const useGlobalContext =()=>useContext(GlobalContext)

const GlobalProvider =({children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [user,setUser]=useState(null)
    const [isLoading,setIsLoading]=useState(true)

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await getCurrentUser();  // Await the getCurrentUser call
            if (res) {
              setIsLoggedIn(true);
              setUser(res);
            } else {
              setIsLoggedIn(false);
              setUser(null);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchUser();  // Call the async function
      }, []);
      

return (
    <GlobalContext.Provider
        value={{
           isLoading,
            setIsLoading,
            setIsLoggedIn,
            setUser
        }} >
        {children}
    </GlobalContext.Provider>
)
}

export default GlobalProvider