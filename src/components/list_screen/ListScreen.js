import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import ListTrash from './ListTrash';
import { ModalYesNoDialog } from './ModalYesNoDialog.js';
import ItemScreen from '../item_screen/ItemScreen'

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    newTimeSet = false

    setNewTime = () => {
        getFirestore().collection("todoLists").doc(this.props.todoList.id).update({
            time: Date.now(),
        }).then(() => {
        }).catch((err) => {
            console.log(err)
        });
    }

    deleteCurrentTodo = () => {
        getFirestore().collection("todoLists").doc(this.props.todoList.id).delete().then(function() {
            console.log("TODOLIST DELETED");
        }).catch(function(err) {
            console.error(err);
        });

        this.props.history.goBack();
    }
    
    handleChangeName = (e) => {
        getFirestore().collection("todoLists").doc(this.props.todoList.id).update({
            name: e.target.value,
        }).then(() => {
            console.log("TODOLIST NAME MODIFIED")
        }).catch((err) => {
            console.log(err)
        });
    }

    handleChangeOwner = (e) => {
        getFirestore().collection("todoLists").doc(this.props.todoList.id).update({
            owner: e.target.value,
        }).then(() => {
            console.log("TODOLIST OWNER MODIFIED")
        }).catch((err) => {
            console.log(err)
        });
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!todoList) {
            return <React.Fragment/>
        }
        if (!this.newTimeSet) {
            this.setNewTime();
        }
        this.newTimeSet = true
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <ListTrash />
                <ModalYesNoDialog deleteCurrentTodo={() => this.deleteCurrentTodo()} />
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChangeName} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChangeOwner} defaultValue={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} history={this.props.history}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList) {
    todoList.id = id;
  }

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);