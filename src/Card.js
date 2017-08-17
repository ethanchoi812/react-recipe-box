import React, { Component } from 'react';

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

export default Card;