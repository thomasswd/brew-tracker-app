import React, {useState, useContext} from 'react'
import { TempSettingContext } from '../context/TempState'
import { BrewContext } from '../context/GlobalState'

import Prompt from './Prompt'

let isTimerOn = false;
let timer;

const Countdown = () => {

    const [tempSettings, setTempSettings] = useContext(TempSettingContext)

    const [timerPrompt, setTimerPrompt] = useState(<p className="prompt-text">Enter in custom settings for a new brew or select from previously saved settings</p>)   
    const [countText, setCountText] = useState(`1:00`)
    const [buttonText, setButtonText] = useState("START")
    const [brewTime, setBrewTime] = useState(0)

    let bloomPour = (tempSettings.coffeeAmount * 2)

    const [pourStart, setPourStart] = useState(0)

    const [visibility, setVisibility] = useState('no-visibility') // or isVisible
    
    let pourTime
    let now = 0;

    const displayTime = (now) => {
        let minutes = 0
        let seconds 
    
        if(now >= 60) {
            minutes = Math.floor(now / 60)
            seconds = now % 60
        } else {
            seconds = now
        }
        
        //countText = `${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`
        setCountText(`${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`)
    }

    const startTimer = (isTimerOn) => {

        //let now = 0;

        if(isTimerOn === true) {
            clearInterval(timer)
    
            now = 0;
    
            displayTime(now)
    
            timer = setInterval(() => {
                now++
                setBrewTime(now)
                displayTime(now) 
            }, 1000)
        } else {
            clearInterval(timer)
        }
    }

    const handleTimer = (e) => {
        
        e.preventDefault()
        //let coffee = parseInt(coffeeSelector.value)

        if(!tempSettings.waterAmount) {
            setTimerPrompt(<p className="prompt-text">Please select valid brew settings</p>)
            return
        }

        if(isTimerOn === false) {
            isTimerOn = true
            setButtonText('STOP')
            setTimerPrompt(<p className="prompt-text">start the bloom by pouring in {tempSettings.bloomAmount}g of water</p>)
            setTempSettings({
                ...tempSettings,
                pours: [],
                currentWaterAmount: tempSettings.bloomAmount + tempSettings.eachPourAmount,
            })
            setVisibility('visibility')
        } else if(isTimerOn === true){
            isTimerOn = false
            setButtonText('START')
            setTimerPrompt(<p className="prompt-text">Timer has stopped</p>)
            setPourStart(0)
            setVisibility('no-visibility')
            if( tempSettings.pours.length === tempSettings.pourNumber - 1) {
                pourTime = brewTime - pourStart
                setTempSettings({
                    ...tempSettings,
                    pours: [...tempSettings.pours, pourTime],
                    brewTime: brewTime
                })
            }
        }

        startTimer(isTimerOn)
    }

    const updatePrompt = (e) => {
        e.preventDefault()

        let pourCount = tempSettings.pours.length + 2;
        //let currentWaterAmount = tempSettings.bloomAmount + tempSettings.eachPourAmount

        if(pourCount === tempSettings.pourNumber) {
            const thisTimerPrompt = <span> </span>
            //setTimerPrompt(`Start your last pour, currently on pour ${pourCount}, pour up to ${tempSettings.currentWaterAmount}g of water and stop the timer when all the water is drained.`)
            setTimerPrompt(<p className="prompt-text">Start your last pour, currently on pour {pourCount}, pour up to <span className="pour-count">{tempSettings.currentWaterAmount}g</span> of water and stop the timer when all the water is drained. </p>)
        } else {
            //setTimerPrompt(`Start your next pour, currently on pour ${pourCount}, pour up to ${tempSettings.currentWaterAmount}g of water`)
            setTimerPrompt(<p className="prompt-text">Start your next pour, currently on pour {pourCount}, pour up to <span className="pour-count">{tempSettings.currentWaterAmount}g</span> of water</p>)
        }

        setPourStart(brewTime)
        console.log(`this pour started at ${pourStart}`)
        pourTime = brewTime - pourStart
        console.log(`The current pourTime is ${pourTime}`)

        //const newArr = tempSettings.pours

        setTempSettings({
            ...tempSettings,
            //newPour: tempSettings.pours.push(pourTime),
            pours: [...tempSettings.pours, pourTime],
            currentWaterAmount: tempSettings.bloomAmount + (pourCount * tempSettings.eachPourAmount)
        })

        if( tempSettings.pours.length === tempSettings.pourNumber - 2 ) {
            setVisibility('no-visibility')
        }

        
    }

    

    return (
        <React.Fragment>
            <div className="countdown">
                <p className="countdown-time timer-font">{countText}</p>
            </div>
            <button className={`nextPourButton ${visibility}`} onClick={updatePrompt}>Next Pour</button>
            <div className="mode">
                <button className="mode-button" onClick={handleTimer}>{buttonText}</button>
            </div>

            <Prompt timerPrompt={timerPrompt}/>
        </React.Fragment>
    )
}

export default Countdown
