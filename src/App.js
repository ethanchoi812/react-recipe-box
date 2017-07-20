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
    this.state = {changedTitle:''};

		this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTitleChange(e){

    this.setState({changedTitle: e.target.value});
  }

  handleSubmit(e){
    const changedTitle = this.state.changedTitle;
    this.props.onHandleSubmit(changedTitle);
    return false;
  }

	render(){

		  const recipe = this.props.recipe;
	    const title = recipe.title;
	    const ingredients = recipe.ingredients;
	    const description = recipe.description;

	    //const changedTitle = this.state.changedTitle;

		return(
			     <section className="recipe-sandbox">
	            <h2 onDoubleClick={this.handleTitleClick} >{title}</h2>
	            <form>
	              <input type="text" onChange={this.handleTitleChange} />
                <input type="submit" onSubmit={this.handleSubmit} />
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
      	ingredients:[],
      	description:''
  	  }]
    }

    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleOpenEdit(i){
    this.setState({clickedRecipe:i});
  }

  handleSubmit(changedTitle){
    
    const theRecipes = this.state.recipes;
    const newRecipe = this.state.clickedRecipe;
    const n = newRecipe.id;

    newRecipe.title = changedTitle;

    theRecipes.splice(n, 1, newRecipe);
    this.setState({ recipes: theRecipes });

  }

  render() {
    const recipes = this.state.recipes;
    const clickedRecipe = this.state.clickedRecipe;

    return (
      <div className="App">
        <div className="App-header">
          <h2>React Recipe Box</h2>
        </div>
        {recipes.map(recipe=> <Card recipe={recipe} onDoubleClick={this.handleOpenEdit} /> )}

          <Editor recipe={clickedRecipe} onHandleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
