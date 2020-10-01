import React, {useState, useContext} from 'react'

import { TempSettingContext } from '../context/TempState'
import { BrewContext } from '../context/GlobalState'
import { AuthContext } from '../Auth'
import { fireDB } from '../Base'

const Settings = (props) => {

    const [settings, setSettings] = useContext(BrewContext)
    const [tempSettings, setTempSettings] = useContext(TempSettingContext)
    const currentUser = useContext(AuthContext)

    const newSettings = {
        brewer: props.brewer,
        roastType: props.roastType,
        coffeeWaterRatio: props.coffeeWaterRatio,
        coffeeAmount: props.coffeeAmount,
        waterAmount: props.waterAmount,
        pourNumber: props.pourNumber,
        pours: props.pours,
        id: Date.now(),
        brewTime: props.brewTime || 'not available',
        bloomAmount: props.coffeeAmount*2,
        eachPourAmount: Math.floor((props.waterAmount - (props.coffeeAmount*2)) / (props.pourNumber-1)),
    }

    const updateTempSetting = () => {
        setTempSettings({
            ...newSettings
        })
    }

    const deleteSetting = () => {
        setSettings([
            ...settings.filter( setting => setting.id !== props.index)
        ])

        if(currentUser[0]) {
            fireDB.collection('users').doc(currentUser[0].uid).collection('user-settings').doc(`${props.id}`).delete()
        }
    }

    let pourCount = 0;

    return (

        <div className="setting-modules">
            
            <form className="new-log">
                <div>
                    <p className="primary-text">Brewer: {props.brewer}</p>
                    <p className="primary-text">Roast Type: {props.roastType}</p>
                    <p className="primary-text">Coffee to water ratio: {props.coffeeWaterRatio}</p>
                    <p className="primary-text">Amount of coffee brewed: {props.coffeeAmount}g </p>
                    <p className="primary-text">Amount of water: {props.waterAmount}g </p>  
                    <p className="primary-text">Number of pours: {props.pourNumber}</p> 

                    {props.pours.map(pours => {
                        pourCount++
                        return (
                        <p className="primary-text" key={pourCount}>Pour {pourCount}: {pours} s</p>
                        )
                    })}
    
                    <p className="primary-text">Brew Time: {typeof props.brewTime === 'string' ? `${props.brewTime}` : `${props.brewTime}s`}</p>

                </div>
            </form>
            <div className="setting-options">
                <button className="primary-button" onClick={updateTempSetting}>
                    Use these settings
                </button>
                <button className="secondary-button" onClick={deleteSetting}>
                    Delete this setting
                </button>
            </div>
        </div>
    )
}


export default Settings