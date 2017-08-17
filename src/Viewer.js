import React, { Component } from 'react';
import Form from './Form.js';

class Viewer extends Component {
	constructor(props){
		super(props);
    	this.state = {
    	
	    	changedTitle:'',          
        changedIng: '',         
        changedNotes:'',
    	};

  		this.handleInputChange = this.handleInputChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleHide = this.handleHide.bind(this);
      this.onToggleEdit = this.onToggleEdit.bind(this);
	}

  handleInputChange(e){
    const name = e.target.name;

    this.setState({
      [name]: e.target.value});
  }

  handleSubmit(e){
  	e.preventDefault();
  	
  	const title = this.state.changedTitle;
    const ingredients = this.state.changedIng.split(',');
    const notes = this.state.changedNotes;
    const changedRecipe = {title: title, ingredients: ingredients, notes: notes};

    if(title === '' && ingredients[0] === '' && notes === ''){
      return false;

    } else {
    
     this.props.onHandleEdit(changedRecipe); 
    }

    this.setState({
    	changedTitle:'',	        
	    changedIng: '',	        
	    changedNotes:'',
    });
  }

  handleHide(e){
    const hide_editor = 'editor';
    this.props.onHandleHideWindow(hide_editor);
  }

  onToggleEdit(e) {
    this.props.onToggleEdit();
  }

  render(){

	const recipe = this.props.recipe;
	const title = recipe.title;
	const ingredients = recipe.ingredients;
	const notes = recipe.notes;
  const hideInput = this.props.hideInput;

		return(
			<div className="recipe-modal">
			  <section className="recipe-content">
          		<i onClick={this.handleHide} className="fa fa-close"></i>
	           { !hideInput ?	<Form recipe={recipe} /> :
	              <div>
		              <h2 data-name="title">{title}</h2>
		              <div className="viewer-body">
		                <h3>Ingredients</h3>
		                  <ul>
		                  {ingredients !== undefined ? 
		                    ingredients.map( item =>
		                    <li data-name="ing">{item}</li>) : null
		                    }
		                  </ul>
		                <h3>Notes</h3>
		                <p data-name="notes">{notes}</p>
		              </div>
	                </div>
	              }
  	            <span className="remove-recipe" onClick={()=>this.props.onClickRemove(recipe)}>
  	              <i className="fa fa-remove"></i> Delete
  	            </span>
  	            <span className="edit-recipe" onClick={this.onToggleEdit}>
  	              <i className="fa fa-gear"></i> Edit
  	            </span>     
	           </section>
	         </div>
          );
		}
	}


export default Viewer;