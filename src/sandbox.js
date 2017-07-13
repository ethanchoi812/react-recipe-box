import React, { Component } from 'react';

class Sandbox extends Component {
	constructor(props){
		super(props);
		this.handleEdit = this.handleEdit.bind(this);
	}

	handleEdit(e) {
		console.log('Show form! Hide text');
	}

	render() {
	  	const recipe = this.props.recipe;

	    return (
	    		<section className="recipe-sandbox">
		  			<h2 onClick={this.handleEdit}>{recipe.title}</h2>
		  			<form onBlur={this.handleForm}>
		  				<input value={recipe.title} />
		  			</form>
		  			<div className="sandbox-body">
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

export default Sandbox;