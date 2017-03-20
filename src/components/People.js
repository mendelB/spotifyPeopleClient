import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import '../App.css';
import PersonView from './PersonView'
import PersonForm from './PersonForm'

class People extends Component {
	constructor(props) {
		super(props);
		this.fetchPeople = this.fetchPeople.bind(this)

		this.state = {
			loaded: false,
			people: [],
			peopleViews: []
		}
	}

	componentDidMount() {
		this.fetchPeople()
		.then(json => {
			this.setState({people: json, loaded: true})
			this.setPeople(json)
		})
	}

	fetchPeople() {
		return fetch('http://spotify-people-api.herokuapp.com/')
		.then(function(response) {
  		if(response.ok) {
    		return response.json();
  		} else {
  			throw new Error('Network response was not ok.')
  		}
		})
	}

	handleClickEdit(i) {
		var person = this.state.people.filter((e) => Number(e.id) === i)[0]
   	browserHistory.push({
   		pathname: '/edit-people/' + i,
   		state: {
   			name: person.name,
   			city: person.favorite_city
   		}
   	})
	}

	handleClickDelete(i) {
		return fetch('http://spotify-people-api.herokuapp.com/people/' + i, {
  		method: 'DELETE',
		})
		.then(response => {
			if(response.ok) {
				this.setState({ peopleViews:  this.state.peopleViews.filter((e) => Number(e.key) !== i)});
  		} else {
  			throw new Error('Network response was not ok.')
  		}
		})
	}

	setPeople(people) {
  	var peopleViews = people.map((person, index) => {
      return (<div key={person.id} className="square">
	      <div className="content">
		      <div className="table">
			      <div className="table-cell"> 
			      	<PersonView 
			      		name={person.name} 
			      		city={person.favorite_city}
			      		id={person.id}
			      		hasData={true} 
			      		onClickEdit={() => this.handleClickEdit(person.id)} 
			      		onClickDelete={() => this.handleClickDelete(person.id)}/>
			      </div>
			    </div>
	      </div>
      </div>)
  	})
  	this.setState({peopleViews: peopleViews})
	}

  render() {
    return (
	      this.state.loaded ?
      	<div className="People">
	      	{this.state.peopleViews}
	      </div>
	      :
	      <div className="People">
	      	Loading...
      	</div>
    );
  }
}

export default People;
