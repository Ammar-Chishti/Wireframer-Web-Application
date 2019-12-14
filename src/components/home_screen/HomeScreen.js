import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks'
import { getFirestore } from 'redux-firestore';
import { ModalYesNoDialog } from './ModalYesNoDialog';

class HomeScreen extends Component {

    handleNewWireframe = () => {

        let currentUserEmail = window.currentUserEmail
        const newList = getFirestore().collection("todoLists").doc()
        newList.set({
            name: "unknown",
            email: currentUserEmail,
            time: Date.now(),
            items: [],
        })

        const historyPush = {
            pathname: "/user/" + this.props.auth.uid + "/wireframe/" + newList.id,
        }
        this.props.history.push(historyPush)
    }

    debug = () => {

        /*
        console.log("yo mama")

        const historyPush = {
            pathname: "wireFrame/", //+ newList.id,
            //key: newList.id
        }
        this.props.history.push(historyPush)
        */
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        getFirestore().collection("users").doc(this.props.auth.uid).get().then(function(doc) {
            window.currentUserEmail = doc.data().email;
        })

        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col s10 m4">
                        <h1 className="wireframes_header_text">Recent Work</h1>
                        <WireframeLinks />
                        <ModalYesNoDialog historyURL={this.props.history}/>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            <span className="banner_text">Wireframer<sup>TM</sup></span>
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewWireframe}>
                                    Create New Wireframe
                                </button>
                        </div>
                    </div>
                    <button onClick={() => this.debug()}>DEBUG</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['time', 'desc']},
    ]),
)(HomeScreen);