import userTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    signInSuccess:false,
    signUpError:[],
    resertPasswordSuccess:false,
    resetPasswordError:[]
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser:action.payload,
                signUpError: []
            }
            case userTypes.SIGN_OUT_USER_SUCCESS:
                return{
                    ...state,
                    ...INITIAL_STATE
                }
            case userTypes.SIGN_UP_ERROR:
                return{
                    ...state,
                    signUpError: action.payload
                }
            case userTypes.RESET_PASSWORD_SUCCESS:
                return {
                    ...state,
                    resertPasswordSuccess:action.payload
                }
            case userTypes.RESET_PASSWORD_ERROR:
                return {
                    ...state,
                    resetPasswordError:action.payload
                }
            case userTypes.RESET_AUTH_FORMS:
                return{
                    ...state,
                    signInSuccess:false,
                    signUpSuccess:false,
                    signUpError:[],
                    resertPasswordSuccess:false,
                    resetPasswordError:[]
                }
        default:
            return state;
    }
}

export default userReducer;