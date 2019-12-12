import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

    handleNewList = () => {
        const newList = getFirestore().collection("todoLists").doc();
        newList.set({
            name: "Unknown",
            owner: "Unnknown",
            items: [],
            time: Date.now()
        })
        
        const historyPush = {
            pathname: "todoList/" + newList.id,
            key: newList.id
        }
        this.props.history.push(historyPush)
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col s10 m4">
                        <h1 className="wireframes_header_text">Recent Work</h1>
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            <span className="banner_text">Wireframer<sup>TM</sup></span>
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create New Wireframe
                                </button>
                        </div>
                    </div>
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