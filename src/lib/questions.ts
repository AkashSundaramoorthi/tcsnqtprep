export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  in: string;
  out: string;
  hidden?: boolean;
}

export interface Question {
  id: string;
  level: Difficulty;
  title: string;
  desc: string;
  fmt: string;
  tests: TestCase[];
  hints?: [string, string, string];
  note?: string;
  nqtTag?: string;
}

export const QUESTIONS: Question[] = [
  { id: "even-or-odd", level: "Easy", title: "Even or Odd",
    desc: "Given a single integer N, determine whether the number is even or odd.\n\nAn even number is an integer that is exactly divisible by 2. An odd number is an integer that cannot be divided exactly by 2.\n\nConstraints:\n• -10^9 <= N <= 10^9\n• N can be 0 or negative.",
    fmt: "Print exactly \"Even\" if N is even, or \"Odd\" if N is odd (case-sensitive).",
    tests: [{"in":"7","out":"Odd"},{"in":"10","out":"Even"},{"in":"0","out":"Even"},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true}],
    hints: ["Check divisibility by 2 using the modulo operator.", "Read N. If N % 2 equals 0, print Even. Else print Odd.", "n % 2 === 0"],
    nqtTag: "Frequently Asked" },

  { id: "sum-of-digits", level: "Easy", title: "Sum of Digits",
    desc: "Given a positive integer N, calculate the sum of its individual digits.\n\nFor example, if N = 1234, the sum is 1 + 2 + 3 + 4 = 10.\n\nConstraints:\n• 1 <= N <= 10^12",
    fmt: "Print a single integer representing the total sum of all digits.",
    tests: [{"in":"1234","out":"10"},{"in":"248","out":"14"},{"in":"100","out":"1"},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true}],
    hints: ["Extract the last digit using modulo 10, add it to a running sum, and remove it by integer dividing the number by 10.", "Initialize sum = 0. While N > 0, add N % 10 to sum, then divide N by 10. Return sum.", "sum += n % 10; n = Math.floor(n / 10);"],
    nqtTag: "Frequently Asked" },

  { id: "palindrome-check", level: "Easy", title: "Palindrome Check",
    desc: "Given a number N as a string, determine if it reads the same forwards and backwards. A palindrome remains identical when its characters are reversed.\n\nConstraints:\n• 1 <= length of N <= 10^5\n• N does not contain leading zeros.",
    fmt: "Print exactly \"Palindrome\" if it is a palindrome, or \"Not Palindrome\" otherwise.",
    tests: [{"in":"12321","out":"Palindrome"},{"in":"123","out":"Not Palindrome"},{"in":"7","out":"Palindrome"},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true}],
    hints: ["Convert the string into an array of characters, reverse the array, join it back, and compare with the original string.", "Convert N to string S. Reverse S to get R. If S equals R, it is a palindrome.", "s === s.split('').reverse().join('')"],
    nqtTag: "Repeated in NQT" },

  { id: "factorial", level: "Easy", title: "Factorial",
    desc: "Given a non-negative integer N, compute its factorial, denoted as N!. The factorial of N is the product of all positive integers less than or equal to N.\n\nNote: By definition, 0! = 1.\n\nConstraints:\n• 0 <= N <= 20",
    fmt: "Print a single integer representing N!.",
    tests: [{"in":"5","out":"120"},{"in":"0","out":"1"},{"in":"6","out":"720"},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true}],
    hints: ["Use a loop to multiply a running product by every integer from 1 up to N.", "Initialize result = 1. Loop i from 1 to N: result = result * i. Return result.", "for (let i = 1; i <= n; i++) result *= i;"],
    nqtTag: "Frequently Asked" },

  { id: "vowels-consonants", level: "Easy", title: "Vowels & Consonants",
    desc: "Given a string S containing English letters and spaces, count the total number of vowels and consonants.\n\nVowels are 'a', 'e', 'i', 'o', 'u' (case-insensitive). All other alphabetical characters are consonants. Ignore spaces and punctuation.\n\nConstraints:\n• 1 <= length of S <= 10^4",
    fmt: "Print exactly in this format: \"Vowels: X, Consonants: Y\"",
    tests: [{"in":"hello world","out":"Vowels: 3, Consonants: 7"},{"in":"aeiou","out":"Vowels: 5, Consonants: 0"},{"in":"xyz","out":"Vowels: 0, Consonants: 3"},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true}],
    hints: ["Convert the string to lowercase and check each character against a predefined string or set of vowels.", "Initialize v = 0, c = 0. For each char in S: if it is a letter, check if it's in 'aeiou'. If yes, v++. Else c++.", "if ('aeiou'.includes(char)) v++; else c++;"],
    nqtTag: "Frequently Asked" },

  { id: "multiplication-table", level: "Easy", title: "Multiplication Table",
    desc: "Given an integer N, generate its multiplication table from 1 to 10.\n\nConstraints:\n• -10^4 <= N <= 10^4",
    fmt: "Print exactly 10 integers separated by single spaces.",
    tests: [{"in":"3","out":"3 6 9 12 15 18 21 24 27 30"},{"in":"1","out":"1 2 3 4 5 6 7 8 9 10"},{"in":"5","out":"5 10 15 20 25 30 35 40 45 50"},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true}],
    hints: ["Use a loop from 1 to 10 and multiply the given number by the loop variable at each step.", "Create an empty array. Loop i from 1 to 10, push N * i to the array. Join the array with spaces.", "Array.from({length: 10}, (_, i) => n * (i + 1)).join(' ')"] },

  { id: "swap-two-numbers", level: "Easy", title: "Swap Two Numbers",
    desc: "Given two integers A and B, swap their values and print them. Try to optimize this by solving it without declaring a third temporary variable.\n\nConstraints:\n• -10^9 <= A, B <= 10^9",
    fmt: "Print the two swapped numbers separated by a single space.",
    tests: [{"in":"4 9","out":"9 4"},{"in":"1 2","out":"2 1"},{"in":"8 3","out":"3 8"},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true}],
    hints: ["Use arithmetic operations (addition and subtraction) or XOR bitwise operations to swap values without a temporary variable.", "A = A + B; B = A - B; A = A - B.", "a = a + b; b = a - b; a = a - b;"] },

  { id: "even-numbers-1-n", level: "Easy", title: "Even Numbers 1..N",
    desc: "Given an integer N, print all strictly even numbers starting from 1 up to N inclusive.\n\nConstraints:\n• 1 <= N <= 1000",
    fmt: "Print the even numbers sequentially, separated by single spaces.",
    tests: [{"in":"10","out":"2 4 6 8 10"},{"in":"6","out":"2 4 6"},{"in":"2","out":"2"},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true}],
    hints: ["Loop from 1 to N, and collect numbers that are cleanly divisible by 2.", "Create empty array. Loop i from 1 to N. If i % 2 == 0, append i. Print space-separated array.", "if (i % 2 === 0) result.push(i);"] },

  { id: "leap-year", level: "Easy", title: "Leap Year",
    desc: "Given a year N, determine whether it is a leap year.\n\nA year is a leap year if it satisfies one of these two conditions:\n1. It is divisible by 400, OR\n2. It is divisible by 4 but NOT divisible by 100.\n\nExamples: 2000 is a leap year (divisible by 400). 1900 is not (divisible by 100 but not 400). 2024 is a leap year (divisible by 4, not by 100).\n\nConstraints:\n• 1 <= N <= 9999",
    fmt: "Print exactly \"YES\" if it is a leap year, or \"NO\" otherwise.",
    tests: [{"in":"2024","out":"YES"},{"in":"1900","out":"NO"},{"in":"2000","out":"YES"},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true}],
    hints: ["Apply the logical rules for leap years: divisible by 400, OR divisible by 4 but not 100.", "If N % 400 == 0, return YES. Else if N % 100 == 0, return NO. Else if N % 4 == 0, return YES.", "n % 400 === 0 || (n % 4 === 0 && n % 100 !== 0)"],
    nqtTag: "Repeated in NQT" },

  { id: "handshake-problem", level: "Easy", title: "Handshake Problem",
    desc: "N people are in a room. Each person shakes hands with every other person exactly once. Given N, find the total number of handshakes.\n\nFormula: Total handshakes = N × (N − 1) / 2.\n\nThis is equivalent to choosing 2 people from N (combinations: N choose 2), since each unique pair of people performs one handshake.\n\nConstraints:\n• 2 <= N <= 10^4",
    fmt: "Print a single integer — the total number of handshakes.",
    tests: [{"in":"4","out":"6"},{"in":"10","out":"45"},{"in":"2","out":"1"},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true}],
    hints: ["Use the mathematical combinations formula for choosing 2 items from N items.", "Calculate and print N * (N - 1) / 2.", "(n * (n - 1)) / 2"],
    nqtTag: "Repeated in NQT" },

  { id: "fibonacci-series", level: "Easy", title: "Fibonacci Series",
    desc: "The Fibonacci sequence is defined such that each number is the sum of the two preceding ones, starting from 0 and 1. Given N, print the first N terms of the sequence.\n\nFormula: F(n) = F(n-1) + F(n-2) where F(1)=0, F(2)=1.\n\nConstraints:\n• 1 <= N <= 40",
    fmt: "Print N integers separated by single spaces.",
    tests: [{"in":"7","out":"0 1 1 2 3 5 8"},{"in":"1","out":"0"},{"in":"5","out":"0 1 1 2 3"},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true}],
    hints: ["Keep track of the last two numbers iteratively to generate the next number in the sequence.", "Initialize a = 0, b = 1. Add 'a' to result. For 2 to N, compute next = a + b; a = b; b = next; add 'a'.", "next = a + b; a = b; b = next;"],
    nqtTag: "Recently Asked" },

  { id: "prime-number", level: "Easy", title: "Prime Number",
    desc: "Given an integer N, determine whether it is a prime number. A prime number is a natural number greater than 1 that is only divisible by 1 and itself.\n\nConstraints:\n• 1 <= N <= 10^9",
    fmt: "Print exactly \"Prime\" or \"Not Prime\".",
    tests: [{"in":"29","out":"Prime"},{"in":"1","out":"Not Prime"},{"in":"15","out":"Not Prime"},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true}],
    hints: ["Check if the number is divisible by any integer starting from 2 up to its square root.", "If N <= 1 return Not Prime. Loop i from 2 to sqrt(N). If N % i == 0, return Not Prime. Else return Prime.", "for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;"],
    nqtTag: "Repeated in NQT" },

  { id: "reverse-words", level: "Easy", title: "Reverse Words",
    desc: "Given a sentence string S, reverse the order of its words. A word is defined as a sequence of non-space characters.\n\nConstraints:\n• 1 <= length of S <= 10^4\n• S does not contain leading or trailing spaces.",
    fmt: "Print the words in reversed order separated by single spaces.",
    tests: [{"in":"I love coding","out":"coding love I"},{"in":"hello world","out":"world hello"},{"in":"a b c d","out":"d c b a"},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true}],hints: ["Concept: Split the string by space to get words, reverse the resulting list, and rejoin them.", "Algorithm: Convert the string into a list of words using split. Reverse the list. Join the list elements using a space separator.", "s.split(' ').reverse().join(' ')"],
    nqtTag: "Frequently Asked" },

  { id: "remove-duplicates", level: "Easy", title: "Remove Duplicates",
    desc: "Given a space-separated array of integers, remove all duplicate elements, keeping only the first occurrence of each element. Maintain the original relative order.\n\nConstraints:\n• 1 <= Array Length <= 10^5",
    fmt: "Print the unique integers separated by single spaces.",
    tests: [{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5"},{"in":"5 5 5","out":"5"},{"in":"9 1 9 2 1","out":"9 1 2"},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true}],hints: ["Concept: Maintain a record of elements you have already seen to eliminate duplicates while keeping order.", "Algorithm: Initialize an empty list and a set for tracking. For each item, if it's not in the set, add it to the list and the set.", "Array.from(new Set(arr)).join(' ')"],
    nqtTag: "Frequently Asked" },

  { id: "reverse-each-word", level: "Medium", title: "Reverse Each Word",
    desc: "Given a sentence, reverse the characters within each individual word while keeping the word order the same. This is different from reversing the entire sentence — only the characters inside each word are reversed.\n\nExample: 'Hello World' → 'olleH dlroW' (word order preserved, characters within each word reversed).\n\nConstraints:\n• 1 <= length of sentence <= 10^4\n• Sentence contains only English letters and single spaces.",
    fmt: "Print the sentence with each word's characters reversed, maintaining original word order.",
    tests: [{"in":"Hello World TCS","out":"olleH dlroW SCT"},{"in":"I love coding","out":"I evol gnidoc"},{"in":"cat dog","out":"tac god"},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true}],hints: ["Concept: Iterate over each word in the sentence and reverse its characters independently.", "Algorithm: Split the sentence into words. For each word, split into characters, reverse, and join. Join all words back.", "words.map(w => w.split('').reverse().join('')).join(' ')"],
    nqtTag: "Repeated in NQT" },

  { id: "gcd-and-lcm", level: "Medium", title: "GCD and LCM",
    desc: "Given two positive integers A and B, compute their GCD (Greatest Common Divisor) and LCM (Least Common Multiple).\n\n• GCD: the largest integer that divides both A and B without remainder.\n• LCM: the smallest positive integer divisible by both A and B.\n• Useful relation: LCM(A, B) = (A × B) / GCD(A, B).\n\nUse the Euclidean algorithm: GCD(a, b) = GCD(b, a mod b) until b = 0.\n\nConstraints:\n• 1 <= A, B <= 10^9",
    fmt: "Print two lines: GCD on the first line, LCM on the second line.",
    tests: [{"in":"12 18","out":"6\n36"},{"in":"4 6","out":"2\n12"},{"in":"15 20","out":"5\n60"},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true}],hints: ["Concept: Use the Euclidean algorithm for GCD. Then LCM is the product of the numbers divided by their GCD.", "Algorithm: GCD(A, B): while B > 0, temp = B, B = A % B, A = temp. Then LCM = (original_A * original_B) / GCD.", "gcd = (a, b) => b === 0 ? a : gcd(b, a % b)"],
    nqtTag: "Repeated in NQT" },

  { id: "pyramid-pattern", level: "Medium", title: "Pyramid Pattern",
    desc: "Given N, print a right-aligned triangle of * with N rows. Row 1 has 1 star, row N has N stars.",
    fmt: "Print N lines of *",
    tests: [{"in":"3","out":"  *\n **\n***"},{"in":"2","out":" *\n**"},{"in":"1","out":"*"},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true}],hints: ["Concept: Print rows with increasing asterisks, padded with spaces on the left to form a right-aligned triangle.", "Algorithm: Loop from i=1 to N. For each row, print (N - i) spaces followed by i asterisks.", "' '.repeat(n - i) + '*'.repeat(i)"],
    nqtTag: "Repeated in NQT" },

  { id: "missing-number", level: "Medium", title: "Missing Number",
    desc: "Given array of N-1 integers from 1 to N with one missing, find it. Use sum formula: N*(N+1)/2 - sum(array).",
    fmt: "Print the missing number",
    tests: [{"in":"5\n1 2 4 5","out":"3"},{"in":"3\n1 3","out":"2"},{"in":"4\n2 3 4","out":"1"},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true}],hints: ["Concept: Calculate the sum of the first N integers mathematically and subtract the sum of the array.", "Algorithm: Compute total = N * (N + 1) / 2. Sum the array elements. The missing number is total - arraySum.", "missing = (n * (n + 1)) / 2 - arr.reduce((a, b) => a + b, 0)"],
    nqtTag: "Repeated in NQT" },

  { id: "row-and-column-sum", level: "Medium", title: "Row and Column Sum",
    desc: "Given N×N matrix, print sum of each row on one line, then sum of each column on the next line, space-separated. Input: N, then N lines.",
    fmt: "Two lines: row sums, then col sums.",
    tests: [{"in":"2\n1 2\n3 4","out":"3 7\n4 6"},{"in":"3\n1 0 0\n0 1 0\n0 0 1","out":"1 1 1\n1 1 1"},{"in":"1\n5","out":"5\n5"},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true}],hints: ["Concept: Maintain two lists for row sums and column sums, updating them simultaneously during matrix traversal.", "Algorithm: Initialize rowSums and colSums arrays of size N with zeros. Iterate matrix; add matrix[i][j] to rowSums[i] and colSums[j].", "rowSums[i] += matrix[i][j]; colSums[j] += matrix[i][j]"],
    nqtTag: "Frequently Asked" },

  { id: "left-rotate-string", level: "Medium", title: "Left Rotate String",
    desc: "Given string S and integer K, rotate S left by K characters. Input: string S, then K.",
    fmt: "Rotated string",
    tests: [{"in":"hello\n2","out":"llohe"},{"in":"tcs\n1","out":"cst"},{"in":"abcd\n4","out":"abcd"},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true}],hints: ["Concept: A left rotation by K shifts the first K characters to the end. Handle cases where K > length.", "Algorithm: Take K = K % length. Concatenate the substring from K to end with the substring from 0 to K.", "s.slice(k % s.length) + s.slice(0, k % s.length)"],
    nqtTag: "Repeated in NQT" },

  { id: "armstrong-number", level: "Medium", title: "Armstrong Number",
    desc: "An Armstrong number (or narcissistic number) is a number that is equal to the sum of its own digits each raised to the power of the number of digits.\n\nFor example, 153 has 3 digits. 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153.\n\nConstraints:\n• 1 <= N <= 10^9",
    fmt: "Print exactly \"Armstrong\" or \"Not Armstrong\".",
    tests: [{"in":"153","out":"Armstrong"},{"in":"123","out":"Not Armstrong"},{"in":"9","out":"Armstrong"},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true}],hints: ["Concept: An Armstrong number equals the sum of its digits, each raised to the power of the total number of digits.", "Algorithm: Convert number to string to get length L. For each digit, add digit^L to sum. Check if sum equals original.", "digits.reduce((sum, d) => sum + Math.pow(Number(d), digits.length), 0)"],
    nqtTag: "Repeated in NQT" },

  { id: "second-largest", level: "Medium", title: "Second Largest",
    desc: "Given a space-separated array of integers, find the second largest distinct value. If all values are identical, return the single value.\n\nConstraints:\n• 1 <= Array Length <= 10^5\n• -10^9 <= Array Elements <= 10^9",
    fmt: "Print a single integer.",
    tests: [{"in":"3 1 4 1 5 9 2","out":"5"},{"in":"10 20","out":"10"},{"in":"5 5 4","out":"4"},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true}],hints: ["Concept: Track the maximum and the second maximum simultaneously in one pass, ignoring duplicates.", "Algorithm: Init max and second_max to -infinity. Loop: if val > max, second_max = max and max = val. Else if val > second_max and val != max, second_max = val.", "if (val > max) { secondMax = max; max = val; }"],
    nqtTag: "Frequently Asked" },

  { id: "character-frequency", level: "Medium", title: "Character Frequency",
    desc: "Given a string S, determine the frequency of each character present in the string. Output the results sorted alphabetically by the character.\n\nConstraints:\n• 1 <= length of S <= 1000\n• S contains only lowercase English letters.",
    fmt: "Print space-separated \"char:count\" pairs (e.g., a:2 b:1).",
    tests: [{"in":"apple","out":"a:1 e:1 l:1 p:2"},{"in":"aab","out":"a:2 b:1"},{"in":"zzz","out":"z:3"},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true}],hints: ["Concept: Use a frequency map to count occurrences, then sort the characters alphabetically to print.", "Algorithm: Create map. For each char, increment map[char]. Get map keys, sort alphabetically, format as char:count and join.", "Object.keys(map).sort().map(k => `${k}:${map[k]}`).join(' ')"],
    nqtTag: "Frequently Asked" },

  { id: "digital-root", level: "Medium", title: "Digital Root",
    desc: "Given a non-negative integer N, repeatedly add all its digits until the result has only one digit. This final single digit is known as the digital root.\n\nFor example: 9875 → 9+8+7+5 = 29 → 2+9 = 11 → 1+1 = 2.\n\nConstraints:\n• 0 <= N <= 10^18",
    fmt: "Print a single integer between 0 and 9.",
    tests: [{"in":"9875","out":"2"},{"in":"9","out":"9"},{"in":"10","out":"1"},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true}],hints: ["Concept: The digital root of a number is essentially its modulo 9. (If perfectly divisible by 9, root is 9).", "Algorithm: If N == 0 return 0. If N % 9 == 0 return 9. Otherwise return N % 9.", "return n === 0 ? 0 : (n % 9 === 0 ? 9 : n % 9)"],
    nqtTag: "Frequently Asked" },

  { id: "number-triangle", level: "Medium", title: "Number Triangle",
    desc: "Given an integer N, generate a right-angled number triangle. The triangle should have N rows, where the i-th row contains the sequence of numbers from 1 up to i.\n\nConstraints:\n• 1 <= N <= 20",
    fmt: "Print N lines. The i-th line should contain 1 to i, separated by single spaces.",
    tests: [{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4"},{"in":"2","out":"1\n1 2"},{"in":"1","out":"1"},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true}],hints: ["Concept: Print sequences of numbers starting from 1 up to the current row number.", "Algorithm: Loop i from 1 to N. Loop j from 1 to i. Collect j into a string. Print the string for row i.", "Array.from({length: i}, (_, idx) => idx + 1).join(' ')"],
    nqtTag: "Frequently Asked" },

  { id: "anagram-strings", level: "Medium", title: "Anagram Strings",
    desc: "Given two strings, determine if they are anagrams. Two strings are anagrams if they contain the same characters with the same frequencies.",
    fmt: "Print 'True' or 'False'.",
    tests: [{"in":"listen\nsilent","out":"True"},{"in":"hello\nworld","out":"False"},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true}],
    hints: ["Concept: Two strings are anagrams if their character frequency maps are perfectly identical.", "Algorithm: Check lengths. Create frequency map. Loop strings: increment map for string A, decrement for string B. If any value in map != 0, false.", "charCount[char] = (charCount[char] || 0) + 1"],
    nqtTag: "Frequently Asked" },

  { id: "prime-factorization", level: "Medium", title: "Prime Factorization",
    desc: "Given an integer N, compute its prime factorization. Output all prime factors in ascending order. If a prime factor appears multiple times, it should be printed that many times.\n\nConstraints:\n• 2 <= N <= 10^9",
    fmt: "Print the prime factors separated by single spaces.",
    tests: [{"in":"60","out":"2 2 3 5"},{"in":"13","out":"13"},{"in":"8","out":"2 2 2"},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true}],hints: ["Concept: Repeatedly divide N by the smallest possible integer (starting from 2) to find prime factors.", "Algorithm: Start i = 2. While i * i <= N: if N % i == 0, add i to list and N = N / i. Else i++. Finally if N > 1, add N.", "while (n % i === 0) { factors.push(i); n /= i; }"],
    nqtTag: "Frequently Asked" },

  { id: "matrix-transpose", level: "Medium", title: "Matrix Transpose",
    desc: "Given an integer N on the first line, followed by N lines representing an N x N matrix, compute the transpose of the matrix. The transpose is formed by turning all the rows into columns and vice versa.\n\nConstraints:\n• 1 <= N <= 100\n• -1000 <= matrix elements <= 1000",
    fmt: "Print N lines, where each line contains N space-separated integers.",
    tests: [{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9"},{"in":"2\n1 2\n3 4","out":"1 3\n2 4"},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true}],hints: ["Concept: A transpose swaps rows with columns, meaning transposed[j][i] = matrix[i][j].", "Algorithm: Create an N x N matrix. Loop i from 0 to N-1, and j from 0 to N-1, setting transposed[j][i] = matrix[i][j].", "transposed[j][i] = matrix[i][j]"],
    nqtTag: "Frequently Asked" },

  { id: "move-zeros-to-end", level: "Medium", title: "Move Zeros to End",
    desc: "Given an array of N integers, move all zeroes to the end while maintaining the relative order of all non-zero elements.\n\nThis is a classic TCS NQT problem sometimes called the 'Chocolate Factory' problem — empty packets (zeros) must be pushed to the end.\n\nConstraints:\n• 1 <= N <= 10^5\n• -10^9 <= elements <= 10^9",
    fmt: "Print the modified array elements separated by single spaces.",
    tests: [{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0"},{"in":"6\n6 0 1 8 0 2","out":"6 1 8 2 0 0"},{"in":"5\n1 2 3 4 5","out":"1 2 3 4 5"},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true}],hints: ["Concept: Shift all non-zero elements forward in order, then fill the remaining array spaces with zeros.", "Algorithm: Keep an insert index. If element != 0, place it at insert index and increment index. Finally fill from index to end with 0.", "if (arr[i] !== 0) arr[insertPos++] = arr[i]"],
    nqtTag: "Repeated in NQT" },

  { id: "odd-occurring-element", level: "Medium", title: "Odd Occurring Element",
    desc: "Given an array of N integers where every element appears an even number of times except exactly one element, find the element that appears an odd number of times.\n\nHint: XOR of all elements gives the answer in O(N) time — any number XOR'd with itself is 0, and 0 XOR x = x.\n\nConstraints:\n• 1 <= N <= 10^5 (N is always odd)\n• All array elements are positive integers",
    fmt: "Print a single integer — the element that occurs an odd number of times.",
    tests: [{"in":"5\n2 2 3 1 1","out":"3"},{"in":"5\n4 4 3 3 7","out":"7"},{"in":"1\n5","out":"5"},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true}],hints: ["Concept: Use the XOR bitwise operator. Any number XORed with itself is 0, isolating the odd-occurring element.", "Algorithm: Initialize result = 0. Iterate through the array, setting result = result XOR current_element. Return result.", "result ^= arr[i]"],
    nqtTag: "Repeated in NQT" },

  { id: "array-rotation", level: "Medium", title: "Array Rotation",
    desc: "Given array and K, rotate left by K positions. Input: first line is N, second line is the array, third line is K.",
    fmt: "Print space-separated array",
    tests: [{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2"},{"in":"3\n1 2 3\n1","out":"2 3 1"},{"in":"4\n10 20 30 40\n0","out":"10 20 30 40"},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true}],hints: ["Concept: Rotate the array by reversing parts: reverse first K, reverse the rest, then reverse all.", "Algorithm: K = K % N. Reverse array from 0 to K-1. Reverse from K to N-1. Reverse from 0 to N-1.", "reverse(arr, 0, k - 1); reverse(arr, k, n - 1); reverse(arr, 0, n - 1);"],
    nqtTag: "Frequently Asked" },

  { id: "number-pattern", level: "Medium", title: "Number Pattern",
    desc: "Given N, print a pattern where row i contains the number i repeated i times (e.g. row 1: 1, row 2: 2 2, row 3: 3 3 3).",
    fmt: "Print N lines, space-separated in each row.",
    tests: [{"in":"3","out":"1\n2 2\n3 3 3"},{"in":"2","out":"1\n2 2"},{"in":"4","out":"1\n2 2\n3 3 3\n4 4 4 4"},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true}],hints: ["Concept: Print rows where the row number is repeated exactly as many times as its value.", "Algorithm: Loop i from 1 to N. Create an array of size i filled with i, join with spaces, and print.", "Array(i).fill(i).join(' ')"],
    nqtTag: "Repeated in NQT" },

  { id: "two-sum", level: "Medium", title: "Two Sum",
    desc: "You are given a space-separated array of integers on the first line, and a target integer on the second line. Find the indices of the two numbers such that they add up to the target.\n\nAssume there is exactly one valid solution, and you may not use the same element twice. The output must be sorted (i < j).\n\nConstraints:\n• 2 <= Array Length <= 10^4\n• -10^9 <= Target <= 10^9",
    fmt: "Print the two zero-based indices separated by a space.",
    tests: [{"in":"2 7 11 15\n9","out":"0 1"},{"in":"3 2 4\n6","out":"1 2"},{"in":"1 5 3 4\n7","out":"2 3"},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true}],hints: ["Concept: Use a map to store the complement (target - current) and its index to find the pair in O(N).", "Algorithm: Loop array with index i. Check if target - arr[i] is in map. If yes, return indices. Else, map[arr[i]] = i.", "if (map.has(target - num)) return [map.get(target - num), i]"],
    nqtTag: "Frequently Asked" },

  { id: "roman-numeral", level: "Medium", title: "Roman Numeral",
    desc: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given an integer N, convert it to a Roman numeral.\n\nRules:\n• I can be placed before V (5) and X (10) to make 4 and 9.\n• X can be placed before L (50) and C (100) to make 40 and 90.\n• C can be placed before D (500) and M (1000) to make 400 and 900.\n\nConstraints:\n• 1 <= N <= 3999",
    fmt: "Print the Roman numeral string in uppercase.",
    tests: [{"in":"58","out":"LVIII"},{"in":"9","out":"IX"},{"in":"2024","out":"MMXXIV"},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true}],hints: ["Concept: Start with the largest Roman numerals and subtract their values from N as many times as possible.", "Algorithm: Create a list of (value, symbol) pairs in descending order. Iterate pairs: while N >= value, append symbol to result and N -= value.", "while (n >= val) { result += sym; n -= val; }"],
    nqtTag: "Recently Asked" },

  { id: "count-sundays", level: "Hard", title: "Count Sundays",
    desc: "Given a starting day of the week and N total days, count how many Sundays fall within those N days (the first day is day 1 and is included).\n\nInput: first line is the starting day name (Monday / Tuesday / Wednesday / Thursday / Friday / Saturday / Sunday), second line is N.\n\nExample: starting Monday, N=7 → days are Mon Tue Wed Thu Fri Sat Sun → exactly 1 Sunday.\n\nConstraints:\n• 1 <= N <= 10^6",
    fmt: "Print a single integer — the total count of Sundays.",
    tests: [{"in":"Monday\n7","out":"1"},{"in":"Sunday\n14","out":"2"},{"in":"Friday\n9","out":"1"},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true}],hints: ["Concept: Map Monday to 0 and Sunday to 6, then use modulo arithmetic to compute the exact number of Sundays.", "Algorithm: Find offset of start day. Sundays count = floor((N + offset) / 7).", "Math.floor((n + startDayIndex) / 7)"],
    nqtTag: "Frequently Asked" },

  { id: "longest-unique-substring", level: "Hard", title: "Longest Unique Substring",
    desc: "Given a string S, find the length of the longest continuous substring that contains no repeating characters.\n\nFor example, in 'abcabcbb', the longest unique substring is 'abc', with a length of 3.\n\nConstraints:\n• 0 <= length of S <= 5 * 10^4\n• S consists of English letters, digits, symbols and spaces.",
    fmt: "Print a single integer representing the maximum length.",
    tests: [{"in":"abcabcbb","out":"3"},{"in":"bbbbb","out":"1"},{"in":"pwwkew","out":"3"},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true}],hints: ["Concept: Use a sliding window to track the current unique substring, shrinking from the left if duplicates occur.", "Algorithm: Init left=0, max=0. Loop right. If char in set, remove from left until char is gone. Add char, update max length.", "while (set.has(char)) set.delete(s[left++])"] },

  { id: "balanced-brackets", level: "Hard", title: "Balanced Brackets",
    desc: "Given a string S containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n\nConstraints:\n• 1 <= length of S <= 10^4",
    fmt: "Print exactly \"Balanced\" or \"Not Balanced\".",
    tests: [{"in":"{[()]}","out":"Balanced"},{"in":"([)]","out":"Not Balanced"},{"in":"(((","out":"Not Balanced"}],hints: ["Concept: Use a stack. Push opening brackets, and for closing brackets, check if they match the stack's top.", "Algorithm: Loop characters. Push opening to stack. On closing, if stack empty or popped element doesn't match, return false. True if stack empty at end.", "stack.pop() !== match[char]"],
    nqtTag: "Frequently Asked" },

  { id: "spiral-matrix-print", level: "Hard", title: "Spiral Matrix Print",
    desc: "Given N×M matrix, print elements in spiral order space-separated. Input: first line N and M, then N lines of M elements.",
    fmt: "Space-separated integers",
    tests: [{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5"},{"in":"2 2\n1 2\n3 4","out":"1 2 4 3"},{"in":"1 3\n1 2 3","out":"1 2 3"},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true}],hints: ["Concept: Define boundaries (top, bottom, left, right) and peel off the matrix layer by layer.", "Algorithm: While top <= bottom and left <= right: traverse top row, right col, bottom row, left col. Update boundaries inwards after each.", "for (let i = left; i <= right; i++) result.push(matrix[top][i])"],
    nqtTag: "Frequently Asked" },

  { id: "caesar-cipher", level: "Hard", title: "Caesar Cipher",
    desc: "Given a string S and an integer K, encrypt the string using Caesar Cipher — shift every alphabetic character forward by K positions in the alphabet. Non-alphabetic characters remain unchanged. Wrap around: 'z' shifted by 1 becomes 'a'.\n\nExample: S = 'Hello, World!', K = 3 → 'Khoor, Zruog!'\n\nConstraints:\n• 1 <= length of S <= 10^4\n• 0 <= K <= 25",
    fmt: "Print the encrypted string.",
    tests: [{"in":"Hello, World!\n3","out":"Khoor, Zruog!"},{"in":"abc\n1","out":"bcd"},{"in":"xyz\n2","out":"zab"},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true}],hints: ["Concept: Shift each letter's ASCII value by K, wrapping around the alphabet using modulo 26.", "Algorithm: Loop chars. If letter, shift by K. newCode = ((oldCode - base + K) % 26) + base. Reconstruct string.", "String.fromCharCode(((code - base + k) % 26) + base)"],
    nqtTag: "Repeated in NQT" },

  { id: "run-length-encoding", level: "Hard", title: "Run-Length Encoding",
    desc: "Given a string S, compress it using Run-Length Encoding. Replace consecutive repeating characters with the character followed by its count. If a character appears only once, print just the character (no '1').\n\nExample: 'aaabbc' → 'a3b2c'\nExample: 'abcd' → 'abcd'\n\nConstraints:\n• 1 <= length of S <= 10^4\n• S contains only lowercase English letters.",
    fmt: "Print the compressed string.",
    tests: [{"in":"aaabbc","out":"a3b2c"},{"in":"abcd","out":"abcd"},{"in":"aaaaaa","out":"a6"},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true}],hints: ["Concept: Count consecutive identical characters and append the character and its count to a result string.", "Algorithm: Initialize count = 1. Loop i from 1 to len. If S[i] == S[i-1], count++. Else append S[i-1] + (count>1?count:''), reset count=1.", "result += char + (count > 1 ? count : '')"],
    nqtTag: "Repeated in NQT" },

  { id: "first-non-repeating-character", level: "Hard", title: "First Non-Repeating Character",
    desc: "Given a string S of lowercase English letters, find the first character that does not repeat anywhere in the string. Print the character and its 0-based index.\n\nIf all characters repeat, print 'None'.\n\nExample: 'aabbcde' → first non-repeating is 'c' at index 4.\n\nConstraints:\n• 1 <= length of S <= 10^5\n• S contains only lowercase English letters.",
    fmt: "Print the character and its index separated by a space. If none, print 'None'.",
    tests: [{"in":"aabbcde","out":"c 4"},{"in":"aabb","out":"None"},{"in":"stress","out":"t 1"},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true}],hints: ["Concept: Count character frequencies in one pass, then find the first character with a frequency of exactly 1.", "Algorithm: Populate a frequency map. Iterate the string again; return the first char where map[char] == 1, along with its index.", "if (freq[s[i]] === 1) return `${s[i]} ${i}`"],
    nqtTag: "Frequently Asked" },

  { id: "sort-0s-1s-2s", level: "Hard", title: "Sort 0s 1s 2s",
    desc: "Given an array of N integers containing only 0s, 1s, and 2s, sort the array in-place in a single pass without using any built-in sort function.\n\nThis is the Dutch National Flag problem. Use three pointers: low, mid, high.\n\nConstraints:\n• 1 <= N <= 10^5\n• Each element is 0, 1, or 2.",
    fmt: "Print the sorted array elements separated by single spaces.",
    tests: [{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2"},{"in":"5\n2 0 2 1 1","out":"0 1 1 2 2"},{"in":"3\n2 1 0","out":"0 1 2"},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true}],hints: ["Concept: Use three pointers to partition the array into 0s on the left, 2s on the right, and 1s in the middle.", "Algorithm: Init low=0, mid=0, high=N-1. While mid <= high: if 0, swap(low, mid), low++, mid++. If 1, mid++. If 2, swap(mid, high), high--.", "if (arr[mid] === 0) { swap(low, mid); low++; mid++; }"],
    nqtTag: "Repeated in NQT" },

  { id: "longest-common-prefix", level: "Hard", title: "Longest Common Prefix",
    desc: "Given N strings, find the longest common prefix shared among all of them. If there is no common prefix, print an empty line.\n\nInput: First line is N, followed by N strings one per line.\n\nExample: ['flower', 'flow', 'flight'] → 'fl'\n\nConstraints:\n• 1 <= N <= 200\n• 1 <= length of each string <= 200",
    fmt: "Print the longest common prefix. If none, print an empty line.",
    tests: [{"in":"3\nflower\nflow\nflight","out":"fl"},{"in":"3\ndog\ncar\nrace","out":""},{"in":"2\ninterspecies\ninterstellar","out":"inters"},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true}],hints: ["Concept: Find the common prefix of the lexicographically smallest and largest strings in the array.", "Algorithm: Sort the array of strings. Compare characters of the first and last string one by one. Stop when they differ.", "if (first[i] !== last[i]) break"],
    nqtTag: "Frequently Asked" },

  { id: "subarray-with-given-sum", level: "Hard", title: "Subarray with Given Sum",
    desc: "Given an array of N non-negative integers and a target sum S, find a contiguous subarray that adds up to S. Print the 1-based start and end indices of the subarray.\n\nIf no such subarray exists, print -1.\nIf multiple subarrays exist, print the first one found (leftmost start).\n\nUse the sliding window technique for O(N) time.\n\nConstraints:\n• 1 <= N <= 10^5\n• 0 <= elements <= 10^4\n• 0 <= S <= 10^9",
    fmt: "Print two space-separated 1-based indices (start end). Print -1 if not found.",
    tests: [{"in":"5\n1 2 3 7 5\n12","out":"2 4"},{"in":"4\n1 4 0 0\n3","out":"1 2"},{"in":"3\n1 2 3\n10","out":"-1"},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true}],hints: ["Concept: Expand a sliding window to increase the sum, and shrink it from the left to decrease the sum.", "Algorithm: Init left=0, sum=0. Loop right. sum += arr[right]. While sum > S, sum -= arr[left], left++. If sum == S, return [left+1, right+1].", "while (sum > target) sum -= arr[left++]"],
    nqtTag: "Frequently Asked" },

  { id: "stack-using-queues", level: "Hard", title: "Stack Using Queues",
    desc: "Simulate a stack using two queues. Implement push and pop operations.\n\nInput: First line is N (number of operations). Each of the next N lines is either:\n• 'push X' — push integer X onto the stack\n• 'pop' — pop and print the top element. If the stack is empty, print 'Empty'.\n\nConstraints:\n• 1 <= N <= 1000\n• 1 <= X <= 10^4",
    fmt: "For each 'pop' operation, print the popped value or 'Empty', one per line.",
    tests: [{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1"},{"in":"3\npush 5\npop\npop","out":"5\nEmpty"},{"in":"5\npush 3\npush 4\npush 5\npop\npop","out":"5\n4"},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true}],hints: ["Concept: Use one queue to accept new elements, then immediately cycle all previous elements behind the new one.", "Algorithm: Push new element to Q. Then, for (length - 1) times, dequeue an element and push it back into Q.", "for(let i=0; i<size-1; i++) q.push(q.shift())"],
    nqtTag: "Frequently Asked" },

  { id: "word-frequency-count", level: "Hard", title: "Word Frequency Count",
    desc: "Given a paragraph of text, count the frequency of each word (case-insensitive). Print all words and their counts in descending order of frequency. If two words have the same frequency, sort them alphabetically.\n\nIgnore punctuation (.,!?;:) when identifying words.\n\nConstraints:\n• 1 <= length of input <= 10^4",
    fmt: "Print each word and its count separated by a colon, one per line, sorted by frequency desc then alphabetically.",
    tests: [{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1"},{"in":"hello world hello","out":"hello:2\nworld:1"},{"in":"a b a b c","out":"a:2\nb:2\nc:1"},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true}],hints: ["Concept: Extract all words, count them using a map, and sort by frequency descending, then alphabetically.", "Algorithm: Match words with regex. Update map counts. Convert to array. Sort by count DESC, then word localeCompare ASC.", "entries.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))"],
    nqtTag: "Frequently Asked" },

  { id: "next-greater-element", level: "Hard", title: "Next Greater Element",
    desc: "Given an array of N integers, for each element find the next greater element to its right. If no greater element exists for an element, output -1 for that position.\n\nExample: [4, 5, 2, 10, 8] → [5, 10, 10, -1, -1]\n\nUse a stack-based O(N) approach.\n\nConstraints:\n• 1 <= N <= 10^5\n• -10^9 <= elements <= 10^9",
    fmt: "Print N space-separated integers representing the next greater element for each position.",
    tests: [{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1"},{"in":"4\n3 2 1 4","out":"4 4 4 -1"},{"in":"3\n1 1 1","out":"-1 -1 -1"},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true}],hints: ["Concept: Use a monotonic stack to keep track of elements that haven't found a greater element yet.", "Algorithm: Iterate from right to left. While stack top <= current, pop stack. If stack not empty, it's the answer. Push current.", "while(stack.length && stack.at(-1) <= curr) stack.pop()"],
    nqtTag: "Frequently Asked" },

  { id: "decode-the-string", level: "Hard", title: "Decode the String",
    desc: "Given an encoded string in the format k[encoded_string], decode it by repeating the encoded_string exactly k times. You may assume the input is always valid and there are no extra white spaces. Encodings can be nested.\n\nExample: '3[a]2[bc]' → 'aaabcbc'\nExample: '2[ab3[c]]' → 'abcccabccc'\n\nConstraints:\n• 1 <= length of input <= 30\n• k is a positive integer\n• encoded_string contains only lowercase letters",
    fmt: "Print the decoded string.",
    tests: [{"in":"3[a]2[bc]","out":"aaabcbc"},{"in":"2[ab3[c]]","out":"abcccabccc"},{"in":"3[a2[b]]","out":"abbabbabb"}],hints: ["Concept: Use a stack to track string and multiplier context whenever nested brackets open and close.", "Algorithm: If digit, build multiplier. If '[', push multiplier and current string to stack. If ']', pop and multiply, append to popped string.", "currentStr = prevStr + currentStr.repeat(num)"],
    nqtTag: "Frequently Asked" },

  { id: "12-to-24-hour-format", level: "Easy", title: "12 to 24 Hour Format",
    desc: "Given a time in 12-hour AM/PM format, convert it to military (24-hour) time.\n\nNote: 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock. 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.\n\nInput Format:\nA single string containing the time (e.g. 07:05:45PM).\n\nOutput Format:\nThe time in 24-hour format.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"07:05:45PM","out":"19:05:45"},{"in":"12:40:22AM","out":"00:40:22"},{"in":"12:45:54PM","out":"12:45:54"},{"in":"04:59:59AM","out":"04:59:59"}],
    hints: ["Concept: String parsing to extract hours, minutes, seconds, and the AM/PM modifier.", "Algorithm: Extract the first two characters as hours and check the last two characters for AM/PM. If PM and hour != 12, add 12. If AM and hour == 12, set hour to 00. Format and print the result.", "print(f'{hour:02d}:{minutes}:{seconds}')"],
    nqtTag: "Recently Asked" },

  { id: "nth-best-selling-product", level: "Medium", title: "Nth Best Selling Product",
    desc: "Given a list of product IDs and an integer N, find the Nth best-selling product (the product with the Nth highest frequency). If frequencies are tied, the smaller product ID is considered to have higher rank.\n\nInput Format:\nFirst line: N\nSecond line: Space-separated product IDs.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"2\n1 2 2 3 3 3","out":"2"},{"in":"1\n4 4 4 2 2","out":"4"},{"in":"3\n10 10 20 20 30 30","out":"30"}],
    hints: ["Concept: Frequency counting and sorting (or using a priority queue/min-heap).", "Algorithm: Count occurrences using a dictionary. Create a list of tuples `(-frequency, product_id)`. Sort this list or use `heapq.nsmallest`. The N-th element in the sorted list is the answer.", "sorted_items = sorted([(-freq, pid) for pid, freq in counts.items()])"],
    nqtTag: "Recently Asked" },

  { id: "rank-transform-of-array", level: "Medium", title: "Rank Transform of Array",
    desc: "Given an array of integers, replace each element with its rank. The rank starts at 1 and represents how large the element is compared to others. If two elements are equal, their rank must be the same.\n\nInput Format:\nA single line of space-separated integers.\n\nOutput Format:\nSpace-separated ranks.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"40 10 20 30","out":"4 1 2 3"},{"in":"100 100 100","out":"1 1 1"},{"in":"37 12 28 9 100 56 80 5 12","out":"5 3 4 2 8 6 7 1 3"}],
    hints: ["Concept: Hash maps and sorting for rank assignment.", "Algorithm: Create a copy of the array, remove duplicates (using a set), and sort it. Iterate through the sorted unique values and assign a rank (starting from 1) to each in a dictionary. Finally, map the original array values to their ranks.", "ranks = {val: i + 1 for i, val in enumerate(sorted(set(arr)))}"],
    nqtTag: "Recently Asked" },

  { id: "largest-of-two-numbers", level: "Easy", title: "Largest of Two Numbers",
    desc: "Given two numbers separated by a space, find the largest without using built-in max functions.\n\nInput Format:\nTwo space-separated integers.\n\nOutput Format:\nThe largest integer.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"45 92","out":"92"},{"in":"-5 -2","out":"-2"},{"in":"100 100","out":"100"}],
    hints: ["Concept: Basic conditional statements.", "Algorithm: Read two integers. Use an if-else statement to check if the first is greater than the second. Print the result.", "print(a if a > b else b)"],
    nqtTag: "Recently Asked" },

  { id: "postfix-evaluation", level: "Medium", title: "Postfix Evaluation",
    desc: "Evaluate a postfix expression using a stack. The expression contains integers and the operators +, -, *, and /.\n\nInput Format:\nA single line of space-separated tokens.\n\nOutput Format:\nThe integer result of the evaluation. (Use integer division).\n\nConstraints:\n• Intermediate results fit within a 32-bit integer.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"2 3 1 * + 9 -","out":"-4"},{"in":"100 200 + 2 / 5 * 7 +","out":"757"},{"in":"10 2 8 * + 3 -","out":"23"}],
    hints: ["Concept: Stack data structure for expression evaluation.", "Algorithm: Iterate through the tokens. If the token is a number, push it onto the stack. If it's an operator, pop the top two numbers, apply the operator (remembering order: `second_popped op first_popped`), and push the result. The final result is the only item left in the stack.", "stack.append(eval(f'{a} {token} {b}'))"],
    nqtTag: "Recently Asked" }
];
