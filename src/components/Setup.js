import React, {useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewSetting from './NewSetting'
import SettingDisplay from './SettingDisplay'
import Login from './Login'
import SignUp from './SignUp'
import { AuthProvider } from '../Auth' 
import MySettings from './MySettings'

export const Setup = () => {

    const [inputVisibility, setInputVisibility] = useState('no-show')
    const [settingsVisibility, setSettingsVisibility] = useState('no-show')

    const handleShowInputs = () => {
        setInputVisibility('show')
    }

    const handleShowSettings = () => {
        setSettingsVisibility('show')
    }

    return (
        <div className="setup">
            <AuthProvider>
                <div className="setting-container">
                    <NewSetting inputVisibility={inputVisibility} setInputVisibility={setInputVisibility}/>
                    <div className="new-setting-info">
                        <div className="new-setting-modals">
                            <button className="primary-button" onClick={handleShowInputs}>Enter new settings</button>
                            <button className="primary-button" onClick={handleShowSettings}>Saved settings</button>
                        </div>
                        <SettingDisplay />
                    </div>
                </div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={({history}) => <MySettings history={history} settingsVisibility={settingsVisibility} setSettingsVisibility={setSettingsVisibility}/>}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={SignUp}/>
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

export default Setup