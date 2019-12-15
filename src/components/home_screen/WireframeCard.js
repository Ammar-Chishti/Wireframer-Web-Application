import React from 'react';

class WireframeCard extends React.Component {

    handleDisplayDeletePopup = (e) => {
        let modalYesNoDialog = document.getElementById("modal_yes_no_dialog")
        modalYesNoDialog.classList.remove("modal_yes_no_dialog_slide_out")
        modalYesNoDialog.classList.add("modal_yes_no_dialog_slide_in")
        modalYesNoDialog.style.visibility = "visible"
        window.wireFrameToDeleteId = this.props.wireFrameId;

        e.preventDefault();
    }

    render() {
        const { todoList } = this.props;
        //console.log("TodoListCard, todoList.id: " + todoList.id + " ");
        return (
            <div className="card-content blue-text text-darken-3">
                <span className="card-title" className="card_title">{todoList.name}</span><span className="delete_wireframe" onClick={this.handleDisplayDeletePopup}>X</span>
            </div>
        );
    }
}
export default WireframeCard;