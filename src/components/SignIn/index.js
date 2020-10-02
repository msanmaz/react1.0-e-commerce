import React,{Component} from 'react';
import './signin.css';
import Buttons from './../../components/Forms/Buttons';
import {signInWithGoogle, auth} from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper'

import FormInput from './../Forms/Formsinput';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}


class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            ...initialState
        }

        this.handleChange = this.handleChange.bind(this);
    }


    handleSubmit = async e =>{
        e.preventDefault();
        const {email, password} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({
                ...initialState
            });
        }catch(err){
            console.log(err)
        }
    }

    handleChange(e){
        const {name,value} = e.target;

        this.setState({
            [name]:value
        })
    }

    render(){
        const{email,password} = this.state;
        const configAuthWrapper ={
            headline:'Log In'
        }

        return(
                <AuthWrapper {...configAuthWrapper}>
                <div className='formWrap'>
                    <form onSubmit={this.handleSubmit}>

                    <FormInput type='text' name='email' value={email} placeholder='E-mail' handleChange={this.handleChange} />
                    <FormInput type='text' name='password' value={password} placeholder='Password' handleChange={this.handleChange}/>
                    <Buttons type='submit'>Log In</Buttons>



                        <div className='socialSignin'>
                            <div className='row'>
                                <Buttons onClick={signInWithGoogle}>
                                    Sign in with Google
                                </Buttons>
                            </div>
                        </div>
                    </form>
                </div>
              </AuthWrapper>
        )
    }
}


export default SignIn