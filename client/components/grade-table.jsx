import React from 'react';
import Grade from './grade';

class GradeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: this.props.grades
    };
  }

  render() {
    const list = this.props.grades.map(item => {
      return <Grade key={item.id} name={item.name} course={item.course} grade={item.grade} />;
    });
    if (this.props.grades.length) {
      return (
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      );
    } else {
      return (
        <div>
          <h2>No Grades Recorded</h2>
        </div>
      );
    }
  }
}

export default GradeTable;
