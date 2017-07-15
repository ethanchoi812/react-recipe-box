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
    <section className="recipe-card" id="card-01" recipe={recipe} onClick={()=>this.props.onClick(recipe)}>
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

		this.handleTitleChange = this.handleTitleChange.bind(this);
	}

	handleTitleChange(e){
  		this.props.onTitleChange(e.target.value);
  	}

	render(){

		const recipe = this.props.recipe;
	    const title = recipe.title;
	    const ingredients = recipe.ingredients;
	    const description = recipe.description;

	    const clickedTitle = this.props.clickedTitle;

		return(
			<section className="recipe-sandbox">
	            <h2 onDoubleClick={this.handleTitleClick} >{title}</h2>
	            <form>
	              <input value={clickedTitle} onChange={this.handleTitleChange} />
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
        title:'some recipe',
        ingredients:['apple','orange','egg'],
        description:'none'
      },
      {
        title:'recipe two',
        ingredients:['flour','pear','water'],
        description:'lorem lipsum'
      },
      {
        title:'third recipe',
        ingredients:['chicken','beef','carrot'],
        description:'moron isum'
      }],

      clickedRecipe: [{
      	title:'',
      	ingredients:[],
      	description:''
  	  }],

  	  clickedTitle:''
    }

    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }


  handleOpenEdit(i){
    this.setState({clickedRecipe:i});
  }

  handleTitleClick(clickedTitle){
  	let oTitle = this.state.clickedRecipe.title;
  	console.log(oTitle);
  	this.setState({clickedTitle:oTitle});
  }

  render() {
    const recipes = this.state.recipes;
    const clickedRecipe = this.state.clickedRecipe;

    return (
      <div className="App">
        <div className="App-header">
          <h2>React Recipe Box</h2>
        </div>
        {recipes.map(recipe=> <Card recipe={recipe} onClick={this.handleOpenEdit} /> )}

          <Editor recipe={clickedRecipe} onTitleChange={this.handleTitleChange} />
      </div>
    );
  }
}

export default App;
