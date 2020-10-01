import React, {useState, createContext} from 'react'

export const TempSettingContext = createContext()

export const TempProvider = ({children}) => {

    const [tempSettings, setTempSettings] = useState({
        brewer: 'V60',
        roastType: 'light roast',
        coffeeWaterRatio: '1:15',
        coffeeAmount: 15, //in grams
        waterAmount: 230,
        pourNumber: 3,
        pours: [
            45,
            45,
            60
        ],
        brewTime: 210, //seconds 
        id: 123123,
        bloomAmount: 30,
        eachPourAmount: 100,
        currentWaterAmount: 0
    })

    return (
        <TempSettingContext.Provider value={[tempSettings, setTempSettings]}>
            {children}
        </TempSettingContext.Provider>
    )
}
