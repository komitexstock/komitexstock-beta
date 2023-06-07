import { createContext, useState, useContext } from "react";


const AppContext = createContext();

export const useStack = () => useContext(AppContext).currentStack;
export const useStackUpdate = () => useContext(AppContext).setCurrentStack;

const AppProvider = ({children}) => {
    const [currentStack, setCurrentStack] = useState("Home");
    
    return (
        <AppContext.Provider value={{currentStack, setCurrentStack}}>
            {children}
        </AppContext.Provider>
    );
}
 
export default AppProvider;