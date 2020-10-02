import React, { Component } from 'react';
import './signup.css';
import {auth, handleUserProfile} from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/Formsinput';
import Buttons from './../Forms/Buttons';

const initState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initState
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword,errors } = this.state;
        if(password !== confirmPassword){
            const err =['Password Does/nt match'];
            this.setState({
                errors:err
            })
            return
        }

        try{
          const { user }  = await auth.createUserWithEmailAndPassword(email,password);
          await handleUserProfile(user , {displayName});

          this.setState({
              ...initState
          })

        }
        catch(err){
            console.log(err)
            console.log(err.message)
        }

    }

    render() {
        const { displayName, email, password, confirmPassword, errors } = this.state;
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
                    <form onSubmit={this.handleFormSubmit}>
                        {displayName}
                        <FormInput type='text' name='displayName' value={displayName} placeholder='Full Name' onChange={this.handleChange} />
                        <FormInput type='text' name='email' value={email} placeholder='E-mail' onChange={this.handleChange} />
                        <FormInput type='text' name='password' value={password} placeholder='Password' onChange={this.handleChange} />
                        <FormInput type='text' name='confirmPassword' value={confirmPassword} placeholder='Confirm Password' onChange={this.handleChange} />
                        <Buttons type='submit'> Register </Buttons>

                    </form>
                    </div>
                    </AuthWrapper>
        )
    }
}


export default Signup;