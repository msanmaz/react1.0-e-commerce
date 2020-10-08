import React, {useState} from 'react';
import {auth} from './../../firebase/utils';
import {withRouter} from 'react-router-dom'
import './emailpass.css';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/Formsinput';
import Buttons from './../Forms/Buttons'



const EmailPassword = props =>  {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);



  const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const config = {
                url : 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email,config)
            .then(() => {
                props.history.push('/login')
            })
            .catch(() => {
                console.log(email)
                const err =['Email Not Found']
                setErrors(err)
            })

        }catch{

        }

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