import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router'
import { fireDB, auth } from '../Base'
import { AuthContext } from '../Auth'
import { BrewContext } from '../context/GlobalState'

const Login = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [settings, setSettings] = useContext(BrewContext)

    const updateSettingState = (data) => {
        data.forEach(doc => {
            const set = doc.data()
            console.log(set)
            setSettings([
                set
            ])
        })
    }

    const handleLogin = async(e) => {
        e.preventDefault()

        try {
            await auth.signInWithEmailAndPassword(email, password)

            fireDB.collection('settings').get().then((snapshot)=> {
                updateSettingState(snapshot.docs)
            })

            history.push("/")
        } catch (error) {
            alert(error)
        }
    }

    const {currentUser} = useContext(AuthContext)

    if(currentUser) {
        return <Redirect to="/" />
    }

    return (
        <div className="login-page">
            <div className="login-page-container">
                <form onSubmit={handleLogin}>
                    <label className="user-info-label" htmlFor="email">Enter your email address: </label>
                    <input className="user-info-input" type="email" autoComplete="off" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <br></br>

                    <label className="user-info-label" htmlFor="password">Enter your password: </label>
                    <input className="user-info-input" type="password" autoComplete="off" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <br></br>
                    <button className="primary-button button-bottom-margin" type="submit">Login</button>
                </form>
                <div>
                    <button className="back-button" onClick={() => history.push('/')}>Go back</button>
                </div>
            </div>            
        </div>
    )
}

export default Login