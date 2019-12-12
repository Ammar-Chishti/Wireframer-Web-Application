import React from 'react';
import { Button, Icon } from 'react-materialize';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { array } from 'prop-types';
import { conditionalExpression } from '@babel/types';

class ItemCard extends React.Component {

    isCompleted(item) {
        if (item.completed === true) {
            var isCompleted = "Completed"
        }
        return isCompleted
    }

    isPending(item) {
        if (item.completed === false) {
            var isCompleted = "Pending"
        }
        return isCompleted
    }

    handleDelete = (todoItemIndex, e) => {

        let currentTodoListId = this.props.todoList.id
        getFirestore().collection("todoLists").doc(currentTodoListId).get().then(function(doc) {
            
            let newList = doc.data().items
            newList.splice(todoItemIndex, 1)

            getFirestore().collection("todoLists").doc(currentTodoListId).update({
                items: newList
            })
        })
        e.stopPropagation();
    }

    handleMoveUp = (todoItemIndex, e) => {

        let currentTodoListId = this.props.todoList.id
        getFirestore().collection("todoLists").doc(currentTodoListId).get().then(function(doc) {
            
            let finalList = doc.data().items
            let todoItemToMoveUp = finalList[todoItemIndex]
            let todoItemToMoveDown = finalList[todoItemIndex-1]

            finalList[todoItemIndex] = todoItemToMoveDown
            finalList[todoItemIndex-1] = todoItemToMoveUp

            getFirestore().collection("todoLists").doc(currentTodoListId).update({
                items: finalList
            })
        })

        window.isTaskSorted = false;
        window.isDueDateSorted = false;
        window.isStatusSorted = false;
        e.stopPropagation();
    }

    handleMoveDown = (todoItemIndex, e) => {

        let currentTodoListId = this.props.todoList.id
        getFirestore().collection("todoLists").doc(currentTodoListId).get().then(function(doc) {
            
            let finalList = doc.data().items
            let todoItemToMoveDown = finalList[todoItemIndex]
            let todoItemToMoveUp = finalList[todoItemIndex+1]

            finalList[todoItemIndex] = todoItemToMoveUp
            finalList[todoItemIndex+1] = todoItemToMoveDown

            getFirestore().collection("todoLists").doc(currentTodoListId).update({
                items: finalList
            })
        })

        window.isTaskSorted = false;
        window.isDueDateSorted = false;
        window.isStatusSorted = false;
        e.stopPropagation();
    }

    openEditItemScreen = (itemIndex) => {
        window.currentTodoId = this.props.todoList.id
        window.currentTodoItemIndex = itemIndex;
        window.addNewItem = false;
        this.props.history.push({
            pathname: "itemScreen"
        })
    }

    render() {
        const { item } = this.props;
        return (
            <div className='list_item_card' onClick={() => this.openEditItemScreen(this.props.itemIndex)}>
                <div className='list_item_card_description'>
                    {item.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{item.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {item.due_date}
                </div>
                <div className='list_item_card_completed'>
                    {this.isCompleted(item)}
                </div>
                <div className='list_item_card_not_completed'>
                    {this.isPending(item)}
                </div>
                <Button floating fab={{direction: "left"}} className="red right-align" style={{position: "absolute", height: "21px"}}>
                    <Button floating icon={<Icon children="arrow_upward"/>} className="blue" style={{left: "42px", bottom: "7px"}} disabled={this.props.itemIndex === 0} onClick={(e) => this.handleMoveUp(this.props.itemIndex, e)}></Button>
                    <Button floating icon={<Icon children="arrow_downward"/>} className="green" style={{left: "35px", bottom: "7px"}} disabled={this.props.itemIndex === this.props.todoList.items.length-1} onClick={(e) => this.handleMoveDown(this.props.itemIndex, e)}></Button>
                    <Button floating icon={<Icon children="remove"/>} className="yellow" style={{left: "28px", bottom: "7px"}} onClick={(e) => this.handleDelete(this.props.itemIndex, e)}></Button>
                </Button>
            </div>
        )
    }


}
export default ItemCard;