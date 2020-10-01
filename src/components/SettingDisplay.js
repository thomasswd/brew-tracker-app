import React, {useState, useEffect, useContext} from 'react'
import { fireDB } from '../Base'
import { BrewContext } from '../context/GlobalState'
import { TempSettingContext } from '../context/TempState'
import { AuthContext } from '../Auth'

const SettingDisplay = () => {

    const [settings, setSettings] = useContext(BrewContext)
    const [tempSettings, setTempSettings] = useContext(TempSettingContext)
    const currentUser = useContext(AuthContext)

    const [dbArray, setDBArray] = useState(null)

    useEffect(() => {
        if(currentUser[0]) {
            if(dbArray) {
                fireDB.collection('users').doc(currentUser[0].uid).collection('user-settings').doc(`${dbArray.id}`).set(
                    dbArray
                )
                console.log(settings)
            }
        }
    }, [dbArray]) 

    const handleSave = (e) => {
        e.preventDefault();

        setDBArray(tempSettings)

        setSettings([
            tempSettings,
            ...settings
        ]) 
    }

    return (
        <div className="current-settings">

            <h2>Current Setting</h2>

            <p>Brewer: {tempSettings.brewer}</p>
            <p>Roast: {tempSettings.roastType}</p>
            <p>Amount of coffee: {tempSettings.coffeeAmount}g</p>
            <p>Ratio of coffee to water: {tempSettings.coffeeWaterRatio ? `${tempSettings.coffeeWaterRatio}` : `No ratio selected`}</p>
            <p>Total number of pours: {tempSettings.pourNumber ? `${tempSettings.pourNumber}` : `` }</p>
            <p>Total water input: {tempSettings.waterAmount ? `${tempSettings.waterAmount}g` : `` }</p>
            <p>Amount of water for each pour: {tempSettings.eachPourAmount ? `${tempSettings.eachPourAmount}g` : `no pours calculated`}</p>

            <div className="button-container-center">
                <button className="primary-button" onClick={handleSave}>
                    Save this Brew
                </button>
            </div>
        </div>

        
    )
}

export default SettingDisplay