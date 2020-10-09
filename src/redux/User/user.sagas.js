import { takeLatest, call, all, put } from 'redux-saga/effects'
import userTypes from './user.types';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../firebase/utils'
import { signInSuccess, signOutUserSuccess, userError } from './user.actions';



export function* getSnapshotFromUserAuth(user,additionalData={}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        const snapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );


    } catch{
        //console.log(err)
    }
}


export function* emailSingIn({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)

    } catch (err) {
        console.log(err)
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSingIn);
}

export function* isUserAuth() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch{

    }

}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(
            signOutUserSuccess()
        )
    } catch (err) {
        console.log(err)
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuth)
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
} }) {
    if (password !== confirmPassword) {
        const err = ['Password is not matching'];
        yield put(
            userError(err)
        )
        return;
    }
    else if (displayName === '') {
        const err = ['Username is required'];
        yield put(
            userError(err)
        )
    }

    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData =  { displayName }
        yield getSnapshotFromUserAuth(user, additionalData)


    }
    catch (err) {
        console.log(err)
    }

}

export function* onSignUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}



export default function* userSagas() {
    yield all([
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutUserStart),
        call(onSignUpUserStart)
    ])
}