import React, {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom';
import './emailpass.css';
import {resetPassword, resetAllAuthForm} from './../../redux/User/user.actions'

import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/Formsinput';
import Buttons from './../Forms/Buttons'


const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})


const EmailPassword = props =>  {
    const {resetPasswordSuccess,resetPasswordError} = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() =>{
        if(resetPasswordSuccess){
            dispatch(resetAllAuthForm())
            props.history.push('/login')
        }

    },[resetPasswordSuccess])

    useEffect(() =>{
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0){
            setErrors(resetPasswordError);
        }

    },[resetPasswordError])

  const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({email}))
    }


        const configAuthWrapper = {
            headline: 'Email Password'
        }


        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className='formWrap'>

                        {errors.length > 0 && (
                            <ul>
                                {errors.map((e, index) =>{
                                    return (
                                        <li key={index}>
                                            {e}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    <form onSubmit={handleSubmit}>
                        <FormInput
                        type='email'
                        name='email'
                        value={email}
                        placeholder='E-mail'
                        handleChange = {e=> setEmail(e.target.value)}
                        />

                        <Buttons type='submit'>
                            Email Password
                        </Buttons>
                    </form>
                </div>

            </AuthWrapper>

        )
    }


export default withRouter(EmailPassword); 