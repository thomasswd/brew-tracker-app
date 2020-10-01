import React, {useContext} from 'react'
import { BrewContext } from '../context/GlobalState'
import { TempSettingContext } from '../context/TempState'

const Prompt = ({timerPrompt, setTimerPrompt}) => {

    let pourCount = 0;
    const [settings, setSettings] = useContext(BrewContext)
    const [tempSettings, setTempSettings] = useContext(TempSettingContext)

    const saveSettings = (e) => {
        e.preventDefault()

        setSettings([
            tempSettings,
            ...settings
        ])

    }   

    return (
        <React.Fragment>
            <div className="prompt">
                {timerPrompt}
            </div>
            <div className="prompt-pour-container">
                {tempSettings.pours.map(pour => {
                    pourCount++
                    return (
                        <div className="prompt-count" key={pourCount}>Pour {pourCount}: {pour} s</div>
                    )
                })}
                <div className="prompt-time">{typeof tempSettings.brewTime === 'string' ? `` : `Total Brew Time: ${tempSettings.brewTime} s`}</div>
            </div>

            {/* <div>
                <button className="primary-button" onClick={saveSettings}>
                    Save this Brew
                </button>
            </div> */}
        </React.Fragment>
    )
}

export default Prompt