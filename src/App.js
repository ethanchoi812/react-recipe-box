import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css';
import './App.css';


class Card extends Component {    

  render(){
    const recipe = this.props.recipe;
    const title = recipe.title;
    const ingredients = recipe.ingredients;
    const description = recipe.description;

    return(
    <section className="recipe-card" onDoubleClick={()=>this.props.onDoubleClick(recipe)}>
      <h2>{title}</h2>
      <div className="recipe-body">
        <h3>Ingredients</h3>
        <ul>
        {ingredients.map(item =>
          <li>{item}</li>
          )}
        </ul>
        <h3>Description</h3>
        <p>{description}</p>
      </div>
    </section>
    );
     
  }
}

class Editor extends Component {
	constructor(props){
		super(props);
    	this.state = {
    		changedTitle:''
    	};

		this.handleTitleChange = this.handleTitleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleTitleChange(e){

    this.setState({changedTitle: e.target.value});
  }

  handleSubmit(e){
  	e.preventDefault();
  	
  	const changedTitle = this.state.changedTitle;
    this.props.onHandleSubmit(changedTitle);
    this.state = {
    	changedTitle:''
    };
  }

	render(){

		const recipe = this.props.recipe;
	   const title = recipe.title;
	   const ingredients = recipe.ingredients;
	   const description = recipe.description;

	    //const changedTitle = this.state.changedTitle;

		return(
			   <section className="recipe-sandbox">
	            <h2 onDoubleClick={this.handleTitleClick}>{title}</h2>
	            <form onSubmit={this.handleSubmit}>
	              <input value={this.state.changedTitle} type="text" onChange={this.handleTitleChange} />
                  <input type="submit" value="Submit"/>
                </form>
  	            <div className="sandbox-body">
  	              <h3>Ingredients</h3>
  	              <ul>
  	              {ingredients !== undefined ? 
  	              	ingredients.map( item =>
  	                <li onDoubleClick={ ()=>{alert('edit me!')} }>{item}</li>) : null
  	                }
  	              </ul>
  	              <h3>Description</h3>
  	              <p onDoubleClick={ ()=>{alert('edit me!')} }>{description}</p>
  	            </div>             
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
        descriptionVal:''
      }

    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleTitleChange(e){
    this.setState({ titleVal: e.target.value });
  }

  handleIngredientsChange(e){
    this.setState({ ingredientsVal: e.target.value });
  }

  handleDescriptionChange(e){
    this.setState({ descriptionVal: e.target.value });
  }

  handleAddRecipe(e){
    e.preventDefault();
    
    const title = this.state.titleVal;
    const ingredients = this.state.ingredientsVal.split(',');
    const description = this.state. descriptionVal;
    const addedRecipe = {title, ingredients, description};

    this.props.onHandleAddRecipe(addedRecipe); 
  }

  render(){
    return(
      <section className="recipe-sandbox">
        <form onSubmit={this.handleAddRecipe}>
          <label>Title</label>
            <input value={this.state.titleVal} type="text" onChange={this.handleTitleChange} />
          <label>Ingredients</label>
            <input value={this.state.ingredientsVal} type="text" onChange={this.handleIngredientsChange} />
          <label>Description</label>
            <input value={this.state.descriptionVal} type="textarea" onChange={this.handleDescriptionChange} />
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
      recipes:[
      { 
        id: 0,
        title:'some recipe',
        ingredients:['apple','orange','egg'],
        description:'none'
      },
      {
        id: 1,
        title:'recipe two',
        ingredients:['flour','pear','water'],
        description:'lorem lipsum'
      },
      {
        id: 2,
        title:'third recipe',
        ingredients:['chicken','beef','carrot'],
        description:'moron isum'
      }],

      clickedRecipe: [{
        id:'',
      	title:'',
      	value:'',
      	ingredients:[],
      	description:''
  	  }],

      count: 0
    }

    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);
    this.handleAddNewRecipe = this.handleAddNewRecipe.bind(this);
  }


  handleOpenEdit(i){
    this.setState({clickedRecipe:i});
  }

  handleSubmit(changedTitle){
    
    const theRecipes = this.state.recipes;
    const newRecipe = this.state.clickedRecipe;
    const n = newRecipe.id;
    const idx = theRecipes.findIndex(recipe => recipe.id === n);

    newRecipe.title = changedTitle;

    theRecipes.splice(idx, 1, newRecipe);
    this.setState({ recipes: theRecipes });
  }

  handleOpenAdd(e){
    alert("it is opened!");
  }

  handleAddNewRecipe(addedRecipe){
    const theRecipes = this.state.recipes;
    const count = this.state.count;

    addedRecipe.id = count + 1;
    theRecipes.push(addedRecipe);
    this.setState({ recipes: theRecipes });
  }

  render() {
    const recipes = this.state.recipes;
    const clickedRecipe = this.state.clickedRecipe;

    return (
      <div className="App">
        <div className="App-header">
          <h2>React Recipe Box</h2>
          <button className="add-btn" onClick={this.handleOpenAdd}>Add Recipe</button>
        </div>
        {recipes.map(recipe=> <Card recipe={recipe} onDoubleClick={this.handleOpenEdit} /> )}
          <Editor recipe={clickedRecipe} onHandleSubmit={this.handleSubmit}/>
          <AddRecipe onHandleAddRecipe={this.handleAddNewRecipe}/>
      </div>
    );
  }
}

export default App;
