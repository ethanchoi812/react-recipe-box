import React, { Component } from 'react';

class Form extends Component {
  render(){
    const recipe = this.props.recipe;
    const title = recipe.title;
    const ingredients = recipe.ingredients;
    const notes = recipe.notes;

    return(
            <form className="recipe-form" onSubmit={this.props.handleSubmit}>
              <label>Title
                <input name="changedTitle" type="text" defaultValue={title} onChange={this.props.handleInputChange}/>
              </label>
              <div className="viewer-body">
                <label>Ingredients
                  <input name="changedIng" type="text" defaultValue={ingredients.join(',')} onChange={this.props.handleInputChange} />
                </label>
                <label>Notes
                  <textarea name="changedNotes" defaultValue={notes} onChange={this.props.handleInputChange} />
                </label>
                <input type="submit" value="Submit"/>
              </div> 
            </form>
      );
    }
  }

export default Form;