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
    this.deleteGrade = this.deleteGrade.bind(this);
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

  deleteGrade(gradeId) {
    const newGrades = this.state.grades.slice();
    let index = null;
    for (let i = 0; i < this.state.grades.length; i++) {
      if (this.state.grades[i].id === gradeId) {
        index = i;
        break;
      }
    }
    newGrades.splice(index, 1);
    fetch(`/api/grades/${gradeId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGrades)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ grades: newGrades });
      });
  }

  render() {
    if (this.state.grades.length) {
      return (
        <div>
          <Header avg={this.getAverageGrade()} />
          <GradeTable grades={this.state.grades} deleteGrade={this.deleteGrade}/>
          <GradeForm onSubmit={this.addGrade} grades={this.state.grades}/>
        </div>
      );
    } else {
      return (
        <div>
          <Header/>
          <h2>No Grades Recorded</h2>
          <GradeForm onSubmit={this.addGrade} grades={this.state.grades} />
        </div>
      );
    }
  }
}

export default App;
