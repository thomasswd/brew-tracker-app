import React, {useState} from 'react'
import { fireDB, auth } from "../Base"

const SignUp = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async(e) => {
        e.preventDefault()

        try {
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                console.log(cred.user)
                return fireDB.collection('users').doc(cred.user.uid).set({})
            })
            
            history.push("/")
        } catch (error) {
            alert(error)
        }
    }

    const goToSettings = () => {
        history.push("/")
    }

    return (
        <div className="signup-page">
            <div className="signup-page-container">
                <form onSubmit={handleSignUp}> 
                    <label className="user-info-label" htmlFor="email">Enter your email address: </label>
                    <input className="user-info-input" type="email" autoComplete="off" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <br></br>

                    <label className="user-info-label" htmlFor="password">Enter your password: </label>
                    <input className="user-info-input" type="password" autoComplete="off" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <br></br>

                    <button className="primary-button button-bottom-margin" type="submit">Sign Up</button>
                </form>
                <div>
                    <button className="back-button" onClick={goToSettings}>Go back</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp