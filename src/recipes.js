import React, { Component } from 'react';

class Recipes extends Component {
	constructor(props){
		super(props);
		this.state = { recipes:
			[{
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
			}]
		}

		this.handleEdit = this.handleEdit.bind(this);
	}

	handleEdit(e){
		console.log('Edit me'); 
	}
  
	  render() {

	  	const recipeArr = this.state.recipes;
	  	const recipeList = recipeArr.map(recipe =>
	  		<section className="recipe-card" onClick={this.handleEdit}>
		  		<h2>{recipe.title}</h2>
		  		<div className="recipe-body">
			  		<h3>Ingredients</h3>
			  		<ul>
			  		{recipe.ingredients.map(item=>
			  			<li>{item}</li>
			  			)}
			  		</ul>
			  		<h3>Description</h3>
			  		<p>{recipe.description}</p>
		  		</div>
	  		</section>
	  		);

	    return (
	    		<div>
	    			{recipeList}	
	          </div>
	    	);
		}
	}

export default Recipes;