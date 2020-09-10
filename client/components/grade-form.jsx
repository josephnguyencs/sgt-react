import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newGrade = {
      name: this.state.name,
      course: this.state.course,
      grade: this.state.grade
    };
    this.props.onSubmit(newGrade);
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  render() {
    const nameValue = this.state.name;
    const courseValue = this.state.course;
    const gradeValue = this.state.grade;
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="name" type="text" value={nameValue} placeholder="Name" onChange={this.handleChange}/>
        <input name="course" type="text" value={courseValue} placeholder="Course" onChange={this.handleChange} />
        <input name="grade" type="text" value={gradeValue} placeholder="Grade" onChange={this.handleChange} />
        <button type="submit">Add</button>
        <button onClick={this.handleCancel}>Cancel</button>
      </form>
    );
  }
}

export default GradeForm;
