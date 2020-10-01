import React, {useState, useContext, useEffect} from 'react'
import { BrewContext } from '../context/GlobalState'
import Settings from './Settings'
import { AuthContext } from '../Auth'
import { fireDB, auth } from '../Base'
import { Redirect } from 'react-router-dom'
import brews from '../sample-brews'

const MySettings = ({history, settingsVisibility, setSettingsVisibility}) => {

    const [settings, setSettings] = useContext(BrewContext)
    const [currentUser, setCurrentUser] = useContext(AuthContext)

    const [loggedIn, setLoggedIn] = useState('notVisible')
    const [loggedOut, setLoggedOut] = useState('notVisible')
    const [userName, setUserName] = useState('')

    const goToLogin = () => {
        history.push("/login")
    }

    const goToSignUp = () => {
        history.push("/register")
    }
    
    //when the user logs in, the state is updated from the database
    const updateSettingState = (data) => {
        let setArray = []
        data.forEach(doc => {
            const set = doc.data()
            setArray.push(set)
        })
        setSettings(setArray.reverse())
    }

    useEffect(() => {
        if(currentUser) {
            setLoggedIn('isVisible')
            setLoggedOut('notVisible')
            //setPrimaryButton('isVisible primary-button')
            // fireDB.collection('settings').get().then((snapshot)=> {
            //     updateSettingState(snapshot.docs)
            // })
            fireDB.collection('users').doc(currentUser.uid).collection('user-settings').get().then((snapshot)=> {
                updateSettingState(snapshot.docs)
            })
            setUserName(currentUser.email)
            //fireDB.collection('users').doc()
        } else {
            setLoggedIn('notVisible')
            setLoggedOut('isVisible')
            //setPrimaryButton('notVisible primary-button')
            setSettings([
                ...brews
            ])
            console.log('bye')
        }
    }, [currentUser])

    const handleSignOut = async(e) => {
        await auth.signOut()
        history.push("/")
        return (<Redirect to="/login" />)
    }   

    const handleSettingClick = (e) => {
        if(e.target === e.currentTarget) {
            //set a state of visible to visibility hidden
           setSettingsVisibility('no-show')
        }
    }

    return (
        <div className={`setting ${settingsVisibility === 'show' ? 'show' : 'no-show'}`} onClick={handleSettingClick}>
            <div className="setting-inner">
            <div className="close-modal modal-display" onClick={() => setSettingsVisibility('no-show')}>&times;</div>
                <h2 className="setting-header">Saved Settings</h2>
                <div className={`user ${settingsVisibility === 'show' ? 'display' : 'no-display'} display`}> 
                    <div className={`logInInfo ${loggedIn}`}>Logged in as <span className="user-email">{userName}</span></div>
                    <div className="user-prompt">
                        <button className={`primary-button ${loggedOut}`} onClick={goToLogin}>Login</button>
                        <button className={`primary-button ${loggedOut}`} onClick={goToSignUp}>Sign Up</button>
                    </div>
                    <button className={`primary-button ${loggedIn}`} onClick={handleSignOut}>Sign Out</button>
                </div>
            
                {settings.map(setup => (   
                    <Settings key={setup.id}
                        index={setup.id}
                        brewer={setup.brewer}
                        roastType={setup.roastType} 
                        coffeeWaterRatio={setup.coffeeWaterRatio} 
                        coffeeAmount={setup.coffeeAmount}
                        roastType={setup.roastType}
                        waterAmount={setup.waterAmount}
                        pourNumber={setup.pourNumber}
                        pours={setup.pours}
                        brewTime={setup.brewTime}
                        id={setup.id} />       
                ))}
            </div>
        </div>
    )
}

export default MySettings