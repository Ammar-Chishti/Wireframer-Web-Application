import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import ListTrash from './ListTrash';
import { ModalYesNoDialog } from '../home_screen/ModalYesNoDialog.js';
import ItemScreen from '../item_screen/ItemScreen'

class WireframeScreen extends Component {
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
            
            <div className="row">
                <div className="col s2 grey lighten-2" style={{height: "650px"}}>
                    <div>
                        <i className="material-icons" id="zoom_in">zoom_in</i>
                        <i className="material-icons" id="zoom_out">zoom_out</i>
                        <button className="btn-small" id="save_button">Save</button>
                        <button className="btn-small" id="close_button">Close</button>
                    </div>
                </div>
                <div className="container_picture"></div>
                <span class="container_text">Container</span>

                <span className="prompt_for_input_text">Prompt for Input:</span>
                <label className="prompt_for_input_label">Label</label>

                <button className="wireframe_button">Submit</button>
                <label className="button_label">Button</label>

                <div className="wireframe_textfield_div">
                    <input className="wireframe_textfield" value="Input" type="text" style={{color: "darkgrey"}}></input>
                </div>
                <label className="textfield_label">Textfield</label>

                <div className='col s8' style={{height:'650px'}}>
                    <div className="canvas"></div>
                </div>

                <div className='col s2 grey lighten-2' style={{height:'650px'}}></div>
                <span class="properties_text">Properties</span>
                <div className="wireframe_textfield_edit_div">
                    <input className="wireframe_textfield_edit" value="Submit" type="text" style={{color: "darkgrey"}}></input>
                </div>

                <span class="font_size_text">Font Size:</span>
                <div className="wireframe_font_size_edit_div">
                    <input className="wireframe_font_size_edit" value="14" type="text" style={{color: "darkgrey"}}></input>
                </div>

                <span class="font_color_text">Font Color:</span>
                <input className="font_color_picker" name="Color Picker" type="color" disabled/>

                <span class="background_color">Background:</span>
                <input className="background_color_picker" name="Color Picker" type="color" disabled/>

                <span class="border_color_text">Border Color:</span>
                <input className="border_color_picker" name="Color Picker" type="color" disabled/>

                <span class="border_thickness_text">Border Thickness:</span>
                <div className="wireframe_border_thickness_edit_div">
                    <input className="wireframe_border_thickness_edit" value="2" type="text" style={{color: "darkgrey"}}></input>
                </div>

                <span class="border_radius_text">Border Radius:</span>
                <div className="wireframe_border_radius_edit_div">
                    <input className="wireframe_border_radius_edit" value="2" type="text" style={{color: "darkgrey"}}></input>
                </div>



            </div>
            

            /*
           <div className="row">
                <div className="col s2 grey" style={{height:'650px'}}>
                <span>
                    <i className="material-icons">zoom_in</i>
                    <i className="material-icons">zoom_out</i>
                    <button className="btn-small">Save</button>
                    <button className="btn-small">Close</button>
                </span>
                <br></br>
                <br></br>
                <textarea className="white"rows="4" cols="50" disabled></textarea>
                <br></br>
                <br></br>
                <div style={{textAlign:"center"}}>Container</div>
                <br></br>
                <br></br>
                <br></br>
                <div style={{textAlign:"center"}}>Prompt for Input:</div>
                <div style={{textAlign:"center"}}>Label</div>
                <br></br>
                <br></br>
                <br></br>
                <div style={{textAlign:"center"}}>
                    <button style={{textAlign:"center"}}>Submit</button>
                </div>
                <br></br>
                <div style={{textAlign:"center"}}>Button</div>
                <br></br>
                <br></br>
                <br></br>
                <div className="input-field">
                    <label style={{color:"darkgrey"}}>Input</label>
                    <input disabled/>
                </div> 
                <div style={{textAlign:"center"}}>Textfield</div>
                <br></br>
                <br></br>
                <br></br>
                </div>

                <div className='col s8' style={{height:'650px'}}>
                    <div id="canvas" style={{height:'650px',width: '100%', border:"solid"}}></div>
                </div>

                <div className='col s2 grey lighten-2' style={{height:'650px'}}>
                <div style={{textAlign:"center"}}>Properties</div>
                <br></br>
                <br></br>
                <br></br>
                <div className="input-field">
                    <label style={{color:"darkgrey"}}>text</label>
                    <input disabled/>
                </div>
                <br></br>
                <span>
                    <span>Background: </span>
                    <input id="background" name="Color Picker" type="color" disabled/>
                </span>
                <br></br>
                <br></br>
                <span>
                    <span>Border Color: </span>
                    <input id="borderColor" name="Color Picker" type="color" disabled/>
                </span>
                <br></br>
                <br></br>
                <br></br>
                <span><span>Border Thickness: </span>
                <div className="input-field">
                    <input id="borderThickness" disabled/>
                </div>
                </span>
                <br></br>
                <span><span>Border Radius: </span>
                <div className="input-field">
                    <input id="borderRadius" disabled/>
                </div>
                </span>
                <br></br>
                <br></br>
                </div>
            </div>
            */


            /*
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
            */
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