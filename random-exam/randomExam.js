// =========================================
//Program 1 - Sum of array elements

// let arr = [10, 20, 30, 40];
// let sum = 0;
// arr.forEach((num => {
//     sum = sum + num;
// }))

// console.log(sum);

// ===============================================
// Program 2 - Second largest and Second Smallest element in an array

// let arr = [5, 8, 1, 9, 3];

// arr.sort((a, b) => a - b);
// console.log(`Second Largest: ${arr[arr.length - 2]}`, `Second Smallest: ${arr[1]}`);

// ===================================================
// Program 3 - Remove duplicates form array

// let arr = [1, 2, 2, 3, 4, 4, 5];
// let newArr = Array.from(new Set(arr));
// console.log(newArr);

//====================================================
// Program 4 - Reverse an Array (with index swapping)
// SKIP

//====================================================
// Program 5 - Count Even and Odd Numbers

// let arr = [1, 2, 3, 4, 5, 6];
// let evenCount = 0;
// let oddCount = 0;

// arr.forEach((num => {
//     if (num % 2 === 0) {
//         evenCount++;
//     } else {
//         oddCount++;
//     }
// }));

// console.log(`Even: ${evenCount}`, `Odd: ${oddCount}`);

//====================================================
// Program 6 - Find Prime Numbers in Array
// SKIP

//====================================================
// Program 7 - Merge two arrays

// let arr1 = [1, 2, 3];
// let arr2 = [4, 5, 6];

// let mergedArr = [...arr1, ...arr2];
// console.log(mergedArr);

//====================================================
//Program 8 - Count vowels in a string

// let str = "Programming";
// let vowelCount = 0;
// let vowels = ["a", "e", "i", "o", "u"];

// str.split('').forEach(char => {
//     if (vowels.includes(char.toLowerCase())) vowelCount++;
// })

// console.log(vowelCount);

//====================================================
// Program 9 - Frequency of Each Character

// let str = "hello";
// let charCounts = {};

// str.split('').forEach(char => {
//     charCounts[char] = (charCounts[char] + 1) || 1;
// })

// console.log(charCounts);

//====================================================
// Program 10 - Longest Word in a Sentence

// let str = "The quick brown fox jumps over the lazy dog";

// let longestWord = "";

// str.split(" ").forEach(word => {
//     if (word.length > longestWord.length) longestWord = word;
// })
// console.log(longestWord);

//====================================================
// Program 11 - Filter Students Who Passed

// let students = [
//     { name: "Amit", marks: 30 },
//     { name: "Riya", marks: 55 },
//     { name: "Sam", marks: 40 }
// ]

// let passedStudents = students.filter(student => student.marks >= 35);
// console.log(passedStudents);

//====================================================
// Program 12 - Find Product by ID

// let products = [
//     { id: 1, name: "Pen" },
//     { id: 2, name: "Book" },
//     { id: 3, name: "Bag" }
// ]

// let id = 5;

// console.log(products.filter(product => product.id === id));

//====================================================
// Program 13 - Find products by category

// let products = [
//     { name: "Shirt", category: "Clothes" },
//     { name: "Pants", category: "Clothes" },
//     { name: "Apple", category: "Food" }
// ]

// let category = "Clothes";

// console.log(products.filter(product => product.category.toLowerCase() === category.toLowerCase()));

//====================================================
// Program 14 - Employee With Highest Salary

// let employees =
//     [
//         { name: "John", salary: 25000 },
//         { name: "Ravi", salary: 40000 },
//         { name: "Neha", salary: 32000 }
//     ]

// let highestSalary = 0;
// let highestSalaryEmployee = {};

// employees.forEach(employee => {
//     if (employee.salary > highestSalary) {
//         highestSalary = employee.salary;
//         highestSalaryEmployee = employee;
//     };
// })

// console.log(highestSalaryEmployee);

//====================================================
// Program 15 -  Sort Products by Price

// let products = [
//     { name: "Mouse", price: 500 },
//     { name: "Monitor", price: 6000 },
//     { name: "Keyboard", price: 800 },
// ]

// let priceSortedProducts = products.sort((a, b) => a.price - b.price);

// console.log(priceSortedProducts);