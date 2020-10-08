import React,{useState} from 'react';
import './signin.css';
import Buttons from './../../components/Forms/Buttons';
import {signInWithGoogle, auth} from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper'
import {Link, withRouter} from 'react-router-dom';

import FormInput from './../Forms/Formsinput';



const SignIn = props =>{
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const resetForm = () => {
        setEmail('');
        setPassword('');
    }


    const handleSubmit = async e =>{
        e.preventDefault();

        try{
            await auth.signInWithEmailAndPassword(email,password)
            resetForm();
            props.history.push('/')
        }catch(err){
            console.log(err)
        }
    }



        const configAuthWrapper ={
            headline:'Log In'
        }

        return(
                <AuthWrapper {...configAuthWrapper}>
                <div className='formWrap'>
                    <form onSubmit={handleSubmit}>

                    <FormInput type='text' name='email' value={email} placeholder='E-mail' handleChange={e=> setEmail(e.target.value)} />
                    <FormInput type='text' name='password' value={password} placeholder='Password' handleChange={e=> setPassword(e.target.value)}/>
                    <Buttons type='submit'>Log In</Buttons>



                        <div className='socialSignin'>
                            <div className='row'>
                                <Buttons onClick={signInWithGoogle}>
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