import React, { Component } from 'react'
import { getFirestore } from 'redux-firestore';

export class ModalYesNoDialog extends Component {

    noButtonClicked() {
        let modalYesNoDialog = document.getElementById("modal_yes_no_dialog")
        modalYesNoDialog.classList.remove("modal_yes_no_dialog_slide_in")
        modalYesNoDialog.classList.add("modal_yes_no_dialog_slide_out")
        window.setTimeout(() => (modalYesNoDialog.style.visibility = "hidden"), 350)
    }

    handleDeleteWireFrame = (e) => {

        let wireFrameToDeleteID = window.wireFrameToDeleteId;
        getFirestore().collection("todoLists").doc(wireFrameToDeleteID).delete().then(function() {
            console.log("WIREFRAME DELETED")
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        let modalYesNoDialog = document.getElementById("modal_yes_no_dialog")
        modalYesNoDialog.classList.remove("modal_yes_no_dialog_slide_in")
        modalYesNoDialog.classList.add("modal_yes_no_dialog_slide_out")
        window.setTimeout(() => (modalYesNoDialog.style.visibility = "hidden"), 350)
    }
    
    render() {
        return (
            <div id="modal_yes_no_dialog">
                <br/>
                <span>&nbsp;&nbsp;Delete list?</span>
                <br/>
                <br/>
                <br/>
                <span>&nbsp;&nbsp;Are you sure you want to delete this list?</span>
                <br/>
                <br/>
                <span>
                    &nbsp;
                    <button type="button" id="modal_yes_button" onClick={this.handleDeleteWireFrame}>Yes</button>
                    <button type="button" id="modal_no_button" onClick={() => this.noButtonClicked()}>No</button>
                </span>
                <br/>
                <br/>
                <span>&nbsp;&nbsp;The list will not be retrievable.</span>
            </div>
        )
    }
}