import React, { useState } from 'react';
import './signup.css';
import {auth, handleUserProfile} from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/Formsinput';
import Buttons from './../Forms/Buttons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from 'react-router-dom';
const eye = <FontAwesomeIcon icon={faEye} />;




const Signup = props => {
    const[displayName, setdisplayName]= useState('');
    const[email, setemail]= useState('');
    const[password, setpassword]= useState('');
    const[confirmPassword, setconfirmPasword]= useState('');
    const[errors, seterrors]= useState([]);



    const reset = () => {
        setdisplayName('');
        setemail('');
        setpassword('');
        setconfirmPasword('')
        seterrors([]);


    }


    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };
    


   const handleFormSubmit = async event => {
        event.preventDefault();
        if(password !== confirmPassword){
            const err =['Password is not matching'];
            seterrors(err)
            return
        }

        try{
          const { user }  = await auth.createUserWithEmailAndPassword(email,password);
          await handleUserProfile(user , {displayName});
            reset();
            props.history.push('/')

        }
        catch(err){
            console.log(err)
            console.log(err.message)
        }

    }

        const configAuthWrapper ={
            headline : 'Registration'
        }
        return (

            <AuthWrapper {...configAuthWrapper}>
                    <div className='formWrap'>
                    {errors.length > 0 && (
                    <ul>
                        {errors.map((err,index) =>{
                            return(
                                <li key={index}>
                                    {err}
                                </li>
                            )
                        })}
                    </ul>
                )}
                    <form onSubmit={handleFormSubmit}>
                        <FormInput type='text' name='displayName' value={displayName} placeholder='Full Name' handleChange={ e => setdisplayName(e.target.value)}  />
                        <FormInput type='text' name='email' value={email} placeholder='E-mail' handleChange={ e => setemail(e.target.value)} />
                        <i onClick={togglePasswordVisiblity}>{eye}</i>
                        <FormInput type={passwordShown ? "text" : "password"} name='password' value={password} placeholder='Password' handleChange={ e => setpassword(e.target.value)} />
                        <FormInput type={passwordShown ? "text" : "password"} name='confirmPassword' value={confirmPassword} placeholder='Confirm Password' handleChange={ e => setconfirmPasword(e.target.value)} />
                        <Buttons type='submit'> Register </Buttons>

                    </form>
                    </div>
                    </AuthWrapper>
        )
    }


export default withRouter(Signup);