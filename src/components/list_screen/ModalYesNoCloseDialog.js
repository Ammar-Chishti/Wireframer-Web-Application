import React, { Component } from 'react'
import { getFirestore } from 'redux-firestore';

export class ModalYesNoCloseDialog extends Component {

    noButtonClicked() {
        let modalYesNoDialog = document.getElementById("modal_yes_no_close_dialog")
        modalYesNoDialog.classList.remove("modal_yes_no_close_dialog_slide_in")
        modalYesNoDialog.classList.add("modal_yes_no_close_dialog_slide_out")
        window.setTimeout(() => (modalYesNoDialog.style.visibility = "hidden"), 350)
    }

    yesButtonClicked = () => {

        const historyPush = {
            pathname: "/user/" + this.props.userId + "/wireframes/",
        }
        this.props.historyURL.push(historyPush)
    }
    
    render() {
        return (
            <div id="modal_yes_no_close_dialog">
                <br/>
                <span>&nbsp;&nbsp;Go home?</span>
                <br/>
                <br/>
                <br/>
                <span>&nbsp;&nbsp;You haven't saved your wireframe yet</span>
                <br/>
                <br/>
                <span>
                    &nbsp;
                    <button type="button" id="modal_close_yes_button" onClick={() => this.yesButtonClicked()}>Yes</button>
                    <button type="button" id="modal_close_no_button" onClick={() => this.noButtonClicked()}>No</button>
                </span>
                <br/>
                <br/>
                <span>&nbsp;&nbsp;Your wireframe data will not be retrievable</span>
            </div>
        )
    }
}