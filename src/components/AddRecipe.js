import React, { Component } from 'react';

class AddRecipe extends Component {
  constructor(props){
    super(props);
    this.state = {
        newRecipe: [],
        titleVal:'',
        ingredientsVal:'',
        notesVal:''
      }

    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleTitleChange(e){
    this.setState({ titleVal: e.target.value });
  }

  handleIngredientsChange(e){
    this.setState({ ingredientsVal: e.target.value });
  }

  handleNotesChange(e){
    this.setState({ notesVal: e.target.value });
  }

  handleAddRecipe(e){
    e.preventDefault();
    
    const title = this.state.titleVal;
    const ingredients = this.state.ingredientsVal.split(',');
    const notes = this.state.notesVal;
    const addedRecipe = {title: title, ingredients: ingredients, notes: notes};

    if(title === '' && ingredients[0] === '' && notes === ''){
    	return false;

    } else {
     this.props.onHandleAddRecipe(addedRecipe); 
    }

    this.setState({
    	newRecipe: [],
        titleVal:'',
        ingredientsVal:'',
        notesVal:''
    });
  }

  handleHide(e){
    const hide_addnew = 'addnew';
    this.props.onHandleHideWindow(hide_addnew);
  }

  render(){
    return(
    	<div className="recipe-modal">
	      <section className="recipe-content">
	        <i onClick={this.handleHide} className="fa fa-close"></i>
	        <form className="recipe-form" onSubmit={this.handleAddRecipe}>
	          <label>Title
	            <input value={this.state.titleVal} type="text" placeholder="Enter title of recipe" onChange={this.handleTitleChange} />
	          </label>
	          <label>Ingredients
	            <input value={this.state.ingredientsVal} type="text" placeholder="Enter ingredients separated by comma.." onChange={this.handleIngredientsChange} />
	          </label>
	          <label>Notes
	            <textarea value={this.state.notesVal} placeholder="Enter description, notes, etc." onChange={this.handleNotesChange} />
	          </label>
	            <input type="submit" value="Submit"/>
	        </form>    
	      </section>
	    </div>
      );
    }
  }

export default AddRecipe;