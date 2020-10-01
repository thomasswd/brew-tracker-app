import React, { useEffect, useState } from 'react'
import {auth} from './Base'

//this is a component that handles the current user context/ state

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)

    //this will run any  rebase 
    //will run only once when the authprovider is mounted 
    useEffect(()=>{
        auth.onAuthStateChanged(setCurrentUser)
        console.log(currentUser)
    }, [])

    return (
        <AuthContext.Provider value={[currentUser,setCurrentUser]}>
            {children}
        </AuthContext.Provider>
    )
}

