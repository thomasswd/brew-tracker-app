import React, {useState, useContext} from 'react'
import { TempSettingContext } from '../context/TempState'
import GrindDisplay from './GrindDisplay'

 
export const NewSetting = (props) => {

    const [brewer, setBrewer] = useState('')
    const [roastType, setRoastType] = useState('Select a roast')
    const [coffeeWaterRatio, setCoffeeWaterRatio] = useState('Select a ratio')
    const [coffeeAmount, setCoffeeAmount] = useState(0)
    const [pourNumber, setPourNumber] = useState("Select number of pours in brew")
    const waterAmount = 0
    const id = useState(0)
    const [grindSetting, setGrindSetting] = useState('')

    const [tempSettings, setTempSettings] = useContext(TempSettingContext)

    const handleBrew = (e) => {
        e.preventDefault();
      
        setTempSettings({
            brewer,
            roastType,
            coffeeWaterRatio: parseInt(coffeeWaterRatio),
            coffeeAmount: parseInt(coffeeAmount),
            waterAmount: parseInt(coffeeWaterRatio * coffeeAmount),
            pourNumber: parseInt(pourNumber),
            pours: [],
            id: Date.now(),
            bloomAmount: coffeeAmount*2,
            eachPourAmount: Math.floor((parseInt(coffeeWaterRatio * coffeeAmount) - (coffeeAmount*2)) / (pourNumber-1)),
            brewTime: 'not available'
        })
    }

    const handleModalClick = (e) => {
        if(e.target === e.currentTarget) {
            //set a state of visible to visibility hidden
           props.setInputVisibility('no-show')
        }
    }

    const handleGrindSetting = (e) => {
        console.log(e.currentTarget.value)
        //grindSetting = e.currentTarget.value
        setGrindSetting(e.currentTarget.value)
    }

    return (
        <div className="new-setting">
            <form className="new-log" onSubmit={handleBrew} autoComplete="off">
                <div className={`modal-container ${props.inputVisibility}`} onClick={handleModalClick}> 
                    <div className="new-setting-form">
                        <div className="close-modal modal-display" onClick={() => props.setInputVisibility('no-show')}>&times;</div>
                        <h2 className="setting-header">Start a new brew</h2>
                        <label htmlFor="water-amount" className="setting-label">Brewer:</label>
                        <input className="setting-input" type="text" value={brewer} placeholder={`"V60"`} required onChange={(e)=>setBrewer(e.target.value)}/>

                        <label htmlFor="roast-type" className="setting-label">Roast Type:</label>
                        <select name="roast" id="roast-type" value={roastType} className="select-list" required onChange={(e)=>setRoastType(e.target.value)}>
                            <option disabled>Select a roast</option>
                            <option value="light roast">light roast</option>
                            <option value="medium roast">medium roast</option>
                            <option value="dark roast">dark roast</option>
                        </select>

                        <label htmlFor="ratio" className="setting-label">Coffee to water ratio:</label>
                        <select name="ratio" id="ratio" value={coffeeWaterRatio} className="select-list" onChange={(e)=>setCoffeeWaterRatio(e.target.value)}>
                            <option disabled>Select a ratio</option>
                            <option value="13">1:13</option>
                            <option value="14">1:14</option>
                            <option value="15">1:15</option>
                            <option value="16">1:16</option>
                            <option value="17">1:17</option>
                        </select>

                        <label htmlFor="coffee-grams" autoComplete="off" className="setting-label">Amount of coffee (grams): </label>
                        <input name="coffee" id="coffee-grams" className="coffee-amount setting-input" placeholder={`10`} required onChange={(e)=>setCoffeeAmount(e.target.value)}/>

                        <label htmlFor="pour-number" className="setting-label">Number of pours (Including bloom): </label>
                        <select name="pours" id="pour-number" value={pourNumber} className="select-list" onChange={(e)=>setPourNumber(e.target.value)}>
                            <option disabled>Select number of pours in brew</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <label htmlFor="coffee-grind" className="setting-label">Coffee grind setting: </label>
                        
                        <GrindDisplay grindSetting={grindSetting}/>
                        <input name="coffee-grind" id="coffee-grind" type="range" min="0" max="100" className="coffee-grind" onChange={(e)=> setGrindSetting(e.currentTarget.value)} required />

                        <button className="primary-button try-button">
                            Use these settings
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default NewSetting