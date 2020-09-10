import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      avg: 0
    };
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
      sum += this.state.grades[i].grade;
    }
    return Math.trunc(sum / this.state.grades.length);
  }

  render() {
    if (this.state.grades.length) {
      return (
        <div>
          <Header avg={this.getAverageGrade()} />
          <GradeTable grades={this.state.grades} />
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
