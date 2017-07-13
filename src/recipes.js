import React, { Component } from 'react';

class Recipes extends Component {
	constructor(props){
		super(props);
		this.handleLarge = this.handleLarge.bind(this);
	}

	handleLarge(e){
		this.props.onShowSandbox(e.target.className);
	}
  
	  render(i) {

	  	const recipe = this.props.recipe;
	  
	    return (
    			<section className="recipe-card" value={this.props.card[i]} 
    			onClick={this.props.onClick(i)}>

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
		}
	}

export default Recipes;