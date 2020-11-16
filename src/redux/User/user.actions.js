import userTypes from './user.types';
import { auth, handleUserProfile, GoogleProvider } from './../../firebase/utils';


export const emailSignInStart = userCredentials => ({
    type:userTypes.EMAIL_SIGN_IN_START,
    payload:userCredentials
});


export const signOutUserStart = () => ({
    type: userTypes.SIGN_OUT_USER_START
})

export const signOutUserSuccess = () => ({
    type:userTypes.SIGN_OUT_USER_SUCCESS
})


export const signInSuccess = user => ({
    type:userTypes.SIGN_IN_SUCCESS,
    payload:user
})



export const checkUserSession = () => ({
    type: userTypes.CHECK_USER_SESSION
})



export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user,
})


export const resetAllAuthForm = () => ({
    type:userTypes.RESET_AUTH_FORMS
})

export const signUpUserStart = userCredentials => ({
    type:userTypes.SIGN_UP_USER_START,
    payload:userCredentials
})



export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
   if(password !== confirmPassword){
       const err = ['Password Don\'t match'];
       dispatch({
           type:userTypes.SIGN_UP_ERROR,
           payload:err
       });
       return
   }
}


export const resetPassword = ({ email }) => async dispatch => {
    const config = {
        url: 'http://localhost:3000/login'
    }
    try {
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                })
            })
            .catch(() => {
                console.log(email)
                const err = ['Email Not Found']
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: err
                })
            })

    } catch{

    }
}

export const signInWithGoogle = () => async dispatch => {
    try {
        await auth.signInWithPopup(GoogleProvider)
            .then(() => {
                dispatch({
                    type: userTypes.SIGN_IN_SUCCESS,
                    payload: true
                })
            })
    }
    catch (err) {

    }
};


export const userError = err => ({
    type: userTypes.USER_ERROR,
    payload:err
})