import React, {useState, useEffect} from 'react'
import {fireDB} from './Base'

export const useFirestore = (settingState) => {

    const [settings, setSettings] = useState([])

    useEffect(() => {

        const firestoreRef = firestore.ref()

        firestoreRef.put(settingState).on('state_changed', (snap) => {

        })

        firestore.collection(settingState).onSnapshot((snap)=>{
            let documents = []
            snap.forEach()
        })

    }, [settingState])

    return (
        {settings}
}
