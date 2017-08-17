import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import AddRecipe from './AddRecipe.js';
import Card from './Card.js';
import Viewer from './Viewer.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: [{
      	title: "My first recipe!",
      	ingredients: ["Acme1", "Acme2", "Acme3"],
      	notes: "This is your first recipe! Edit or delete."
      }],
      recipes_count: 1,
      clickedRecipe: [],
      show_addnew: false,
      show_editor: false,
      hideInput: true
    }

    this.handleOpenViewer = this.handleOpenViewer.bind(this);
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);
    this.handleAddNewRecipe = this.handleAddNewRecipe.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleHideWindow = this.handleHideWindow.bind(this);
  }

  componentDidMount(){
  	const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || this.state.recipes;
  	const storedCount = Number(localStorage.getItem("recipes_count")) || this.state.recipes_count;
  	
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


  handleOpenViewer(recipe){
    this.setState({
    	show_editor:true,
    	clickedRecipe:recipe,
    	hideInput: true
    });
  }

  handleToggleEdit(e){

  	this.setState(prevState =>({
  		hideInput:!prevState.hideInput
    }));
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
        	{show_addnew ?
           	<AddRecipe onHandleAddRecipe={this.handleAddNewRecipe} onHandleHideWindow={this.handleHideWindow} /> : null}
          {show_editor ?
            <Viewer recipe={clickedRecipe} hideInput={hideInput} onHandleEdit={this.handleSubmitEdit} onToggleEdit={this.handleToggleEdit} onClickRemove={this.handleRemove} onHandleHideWindow={this.handleHideWindow} />
            : null}
            <section className="card-body">
            {recipes.length > 0 
          	? recipes.map(recipe =>
              <Card recipe={recipe} onDoubleClick={this.handleOpenViewer} /> )
          	: null}
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
