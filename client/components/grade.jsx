import React from 'react';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.course}</td>
        <td>{this.props.grade}</td>
        <td><button onClick={this.delete}>Delete</button></td>
      </tr>
    );
  }

  delete() {
    this.props.deleteGrade(this.props.id);
  }
}

export default Grade;
