import React from 'react';
import ReactDOM from 'react-dom';
//import api from './api'

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      country: '',
      license: 'Free', 
    };   
    this.http = new XMLHttpRequest();
    this.url = 'http://localhost:8080';    
  }
  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.name === '' || this.state.country === '') {
      alert('invalid submission.');
      return;
    }

    const json_string = JSON.stringify({
        name: this.state.name,
        location: this.state.country,
        license: this.state.license
    });

    this.http.open('POST', this.url+'/store', true);
    this.http.send(new Blob([json_string], {type : 'application/json'}));
    
  }
  changeHandler = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);

    this.setState({[event.target.name]: event.target.value});
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1>CloudLink Accounts.</h1>
        <p>Name:</p>
        <input 
        type="text"
        name="name"
        onChange={this.changeHandler}
        />
        <p>Country:</p>
        <input 
        type="text"
        name="country"
        onChange={this.changeHandler}
        />
        <p>License:</p>
        <select name="license" value={this.state.license} onChange={this.changeHandler}>
          <option value="Free">Free</option>
          <option value="Basic">Basic</option>
          <option value="Pro">Pro</option>
          <option value="Elite">Elite</option>
        </select> 
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}
ReactDOM.render(<MyForm />, document.getElementById('root'));
