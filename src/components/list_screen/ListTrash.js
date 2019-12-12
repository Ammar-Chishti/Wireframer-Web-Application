import React, { Component } from 'react'

export class ListTrash extends Component {

    displayDeletePopup = () => {
        let modalYesNoDialog = document.getElementById("modal_yes_no_dialog")
        modalYesNoDialog.classList.remove("modal_yes_no_dialog_slide_out")
        modalYesNoDialog.classList.add("modal_yes_no_dialog_slide_in")
        modalYesNoDialog.style.visibility = "visible"
    }

    render() {
        return (
            <div id="list_trash"
                onClick={this.displayDeletePopup}
            >
                &#128465;
            </div>
        )
    }
}

export default ListTrash