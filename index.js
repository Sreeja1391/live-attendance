class Student {
  constructor(fullName, email, enroll) {
    this.fullName = fullName;
    this.email= email;
    this.enroll= enroll;
  }
}


class UI {
  static displayStudents() {
    const students = Store.getStudents();

    students.forEach((student) => UI.addStudentToList(student));
  }

  static addStudentToList(student) {
    const list = document.querySelector('#student-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.fullName}</td>
      <td>${student.email}</td>
      <td>${student.enroll}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteStudent(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#attd-form');
    container.insertBefore(div, form);


    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#fullName').value = ' ';
    document.querySelector('#email').value = ' ';
    document.querySelector('#enroll').value = ' ';
  }
}


class Store {
  static getStudents() {
    let students;
    if(localStorage.getItem('students') === null) {
      students = [];
    } else {
      students = JSON.parse(localStorage.getItem('students'));
    }

    return students;
  }

  static addStudent(student) {
    const students = Store.getStudents();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
  }

  static removeStudent(enroll) {
    const students = Store.getStudents();

    students.forEach((student, index) => {
      if(student.enroll === enroll) {
        students.splice(index, 1);
      }
    });

    localStorage.setItem('students', JSON.stringify(students));
  }
}


document.addEventListener('DOMContentLoaded', UI.displayStudents);


document.querySelector('#attd-form').addEventListener('submit', (e) => {

  e.preventDefault();


  const fullName = document.querySelector('#fullName').value;
  const email = document.querySelector('#email').value;
  const enroll = document.querySelector('#enroll').value;

  if(fullName === '' || email === '' || enroll === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {

    const student = new Student(fullName, email, enroll);


    UI.addStudentToList(student);


    Store.addStudent(student);

    UI.showAlert('Student Present', 'success');


    UI.clearFields();
  }
});

document.querySelector('#student-list').addEventListener('click', (e) => {

  UI.deleteStudent(e.target);


  Store.removeStudent(e.target.parentElement.previousElementSibling.textContent);


  UI.showAlert('Entry Cancelled', 'success');
});
