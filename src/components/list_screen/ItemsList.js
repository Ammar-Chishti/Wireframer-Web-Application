import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Button, Icon } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class ItemsList extends React.Component {

    sortingCriteriaSet = false;

    setSortingCriteria = () => {
        window.isTaskSorted = false;
        window.isDueDateSorted = false;
        window.isStatusSorted = false;
    }

    sortTodoList = (sortingCriteria, itemsList) => {
        
        function compare(a, b) {
            if (sortingCriteria === "sortByTask") {
                if (!window.isTaskSorted) {
                    if (a.description > b.description) { return 1 }
                    else if (b.description > a.description) { return -1 }
                    else { return 0 }
                } else {
                    let temp = a
                    a = b
                    b = temp

                    if (a.description > b.description) { return 1 }
                    else if (b.description > a.description) { return -1 }
                    else return 0
                }
            }

            else if (sortingCriteria === "sortByDueDate") {
                if (!window.isDueDateSorted) {
                    if (a.due_date > b.due_date) { return 1 }
                    else if (b.due_date > a.due_date) { return -1 }
                    else { return 0 }
                } else {
                    let temp = a
                    a = b
                    b = temp

                    if (a.due_date > b.due_date) { return 1 }
                    else if (b.due_date > a.due_date) { return -1 }
                    else { return 0 }
                }
            }

            else if (sortingCriteria === "sortByStatus") {
                if (!window.isStatusSorted) {
                    if (a.completed > b.completed) { return 1 }
                    else if (b.completed > a.completed) { return -1 }
                    else { return 0 }
                } else {
                    let temp = a
                    a = b
                    b = temp

                    if (a.completed > b.completed) { return 1 }
                    else if (b.completed > a.completed) { return -1 }
                    else { return 0 }
                }
            }
        }

        itemsList.sort(compare)
        if (sortingCriteria === "sortByTask") {
            if (window.isTaskSorted) {
                window.isTaskSorted = false;
            } else {
                window.isTaskSorted = true;
            }
            window.isDueDateSorted = false;
            window.isStatusSorted = false;
        } 
        
        else if (sortingCriteria === "sortByDueDate") {
            if (window.isDueDateSorted) {
                window.isDueDateSorted = false;
            } else {
                window.isDueDateSorted = true;
            }
            window.isTaskSorted = false;
            window.isStatusSorted = false;
        }

        else if (sortingCriteria === "sortByStatus") {
            if (window.isStatusSorted) {
                window.isStatusSorted = false;
            } else {
                window.isStatusSorted = true;
            }
            window.isTaskSorted = false;
            window.isDueDateSorted = false;
        }

        getFirestore().collection("todoLists").doc(this.props.todoList.id).update({
            items: itemsList
        });
    }

    openNewItemScreen = (history) => {
        window.addNewItem = true;
        window.currentTodoId = this.props.todoList.id;
        history.push({
            pathname: "itemScreen"
        })
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        const history = this.props.history
        console.log("ItemsList: todoList.id " + todoList.id);
        if (!this.sortingCriteriaSet) {
            this.setSortingCriteria();
        }
        return (
            <div className="todo-lists section">
                <div className="list_item_header_card">
                    <div className="list_item_task_header" onClick={() => this.sortTodoList("sortByTask", items)}>Task</div>
                    <div className="list_item_due_date_header" onClick={() => this.sortTodoList("sortByDueDate", items)}>Due Date</div>
                    <div className="list_item_status_header"onClick={() => this.sortTodoList("sortByStatus", items)}>Status</div>
                </div>
                <div id="list_items_second_container">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} itemIndex={items.indexOf(item)} history={history}/>
                    );})
                }
                </div>
                <div className="new_item_button_div">
                    <button className="new_item_button" onClick={() => this.openNewItemScreen(history)}></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
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
)(ItemsList);