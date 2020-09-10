import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.addGrade = this.addGrade.bind(this);
  }

  componentDidMount() {
    this.getAllGrades();
  }

  getAllGrades() {
    fetch('/api/grades')
      .then(response => response.json())
      .then(data => this.setState({ grades: data }));
  }

  getAverageGrade() {
    let sum = 0;
    for (let i = 0; i < this.state.grades.length; i++) {
      sum += parseInt(this.state.grades[i].grade);
    }
    return Math.trunc(sum / this.state.grades.length);
  }

  addGrade(newGrade) {
    const newGrades = this.state.grades.slice();
    fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGrade)
    })
      .then(response => response.json())
      .then(data => {
        newGrades.push(data);
        this.setState({ grades: newGrades });
      });
  }

  render() {
    if (this.state.grades.length) {
      return (
        <div>
          <Header avg={this.getAverageGrade()} />
          <GradeTable grades={this.state.grades} />
          <GradeForm onSubmit={this.addGrade} grades={this.state.grades}/>
        </div>
      );
    } else {
      return (
        <div>0</div>
      );
    }
  }
}

export default App;
