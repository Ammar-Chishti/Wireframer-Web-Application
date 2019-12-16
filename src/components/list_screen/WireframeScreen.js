import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { ModalYesNoDialog } from '../home_screen/ModalYesNoDialog.js';
import { ModalYesNoCloseDialog } from './ModalYesNoCloseDialog'
import { Rnd } from 'react-rnd';

class WireframeScreen extends Component {
    state = {
        name: '',
        items: [],
        currentDataSaved: false
    }

    debug = () => {
        console.log(this.state)
    }

    handleClose = (e) => {

        if (!this.state.currentDataSaved) {
            let modalYesNoCloseDialog = document.getElementById("modal_yes_no_close_dialog")
            modalYesNoCloseDialog.classList.remove("modal_yes_no_close_dialog_slide_out")
            modalYesNoCloseDialog.classList.add("modal_yes_no_close_dialog_slide_in")
            modalYesNoCloseDialog.style.visibility = "visible"
        } else {
            const historyPush = {
                pathname: "/user/" + this.props.auth.uid + "/wireframes/",
            }
            this.props.history.push(historyPush)
        }
    }

    handleSave = (e) => {

        if (!this.state.currentDataSaved) {
            
            console.log("Saved Wireframe")
            let wireframe = this.props.todoList
            let wireframeId = this.props.todoList.id;
            let newName = document.getElementsByClassName("name_textfield")[0]

            getFirestore().collection("todoLists").doc(wireframeId).update({
                items: this.state.items,
                name: newName.value
            })

            this.setState({
                ...this.state,
                name: newName,
                currentDataSaved: true
            })
        }
    }


    /*
    handleChangeName = (e) => {
        getFirestore().collection("todoLists").doc(this.props.todoList.id).update({
            name: e.target.value,
        }).then(() => {
            console.log("TODOLIST NAME MODIFIED")
        }).catch((err) => {
            console.log(err)
        });
    }
    */


    newTimeSet = false

    setNewTime = () => {
        getFirestore().collection("todoLists").doc(this.props.todoList.id).update({
            time: Date.now(),
        }).then(() => {
        }).catch((err) => {
            console.log(err)
        });
    }

    setInitialState = () => {
        this.setState({
            ...this.state,
            name: this.props.todoList.name,
            items: this.props.todoList.items
        })
    }

    changeObjectLocation = (index, event, destination) => {

        let tempItems = this.state.items;
        let itemBeingMoved = tempItems[index];

        itemBeingMoved.x = destination.x
        itemBeingMoved.y = destination.y
        tempItems[index] = itemBeingMoved;

        this.setState({
            ...this.state,
            items: tempItems,
            currentDataSaved: false
        })
        this.unlockItemChangers(index)
    }

    resizeObject = (index, event, direction, ref, delta, position) => {

        let tempItems = this.state.items;
        let itemBeingResized = tempItems[index];

        itemBeingResized.height = ref.style.height
        itemBeingResized.width = ref.style.width;

        this.setState({
            ...this.state,
            items: tempItems,
            currentDataSaved: false
        })
        this.unlockItemChangers(index)
    }

    unlockItemChangers = (index) => {

        let tempItems = this.state.items;
        let currentItem = tempItems[index];

        window.itemIndex = index;
        let wireframe_textfield_edit = document.getElementsByClassName("wireframe_textfield_edit")[0];
        let wireframe_font_size_edit = document.getElementsByClassName('wireframe_font_size_edit')[0];
        let font_color_picker = document.getElementsByClassName("font_color_picker")[0];
        let background_color_picker = document.getElementsByClassName("background_color_picker")[0];
        let border_color_picker = document.getElementsByClassName("border_color_picker")[0];
        let border_thickness_edit = document.getElementsByClassName("wireframe_border_thickness_edit")[0];
        let border_radius_edit = document.getElementsByClassName("wireframe_border_radius_edit")[0];

        if (currentItem.type === "container") {

            // Leaving the fields we don't need to change disabled
            wireframe_textfield_edit.disabled = true;
            wireframe_font_size_edit.disabled = true;
            font_color_picker.disabled = true;

            background_color_picker.disabled = false;
            background_color_picker.value = currentItem.backgroundColor;
            background_color_picker.addEventListener("change", (e)=> this.handleBackgroundColorChange(e));

            border_color_picker.disabled = false;
            border_color_picker.value = currentItem.borderColor;
            border_color_picker.addEventListener("change", (e)=> this.handleBorderColorChange(e));

            border_thickness_edit.disabled = false;
            border_thickness_edit.value = currentItem.borderThickness;
            border_thickness_edit.addEventListener("change", (e)=> this.handleBorderThicknessChange(e));

            border_radius_edit.disabled = false;
            border_radius_edit.value = currentItem.borderRadius;
            border_radius_edit.addEventListener("change", (e)=> this.handleBorderRadiusChange(e));
            
        } else

        if (currentItem.type === "label") {

            wireframe_textfield_edit.disabled = false;
            wireframe_textfield_edit.value = currentItem.itemText;
            wireframe_textfield_edit.addEventListener("change", (e)=> this.handleTextChange(e));

            wireframe_font_size_edit.disabled = false;
            wireframe_font_size_edit.value = currentItem.textSize;
            wireframe_font_size_edit.addEventListener("change", (e)=> this.handleFontSizeChange(e));

            font_color_picker.disabled = false;
            font_color_picker.value = currentItem.textColor;
            font_color_picker.addEventListener("change", (e)=> this.handleFontColorChange(e));

            background_color_picker.disabled = false;
            background_color_picker.value = currentItem.backgroundColor;
            background_color_picker.addEventListener("change", (e)=> this.handleBackgroundColorChange(e));

            border_color_picker.disabled = false;
            border_color_picker.value = currentItem.borderColor;
            border_color_picker.addEventListener("change", (e)=> this.handleBorderColorChange(e));

            border_thickness_edit.disabled = false;
            border_thickness_edit.value = currentItem.borderThickness;
            border_thickness_edit.addEventListener("change", (e)=> this.handleBorderThicknessChange(e));

            border_radius_edit.disabled = false;
            border_radius_edit.value = currentItem.borderRadius;
            border_radius_edit.addEventListener("change", (e)=> this.handleBorderRadiusChange(e));

        } else

        if (currentItem.type === "button") {
            wireframe_textfield_edit.disabled = false;
            wireframe_textfield_edit.value = currentItem.itemText;
            wireframe_textfield_edit.addEventListener("change", (e)=> this.handleTextChange(e));


            wireframe_font_size_edit.disabled = false;
            wireframe_font_size_edit.value = currentItem.textSize;
            wireframe_font_size_edit.addEventListener("change", (e)=> this.handleFontSizeChange(e));


            font_color_picker.disabled = false;
            font_color_picker.value = currentItem.textColor;
            font_color_picker.addEventListener("change", (e)=> this.handleFontColorChange(e));


            background_color_picker.disabled = false;
            background_color_picker.value = currentItem.backgroundColor;
            background_color_picker.addEventListener("change", (e)=> this.handleBackgroundColorChange(e));


            border_color_picker.disabled = false;
            border_color_picker.value = currentItem.borderColor;
            border_color_picker.addEventListener("change", (e)=> this.handleBorderColorChange(e));


            border_thickness_edit.disabled = false;
            border_thickness_edit.value = currentItem.borderThickness;
            border_thickness_edit.addEventListener("change", (e)=> this.handleBorderThicknessChange(e));


            border_radius_edit.disabled = false;
            border_radius_edit.value = currentItem.borderRadius;
            border_radius_edit.addEventListener("change", (e)=> this.handleBorderRadiusChange(e));

        } else
        
        if (currentItem.type === "textfield") {
            wireframe_textfield_edit.disabled = false;
            wireframe_textfield_edit.value = currentItem.itemText;
            wireframe_textfield_edit.addEventListener("change", (e)=> this.handleTextChange(e));

            wireframe_font_size_edit.disabled = false;
            wireframe_font_size_edit.value = currentItem.textSize;
            wireframe_font_size_edit.addEventListener("change", (e)=> this.handleFontSizeChange(e));

            font_color_picker.disabled = false;
            font_color_picker.value = currentItem.textColor;
            font_color_picker.addEventListener("change", (e)=> this.handleFontColorChange(e));

            background_color_picker.disabled = false;
            background_color_picker.value = currentItem.backgroundColor;
            background_color_picker.addEventListener("change", (e)=> this.handleBackgroundColorChange(e));

            border_color_picker.disabled = false;
            border_color_picker.value = currentItem.borderColor;
            border_color_picker.addEventListener("change", (e)=> this.handleBorderColorChange(e));

            border_thickness_edit.disabled = false;
            border_thickness_edit.value = currentItem.borderThickness;
            border_thickness_edit.addEventListener("change", (e)=> this.handleBorderThicknessChange(e));

            border_radius_edit.disabled = false;
            border_radius_edit.value = currentItem.borderRadius;
            border_radius_edit.addEventListener("change", (e)=> this.handleBorderRadiusChange(e));
        }

    }

    handleTextChange = (e) => {
        let items = this.state.items;
        let currentItem = items[window.itemIndex];
        currentItem.itemText = e.target.value;

        items[window.currentIndex] = currentItem;
        this.setState({
            ...this.state,
            items:items,
            currentDataSaved: false
        });
    }

    handleFontSizeChange = (e) => {
        let items = this.state.items;
        let currentItem = items[window.itemIndex];
        currentItem.textSize = e.target.value;

        items[window.currentIndex] = currentItem;
        this.setState({
            ...this.state,
            items:items,
            currentDataSaved: false
        });
    }

    handleFontColorChange = (e) => {
        let items = this.state.items;
        let currentItem = items[window.itemIndex];
        currentItem.textColor = e.target.value

        items[window.currentIndex] = currentItem;
        this.setState({
            ...this.state,
            items: items,
            currentDataSaved : false
        });
    }

    handleBackgroundColorChange = (e) => {
        let items = this.state.items;
        let currentItem = items[window.itemIndex];
        currentItem.backgroundColor = e.target.value;

        items[window.currentIndex] = currentItem;
        this.setState({
            ...this.state,
            items: items,
            currentDataSaved: false
        });
    }

    handleBorderColorChange = (e) => {
        let items = this.state.items;
        let currentItem = items[window.itemIndex];
        currentItem.borderColor = e.target.value;

        items[window.currentIndex] = currentItem;
        this.setState({
            ...this.state,
            items: items,
            currentDataSaved: false
        });
    }

    handleBorderThicknessChange = (e) => {
        let items = this.state.items;
        let currentItem = items[window.itemIndex];
        currentItem.borderThickness = e.target.value;

        items[window.currentIndex] = currentItem;
        this.setState({
            ...this.state,
            items: items,
            currentDataSaved: false
        });
    }

    handleBorderRadiusChange = (e) => {
        let items = this.state.items;
        let currentItem = items[window.itemIndex];
        currentItem.borderRadius = e.target.value;

        items[window.currentIndex] = currentItem;
        this.setState({
            ...this.state,
            items: items,
            currentDataSaved: false
        });
    }

    renderHTML = (item) => {

        /* 
            borderWidth = borderThickness
            border = borderColor
            fontSize = textSize
            color = textColor
            background = backgroundColor
            borderColor (button)
        */

        if (item.type === "container") {
            return(<div style={{
                background: item.background,
                border: item.borderColor,
                borderWidth: item.borderThickness,
                borderRadius: item.borderRadius,
                width: "100%",
                height: "100%",
            }}
            ></div>)
        }

        else if (item.type === "label") {
            return(<span style={{
                fontSize: item.textSize,
                color: item.textColor,
                background: item.backgroundColor,
                border: item.borderColor,
                borderWidth: item.borderThickness,
                borderRadius: item.borderRadius,
                width: "100%",
                height: "100%",
            }}
            
            >{item.itemText}</span>)
        }

        else if (item.type === "button") {
            return(<button style={{
                fontSize: item.textSize,
                color: item.textColor,
                background: item.backgroundColor,
                border: item.borderColor,
                borderWidth: item.borderThickness,
                borderRadius: item.borderRadius,
                width: "100%",
                height: "100%",
                width: "100%",
                height: "100%"
            }}
            
            >{item.itemText}</button>)
        }

        else if (item.type === "textfield") {
            return(
            <input value={item.itemText} type="label" style={{
                background: item.backgroundColor,
                border: item.borderColor,
                borderWidth: item.borderThickness,
                borderRadius: item.borderRadius,
                width: "100%",
                height: "100%",
            }}
            readOnly>
            </input>
            )
        }
    }

    createNewContainer = () => {
        let newContainer = {
            type: "container",
            backgroundColor: "white",
            borderColor: "solid black",
            borderThickness: 3,
            borderRadius: 3,
            height: 50,
            width: 125,
            x: 0,
            y: 0
        }

        let tempItems = this.state.items
        tempItems.push(newContainer)

        this.setState({
            ...this.state,
            items: tempItems,
            currentDataSaved: false
        })
    }

    createNewLabel = () => {

        let newLabel = {
            type: "label",
            itemText: "Label",
            textSize: 20,
            textColor: "black",
            backgroundColor: "white",
            borderColor: "white",
            borderThickness: 3,
            borderRadius: 3,
            height: 30,
            width: 50,
            x: 0,
            y: 0
        }

        let tempItems = this.state.items
        tempItems.push(newLabel)

        this.setState({
            ...this.state,
            items: tempItems,
            currentDataSaved: false
        })
    }

    createNewButton = () => {

        let newButton = {
            key: 4,
            type: "button",
            itemText: "Submit",
            textSize: 15,
            textColor: "black",
            backgroundColor: "white",
            borderColor: "solid black",
            borderThickness: 2,
            borderRadius: 3,
            height: 30,
            width: 90,
            x: 0,
            y: 0
        }

        let tempItems = this.state.items
        tempItems.push(newButton)

        this.setState({
            ...this.state,
            items: tempItems,
            currentDataSaved: false
        })
    }

    createNewTextfield = () => {

        let newTextField = {
            type: "textfield",
            itemText: "Input",
            textSize: 20,
            textColor: "black",
            backgroundColor: "white",
            borderColor: "solid black",
            borderThickness: 2,
            borderRadius: 3,
            height: 25,
            width: 130,
            x: 0,
            y: 0
        }

        let tempItems = this.state.items
        tempItems.push(newTextField)

        this.setState({
            ...this.state,
            items: tempItems,
            currentDataSaved: false
        })
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
            this.setInitialState();
        }
        this.newTimeSet = true
        
        return (
            
            <div className="row">
                <div className="col s2 grey lighten-2" style={{height: "650px"}}>
                    <div>
                        <i className="material-icons" id="zoom_in">zoom_in</i>
                        <i className="material-icons" id="zoom_out">zoom_out</i>
                        <button className="btn-small" id="save_button" onClick={this.handleSave}>Save</button>
                        <button className="btn-small" id="close_button" onClick={this.handleClose}>Close</button>
                    </div>
                </div>

                <label className="name_label">Name</label>
                <input className="name_textfield" defaultValue={this.props.todoList.name} type="label" style={{color: "black"}}></input>

                <div className="container_picture" onClick={this.createNewContainer}></div>
                <span class="container_text">Container</span>

                <span className="prompt_for_input_text" onClick={this.createNewLabel}>Prompt for Input:</span>
                <label className="prompt_for_input_label">Label</label>

                <button className="wireframe_button" onClick={this.createNewButton}>Submit</button>
                <label className="button_label">Button</label>

                <div className="wireframe_textfield_div" onClick={this.createNewTextfield}>
                    <input className="wireframe_textfield" value="Input" type="label" style={{color: "darkgrey"}} readOnly></input>
                </div>
                <label className="textfield_label">Textfield</label>

                <div className='col s8' style={{height:'650px'}}>
                    <div id="canvas">
                        <div>
                        {this.state.items.map((item, index) => {
                            return (
                                <Rnd style={{/*border: "2px dotted red"*/}}
                            
                            default={{
                                x: item.x,
                                y: item.y,
                                width: item.width,
                                height: item.height
                            }}
                            
                            /*
                            size={{
                                width: item.width,
                                height: item.height
                            }}
                            */

                            /*
                            position={{
                                x: item.x,
                                y: item.y
                            }}
                            */

                            onDragStop={(event, destination) => this.changeObjectLocation(index, event, destination)}
                            onResizeStop={(event, direction, ref, delta, position) => this.resizeObject(index, event, direction, ref, delta, position)}

                            minWidth={55}
                            minHeight={20}
                            bounds="#canvas"
                            >
                            {this.renderHTML(item)}
                            </Rnd>
                            )})}
                        </div>
                    </div>
                </div>

                <div className='col s2 grey lighten-2' style={{height:'650px'}}></div>
                <span class="properties_text">Properties</span>
                <div className="wireframe_textfield_edit_div">
                    <input className="wireframe_textfield_edit" defaultValue="Submit" type="text" style={{color: "darkgrey"}}></input>
                </div>

                <span class="font_size_text">Font Size:</span>
                <div className="wireframe_font_size_edit_div">
                    <input className="wireframe_font_size_edit" defaultValue="14" type="text" style={{color: "darkgrey"}}></input>
                </div>

                <span class="font_color_text">Font Color:</span>
                <input className="font_color_picker" name="Color Picker" type="color" disabled/>

                <span class="background_color">Background:</span>
                <input className="background_color_picker" name="Color Picker" type="color" disabled/>

                <span class="border_color_text">Border Color:</span>
                <input className="border_color_picker" name="Color Picker" type="color" disabled/>

                <span class="border_thickness_text">Border Thickness:</span>
                <div className="wireframe_border_thickness_edit_div">
                    <input className="wireframe_border_thickness_edit" defaultValue="2" type="text" style={{color: "darkgrey"}}></input>
                </div>

                <span class="border_radius_text">Border Radius:</span>
                <div className="wireframe_border_radius_edit_div">
                    <input className="wireframe_border_radius_edit" defaultValue="2" type="text" style={{color: "darkgrey"}}></input>
                </div>
                <ModalYesNoCloseDialog historyURL={this.props.history} userId={auth.uid}/>
                <button onClick={() => this.debug()}>DEBUG</button>
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
)(WireframeScreen);