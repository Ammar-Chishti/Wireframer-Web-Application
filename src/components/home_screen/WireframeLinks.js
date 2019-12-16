import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';

class WireframeLinks extends React.Component {

    render() {
        let todoLists = this.props.todoLists;

        if (todoLists !== undefined) {
            todoLists = this.props.todoLists.filter(
                function (list) {
                    return list.email === window.currentUserEmail;
                }
            )
        }

        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map((todoList, index) => (
                    <Link to={'/user/' + this.props.auth.uid + '/wireframe/' + todoList.id} key={todoList.id}>
                        <TodoListCard todoList={todoList} wireFrameId={todoList.id} /> 
                        <br />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);