import React, {Component} from 'react';
import {auth} from './../../firebase/utils';
import {withRouter} from 'react-router-dom'
import './emailpass.css';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/Formsinput';
import Buttons from './../Forms/Buttons'

    const initialState = {
        email : '',
        errors: []
    }

class EmailPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        const {name , value} = e.target;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const {email} = this.state;
            const config = {
                url : 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email,config)
            .then(() => {
                this.props.history.push('/login')
            })
            .catch(() => {
                const err =['Email Not Found']
                this.setState({
                    errors:err
                })
            })

        }catch{

        }

    }

    render(){
        const {email, errors} = this.state;

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
                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                        type='email'
                        name='email'
                        value={email}
                        placeholder='E-mail'
                        onChange={this.handleChange}
                        />

                        <Buttons type='submit'>
                            Email Password
                        </Buttons>
                    </form>
                </div>

            </AuthWrapper>

        )
    }
}

export default withRouter(EmailPassword); 