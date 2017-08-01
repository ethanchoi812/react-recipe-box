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
      <i onClick={()=>this.props.onClickRemove(recipe)} className="fa fa-2x fa-remove"></i>
    </section>
    );
     
  }
}

class Editor extends Component {
	constructor(props){
		super(props);
    	this.state = {
    		changedTitle:'',
        show_title_input:false,
        
        changedIng: [],
        show_ing_input:false,
        
        changedDes:'',
        show_des_input:false,
    	};

    this.handleClick = this.handleClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleClick(e){
    const show_input = "show_" + e.target.getAttribute("data-name") + "_input";
    console.log(show_input);
    this.setState({
      [show_input]: true
    });
  }

  handleInputChange(e){
    const name = e.target.name;

    this.setState({
      [name]: e.target.value});
  }

  handleSubmit(e){
  	e.preventDefault();
  	
  	const [changedTitle, changedIng, changedDes] = 
      [this.state.changedTitle, this.state.changedIng, this.state.changedDes];

      if(changedTitle === '' && changedIng === '' && changedDes === ''){
        return false;
      
      } 

        const changedProps = [changedTitle, changedIng, changedDes];

        this.props.onHandleSubmit();
        this.setState({changedTitle:''});
        this.setState({show_title_input:false});
  }

	render(){

		const recipe = this.props.recipe;
		const originalTitle = recipe.title;
		const ingredients = recipe.ingredients;
		const description = recipe.description;
    const showTitleInput = this.state.show_title_input;
    const showIngInput = this.state.show_ing_input;
    const showDesInput = this.state.show_des_input;

		return(
			   <section className="recipe-sandbox">
	         <h2 data-name="title" onDoubleClick={this.handleClick}>{originalTitle}</h2>
	         <form onSubmit={this.handleSubmit}>
              {showTitleInput ? 
	              <input name="changedTitle" value={this.state.changedTitle} type="text" onChange={this.handleInputChange} />
                : null}
                
  	            <div className="sandbox-body">
  	              <h3>Ingredients</h3>
  	              <ul>
  	              {ingredients !== undefined ? 
  	              	ingredients.map( item =>
  	                <li data-name="ing" onDoubleClick={this.handleClick}>{item}</li>) : null
  	                }
  	              </ul>
                  {showIngInput ?
                    <input name="changedIng" value={this.state.changedIng} type="text" onChange={this.handleInputChange} />
                    : null}
  	              <h3>Description</h3>
  	              <p data-name="des" onDoubleClick={this.handleClick}>{description}</p>
                  {showDesInput ?
                    <input name="changedDes" value={this.state.changedDes} type="text" onChange={this.handleInputChange} />
                    : null}
  	            </div> 
              <input type="submit" value="Submit"/>
            </form>            
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

    if(title === '' && ingredients.length === 0 && description === ''){
    	return false;
    } else {
     this.props.onHandleAddRecipe(addedRecipe); 
    }

    this.setState({
    	  newRecipe: [],
        titleVal:'',
        ingredientsVal:'',
        descriptionVal:''
    });
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
      recipes: [],
      recipe_count: 0,
      clickedRecipe: [],
      show_addnew: false,
      show_editor: false,
    }

    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);
    this.handleAddNewRecipe = this.handleAddNewRecipe.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount(){
  	const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  	const storedCount = Number(localStorage.getItem("recipe_count")) || 0;
  	
  	this.setState({
  		recipes: storedRecipes,
  		recipe_count: storedCount
  	});
  }

  handleOpenAdd(e){
  	e.preventDefault();
    this.setState({show_addnew:true});
  }

  handleAddNewRecipe(addedRecipe){
    const theRecipes = this.state.recipes.slice();
    let count = this.state.recipe_count + 1;

    addedRecipe.id = count;
    theRecipes.push(addedRecipe);
    this.setState({ 
    	recipes: theRecipes,
    	recipe_count: count
    });
    
    localStorage.setItem("recipes", JSON.stringify(theRecipes));
    localStorage.setItem("recipes_count", JSON.stringify(count));

    this.setState({show_addnew: false});
  }

  handleRemove(removedRecipe){
    const theRecipes = this.state.recipes.slice();
    const removeIdx = theRecipes.findIndex(recipe => recipe === removedRecipe);

    console.log(removeIdx);
    theRecipes.splice(removeIdx, 1);
    this.setState({ 
      recipes: theRecipes,
    });
    
    localStorage.setItem("recipes", JSON.stringify(theRecipes));
  }


  handleOpenEdit(recipe){
    this.setState({
    	show_editor:true,
    	clickedRecipe:recipe
    });
  }

  handleSubmit(changedTitle){
    
    const theRecipes = this.state.recipes.slice();
    const newRecipe = this.state.clickedRecipe;
    const n = newRecipe.id;
    const idx = theRecipes.findIndex(recipe => recipe.id === n);

    newRecipe.title = changedTitle;

    theRecipes.splice(idx, 1, newRecipe);
    this.setState({ recipes: theRecipes });
    localStorage.setItem("recipes", JSON.stringify(theRecipes));
  }

  render() {
    const recipes = this.state.recipes;
    const clickedRecipe = this.state.clickedRecipe;
    const show_addnew = this.state.show_addnew;
    const show_editor = this.state.show_editor;

    return (
      <div className="App">
        <div className="App-header">
          <h2>React Recipe Box</h2>
          <button className="add-btn" onClick={this.handleOpenAdd}>Add Recipe</button>
        </div>
        {recipes.length > 0 
        	? recipes.map(recipe =>
            <Card recipe={recipe} onDoubleClick={this.handleOpenEdit} onClickRemove={this.handleRemove}/> )
        	: null}
        {show_editor ?
          <Editor recipe={clickedRecipe} onHandleSubmit={this.handleSubmit}/> : null}
          {show_addnew ?
          <AddRecipe onHandleAddRecipe={this.handleAddNewRecipe}/> : null}
      </div>
    );
  }
}

export default App;
