import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      //window.currentUserEmail = credentials.email
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      console.log("LOGIN_ERROR")
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        console.log("REGISTER_SUCCESS")
        //window.currentUserEmail = newUser.email
        dispatch({ type: 'REGISTER_SUCCESS' });
    }).catch((err) => {
        console.log("REGISTER_ERROR")
        dispatch({ type: 'REGISTER_ERROR', err });
    });
};