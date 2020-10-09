import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './signin.css';
import Buttons from './../../components/Forms/Buttons';
import AuthWrapper from './../AuthWrapper'
import { Link, withRouter } from 'react-router-dom';
import { emailSignInStart,signInWithGoogle,resetAllAuthForm} from './../../redux/User/user.actions'

import FormInput from './../Forms/Formsinput';


const mapState = ({ user }) => ({
    currentUser: user.currentUser,

})


const SignIn = props => {
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (currentUser) {
            resetForm();
            props.history.push('/')
        }
    }, [currentUser])



    

    


    const resetForm = () => {
        setEmail('');
        setPassword('');
    }


    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }))
    }
    const handleGoogleSign = () => {
        dispatch(signInWithGoogle())
    }


    const configAuthWrapper = {
        headline: 'Log In'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            )
                        })}
                    </ul>
                )}
                <form onSubmit={handleSubmit}>

                    <FormInput type='text' name='email' value={email} placeholder='E-mail' handleChange={e => setEmail(e.target.value)} />
                    <FormInput type='text' name='password' value={password} placeholder='Password' handleChange={e => setPassword(e.target.value)} />
                    <Buttons type='submit'>Log In</Buttons>



                    <div className='socialSignin'>
                        <div className='row'>
                            <Buttons onClick={handleGoogleSign}>
                                Sign in with Google
                                </Buttons>
                        </div>
                    </div>


                    <div className='links'>
                        <Link to='/recovery'>
                            Reset Password
                            </Link>
                    </div>



                </form>
            </div>
        </AuthWrapper>
    )
}



export default withRouter(SignIn); 