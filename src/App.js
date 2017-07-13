import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css';
import './App.css';

function Card(props){

    const recipe = props.recipe;
    const title = recipe.title;
    const ingredients = recipe.ingredients;
    const description = recipe.description;

    return(
    <section className="recipe-card" id="card-01" recipe={recipe} onClick={props.onClick}>
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

class Board extends Component {
  renderCard(i){
    <Card recipe={i} onClick={()=>this.props.onClick(i)}/>
  }

  render(){

    const recipes = this.props.recipes;


     return(
      <div>
      {recipes.map(recipe=>{this.renderCard(recipe)})}
      </div>
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
    }

    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleSandboxChange = this.handleSandboxChange.bind(this);
  }


  handleOpenEdit(i){
    this.setState({clickedRecipe:i});
    console.log(this.state.clickedRecipe);
  }

  handleSandboxChange(recipe){
    this.setState({
      showSandbox:!this.state.showSandbox,
    });
  }

  render() {
    const recipes = this.state.recipes;
    const showSandbox = this.state.showSandbox;

    return (
      <div className="App">
        <div className="App-header">
          <h2>React Recipe Box</h2>
        </div>
        {recipes.map(recipe=> <Card i={recipe}/> )}

          <section className="recipe-sandbox" recipe={this.props.recipe}>
            <h2 onDoubleClick={ ()=>{alert('edit me!')}} >Recipe title</h2>
            <form onBlur={console.log('on blur')}>
              <input value={"recipe title"} />
            </form>
            <div className="sandbox-body">
              <h3>Ingredients</h3>
              <ul>
                <li onDoubleClick={ ()=>{alert('edit me!')} }>item 1</li>
                <li onDoubleClick={ ()=>{alert('edit me!')} }>item 2</li>
              </ul>
              <h3>Description</h3>
              <p onDoubleClick={ ()=>{alert('edit me!')} }>Some description</p>
            </div>
          </section>
      </div>
    );
  }
}

export default App;
