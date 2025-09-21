// i. Take two numbers as input and display sum, difference, product, quotient
function calculateNumbers() {
  const num1 = parseFloat(prompt('Enter first number:'));
  const num2 = parseFloat(prompt('Enter second number:'));
  if (isNaN(num1) || isNaN(num2)) {
    alert('Please enter valid numbers.');
    return;
  }
  alert(`Sum: ${num1 + num2}\nDifference: ${num1 - num2}\nProduct: ${num1 * num2}\nQuotient: ${num1 / num2}`);
}

// ii. Array operations
function arrayOperations() {
  const arr = [12, 5, 23, 7, 19];
  const largest = Math.max(...arr);
  const smallest = Math.min(...arr);
  const asc = [...arr].sort((a, b) => a - b);
  const desc = [...arr].sort((a, b) => b - a);
  alert(`Array: ${arr}\nLargest: ${largest}\nSmallest: ${smallest}\nAscending: ${asc}\nDescending: ${desc}`);
}

// iii. Form validation
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const age = parseInt(document.getElementById('age').value.trim());
  let valid = true;
  let msg = '';
  if (!name) {
    valid = false;
    msg += 'Name cannot be empty.\n';
  }
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email)) {
    valid = false;
    msg += 'Invalid email format.\n';
  }
  if (isNaN(age) || age < 18 || age > 100) {
    valid = false;
    msg += 'Age must be a number between 18 and 100.\n';
  }
  if (!valid) {
    alert(msg);
  } else {
    alert('Form submitted successfully!');
  }
  return valid;
}

// iv. Student object operations
function studentOperations() {
  let student = {
    name: 'Alice',
    age: 20,
    grades: 85
  };
  student.class = 'BCA'; // Add new property
  student.grades = 90;   // Update grade
  let info = '';
  for (let key in student) {
    info += `${key}: ${student[key]}\n`;
  }
  alert(info);
}

// v. Array methods: filter, map, reduce
function processArray() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const evens = arr.filter(n => n % 2 === 0);
  const doubled = evens.map(n => n * 2);
  const sum = doubled.reduce((acc, n) => acc + n, 0);
  alert(`Original: ${arr}\nEvens: ${evens}\nDoubled: ${doubled}\nSum: ${sum}`);
}
