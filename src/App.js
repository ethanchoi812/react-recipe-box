import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css';
import './App.css';


class Card extends Component {    
  render(){
    const recipe = this.props.recipe;
    const title = recipe.title;
    
    return(
    <section className="recipe-card" onDoubleClick={()=>this.props.onDoubleClick(recipe)}>
      <h2>{title}</h2>
    </section>
    );
     
  }
}

class Viewer extends Component {
	constructor(props){
		super(props);
    	this.state = {
    	
	    	changedTitle:'',          
        changedIng: '',         
        changedNotes:'',
        showInput:false,
    	};

  		this.handleInputChange = this.handleInputChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleHide = this.handleHide.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
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
	    showInput:false,

    });
  }

  handleHide(e){
    const hide_editor = 'editor';
    this.props.onHandleHideWindow(hide_editor);
  }

  handleEdit(e) {
    this.setState({showInput:true})
  }

  render(){

	const recipe = this.props.recipe;
	const title = recipe.title;
	const ingredients = recipe.ingredients;
	const notes = recipe.notes;
  const showInput = this.state.showInput;

		return(
			<section className="recipe-viewer">
          		<i onClick={this.handleHide} className="fa fa-close"></i>
	         	<h2 data-name="title">{title}</h2>
	         	<form className="recipe-form" onSubmit={this.handleSubmit}>
              	{showInput ?
              		<input name="changedTitle" type="text" defaultValue={title} onChange={this.handleInputChange}/>
              		: null}
  	              <div className="viewer-body">
  	                <h3>Ingredients</h3>
  	                <ul>
  	                {ingredients !== undefined ? 
  	              	  ingredients.map( item =>
  	                  <li data-name="ing">{item}</li>) : null
  	                  }
  	                </ul>
	                  {showInput ?
	                    <input name="changedIng" type="text" defaultValue={ingredients.join(',')} onChange={this.handleInputChange} />
	                    : null}
  	              	<h3>Notes</h3>
  	                <p data-name="notes">{notes}</p>
	                  {showInput ?
	                    <textarea name="changedNotes" defaultValue={notes} onChange={this.handleInputChange} />
	                    : null}
                    {showInput ?
                      <input type="submit" value="Submit"/>
                      : null}
	  	          </div> 
	            </form>
	            <span className="remove-recipe" onClick={()=>this.props.onClickRemove(recipe)}>
	              <i className="fa fa-remove"></i> Delete
	            </span>
	            <span className="edit-recipe" onClick={this.handleEdit}>
	              <i className="fa fa-gear"></i> Edit
	            </span>            
	        </section>
          );
		}
	}

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
      <section className="recipe-adder">
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
      );
    }
  }

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: [],
      recipes_count: 0,
      clickedRecipe: [],
      show_addnew: false,
      show_editor: false,
      showInput: false
    }

    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);
    this.handleAddNewRecipe = this.handleAddNewRecipe.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleHideWindow = this.handleHideWindow.bind(this);
  }

  componentDidMount(){
  	const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  	const storedCount = Number(localStorage.getItem("recipes_count")) || 0;
  	
  	this.setState({
  		recipes: storedRecipes,
  		recipes_count: storedCount
  	});
  }

  handleOpenAdd(e){
  	e.preventDefault();
    this.setState({show_addnew:true});
  }

  handleAddNewRecipe(addedRecipe){
    const theRecipes = this.state.recipes.slice();
    let count = this.state.recipes_count + 1;

    addedRecipe.id = count;
    theRecipes.push(addedRecipe);
    this.setState({ 
    	recipes: theRecipes,
    	recipes_count: count
    });
    
    localStorage.setItem("recipes", JSON.stringify(theRecipes));
    localStorage.setItem("recipes_count", JSON.stringify(count));

    this.setState({show_addnew: false});
  }

  handleRemove(removedRecipe){
    const theRecipes = this.state.recipes.slice();
    const removeIdx = theRecipes.findIndex(recipe => recipe === removedRecipe);

    theRecipes.splice(removeIdx, 1);
    this.setState({ 
      recipes: theRecipes,
      show_editor: false
    });
    
    localStorage.setItem("recipes", JSON.stringify(theRecipes));
  }


  handleOpenEdit(recipe){
    this.setState({
    	show_editor:true,
    	clickedRecipe:recipe,
    	showInput: false
    });
  }

  handleSubmitEdit(changedRecipe){
    const theRecipes = this.state.recipes.slice();
    const clickedRecipe = this.state.clickedRecipe;
    const n = clickedRecipe.id;
    const idx = theRecipes.findIndex(recipe => recipe.id === n);

    const newRecipe = clickedRecipe;

    if(changedRecipe.title !== ''){
      newRecipe.title = changedRecipe.title;
    }

    if(changedRecipe.ingredients[0] !== ''){
      newRecipe.ingredients = changedRecipe.ingredients;
    }

    if(changedRecipe.notes !== ''){
      newRecipe.notes = changedRecipe.notes;
    }

    theRecipes.splice(idx, 1, newRecipe);
    this.setState({ recipes: theRecipes });
    localStorage.setItem("recipes", JSON.stringify(theRecipes));
  }

  handleHideWindow(windowToHide){
    windowToHide === 'editor' ?
    this.setState({show_editor: false}) : this.setState({show_addnew:false})
  }

  render() {
    const recipes = this.state.recipes;
    const clickedRecipe = this.state.clickedRecipe;
    const show_addnew = this.state.show_addnew;
    const show_editor = this.state.show_editor;
    const hideInput = this.state.hideInput;

    return (
      <div className="App">
      <div className="overlay">
        <div className="App-header">
          <h2>React Recipe Box</h2>
        </div>
        <section className="App-body">
        	<button className="add-btn" onClick={this.handleOpenAdd}>
        		<i className="fa fa-plus"></i>
        		&nbsp;Add a recipe
        	</button>
            <section className="card-body">
            {show_addnew ?
            	<AddRecipe onHandleAddRecipe={this.handleAddNewRecipe} onHandleHideWindow={this.handleHideWindow} /> : null}
            {recipes.length > 0 
          	? recipes.map(recipe =>
              <Card recipe={recipe} onDoubleClick={this.handleOpenEdit} /> )
          	: null}
          {show_editor ?
            <Viewer recipe={clickedRecipe} onHandleEdit={this.handleSubmitEdit} onClickRemove={this.handleRemove} onHandleHideWindow={this.handleHideWindow} hideInput={hideInput} />
            : null}
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
