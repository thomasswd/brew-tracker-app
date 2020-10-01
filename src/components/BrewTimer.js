import React, {useState, useContext } from 'react'
import Countdown from './Countdown'

const BrewTimer = () => {

    return (
        <div className="brew-timer">
            <div className="hero">
                <form className = "coffee-form">
                    <Countdown />
                </form>
            </div>
        </div>
    )
}

export default BrewTimer