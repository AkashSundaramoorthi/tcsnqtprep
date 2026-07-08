export interface ExamQuestion {
  q: string;
  opts: string[];
  answer: number;
  exp: string;
  section: "Numerical" | "Reasoning" | "Verbal" | "AdvQuant";
  isTyped?: boolean;
  typedAnswer?: string;
  verbalType?: "sentence" | "passage" | "email";
  passageText?: string;
  image?: string;
}

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    "section": "Numerical",
    "isTyped": true,
    "q": "A vendor purchases lemons at the rate of 15 for ₹20 and sells them at the rate of 12 for ₹24. What is his overall profit percentage?",
    "opts": [],
    "answer": 0,
    "typedAnswer": "50",
    "exp": "Cost Price (CP) per lemon = 20 / 15 = ₹4/3. Selling Price (SP) per lemon = 24 / 12 = ₹2. Profit per lemon = 2 − 4/3 = ₹2/3. Profit percentage = (2/3) / (4/3) × 100% = 50%."
  },
  {
    "section": "Numerical",
    "isTyped": true,
    "q": "The greatest common divisor of two integers is 14, and their least common multiple is 6930. If one of the integers is 630, what is the other integer?",
    "opts": [],
    "answer": 0,
    "typedAnswer": "154",
    "exp": "The product of two numbers equals the product of their GCD and LCM. Let the unknown number be x. 630 × x = 14 × 6930, so x = (14 × 6930) / 630 = 154."
  },
  {
    "section": "Numerical",
    "isTyped": true,
    "q": "A 300-meter long bullet train passes a stationary signal post in 10 seconds. How long will it take for this same train to completely traverse a 1.2-kilometer long tunnel?",
    "opts": [],
    "answer": 0,
    "typedAnswer": "50",
    "exp": "The train's speed is 300 m / 10 s = 30 m/s. The total distance to pass the 1200 m tunnel is 1200 + 300 = 1500 meters. The time required is 1500 / 30 = 50 seconds."
  },
  {
    "section": "Numerical",
    "q": "Determine the last digit of the numeric value of 3¹²³.",
    "opts": [
      "1",
      "3",
      "7",
      "9"
    ],
    "answer": 2,
    "exp": "The powers of 3 end in a repeating cycle of 4 digits: 3, 9, 7, 1. Dividing the exponent 123 by 4 gives a remainder of 3. The 3rd value in the cycle is 7."
  },
  {
    "section": "Numerical",
    "q": "Alice and Bob can complete a software module in 8 days. Bob and Charlie can do it in 12 days, while Alice and Charlie need 24 days. How many days would it take if all three worked together?",
    "opts": [
      "6",
      "8",
      "10",
      "12"
    ],
    "answer": 1,
    "exp": "Adding their combined work rates gives 2 × (Alice + Bob + Charlie) = 1/8 + 1/12 + 1/24 = 6/24 = 1/4 per day. Dividing by 2, their true combined rate is 1/8 per day, meaning it will take them 8 days to finish the module."
  },
  {
    "section": "Numerical",
    "q": "Find the average of all prime numbers between 30 and 50.",
    "opts": [
      "38.8",
      "39.8",
      "40.8",
      "41.2"
    ],
    "answer": 1,
    "exp": "Primes between 30 and 50: 31, 37, 41, 43, 47\nSum = 199, Count = 5\nAverage = 199/5 = 39.8"
  },
  {
    "section": "Numerical",
    "q": "A retailer finds that the revenue from selling 40 smartphones equals the cost of purchasing 50 smartphones. What is his profit margin percentage?",
    "opts": [
      "10%",
      "15%",
      "20%",
      "25%"
    ],
    "answer": 3,
    "exp": "Let CP of 1 phone be C, SP be S. We are given 40 × S = 50 × C. Thus, S/C = 50/40 = 1.25. The profit margin is 25%."
  },
  {
    "section": "Numerical",
    "q": "An investor's portfolio grows to $6,050 over 2 years at a compound annual growth rate of 10%. What was the initial investment?",
    "opts": [
      "$4,800",
      "$5,000",
      "$5,200",
      "$5,500"
    ],
    "answer": 1,
    "exp": "Using the compound interest formula A = P(1 + r)², we plug in $6,050 = P(1.10)². $6,050 = P × 1.21. P = $6,050 / 1.21 = $5,000."
  },
  {
    "section": "Numerical",
    "q": "The current ratio of Emma's age to Noah's age is 4:5. Eight years from now, their age ratio will be 5:6. How old is Emma currently?",
    "opts": [
      "24",
      "32",
      "40",
      "48"
    ],
    "answer": 1,
    "exp": "Let their ages be 4x and 5x. After 8 years, (4x + 8) / (5x + 8) = 5 / 6. Cross-multiplying: 24x + 48 = 25x + 40, which yields x = 8. Emma's current age is 4 × 8 = 32 years."
  },
  {
    "section": "Numerical",
    "q": "Boat goes 30 km downstream in 2 h, 30 km upstream in 6 h. Speed of stream?",
    "opts": [
      "3 km/h",
      "4 km/h",
      "5 km/h",
      "6 km/h"
    ],
    "answer": 2,
    "exp": "Downstream speed = 30/2 = 15 km/h\nUpstream speed = 30/6 = 5 km/h\nStream = (15 − 5)/2 = 5 km/h"
  },
  {
    "section": "Numerical",
    "q": "How many ways can 'LEADER' be arranged?",
    "opts": [
      "720",
      "360",
      "480",
      "240"
    ],
    "answer": 1,
    "exp": "LEADER has 6 letters with E repeated twice.\nArrangements = 6!/2! = 720/2 = 360"
  },
  {
    "section": "Numerical",
    "q": "A number when divided by 296 leaves remainder 75. When divided by 37, remainder is?",
    "opts": [
      "0",
      "1",
      "2",
      "3"
    ],
    "answer": 1,
    "exp": "296 = 37 × 8 → 296 is exactly divisible by 37\nSo remainder = 75 mod 37 = 75 − 37×2 = 1"
  },
  {
    "section": "Numerical",
    "q": "The ratio of two positive integers is 5:8, and their least common multiple (LCM) is 120. What is the sum of these two integers?",
    "opts": [
      "33",
      "39",
      "45",
      "52"
    ],
    "answer": 1,
    "exp": "Let the numbers be 5k and 8k. Their LCM is 40k. Given 40k = 120, we find k = 3. The numbers are 15 and 24, and their sum is 15 + 24 = 39."
  },
  {
    "section": "Numerical",
    "q": "A shopkeeper marks goods 40% above CP and gives 10% discount. Find profit%.",
    "opts": [
      "24%",
      "26%",
      "28%",
      "30%"
    ],
    "answer": 1,
    "exp": "Profit% = x − y − (xy/100) = 40 − 10 − (40×10/100)\n= 30 − 4 = 26%"
  },
  {
    "section": "Numerical",
    "q": "A construction crew of 12 workers can build a wall in 14 days. If the project must be completed in 8 days, how many workers are needed in total?",
    "opts": [
      "18",
      "21",
      "24",
      "28"
    ],
    "answer": 1,
    "exp": "Using the Worker-Days constant: 12 × 14 = W × 8. 168 = 8W, so W = 21 workers."
  },
  {
    "section": "Numerical",
    "q": "Simple interest on ₹5000 at 8% per annum for 3 years?",
    "opts": [
      "₹1000",
      "₹1200",
      "₹1500",
      "₹1600"
    ],
    "answer": 1,
    "exp": "SI = (P × R × T) / 100 = (5000 × 8 × 3) / 100 = ₹1200"
  },
  {
    "section": "Numerical",
    "q": "A number is increased by 20% and then decreased by 20%. Net change?",
    "opts": [
      "No change",
      "4% increase",
      "4% decrease",
      "2% decrease"
    ],
    "answer": 2,
    "exp": "Net% = a + b + ab/100 = 20 + (−20) + (20×−20)/100\n= 0 − 4 = −4% → 4% decrease"
  },
  {
    "section": "Numerical",
    "q": "A team consisting of 5 developers and 4 designers needs to sit in a row for a photograph. In how many ways can they be arranged so that no two designers sit next to each other?",
    "opts": [
      "2880",
      "14400",
      "43200",
      "86400"
    ],
    "answer": 2,
    "exp": "First, arrange the 5 developers in 5! = 120 ways. This creates 6 possible spaces (including the ends) where designers can sit. We choose 4 of these 6 spaces and arrange the 4 designers in them, which is P(6,4) = 360 ways. Total arrangements = 120 × 360 = 43,200."
  },
  {
    "section": "Numerical",
    "q": "A motorboat travels 45 km downstream in the same amount of time it takes to travel 27 km upstream. If the speed of the river current is 2 km/h, what is the speed of the motorboat in still water?",
    "opts": [
      "6 km/h",
      "8 km/h",
      "10 km/h",
      "12 km/h"
    ],
    "answer": 1,
    "exp": "Let the boat's speed in still water be b. Time downstream = Time upstream, so 45 / (b + 2) = 27 / (b − 2). Cross-multiplying gives 45b − 90 = 27b + 54. Solving this yields 18b = 144, so b = 8 km/h."
  },
  {
    "section": "Numerical",
    "q": "A 60-liter container holds a mixture of juice and water in a 7:3 ratio. How many liters of water must be added so that the new ratio of juice to water becomes 1:1?",
    "opts": [
      "18 L",
      "24 L",
      "30 L",
      "42 L"
    ],
    "answer": 1,
    "exp": "The initial 60 liters is divided in a 7:3 ratio, meaning there are (7/10) × 60 = 42 liters of juice and 18 liters of water. To achieve a 1:1 ratio, the volume of water must equal the volume of juice (42 liters). Therefore, 42 − 18 = 24 liters of water must be added."
  },
  {
    "section": "Reasoning",
    "q": "A square sheet of paper has a triangle pointing UP in the top-left corner. If the entire sheet is rotated 90 degrees clockwise, where is the triangle located and which way does it point?",
    "opts": [
      "Top-right corner, pointing RIGHT",
      "Bottom-right corner, pointing DOWN",
      "Top-right corner, pointing UP",
      "Bottom-left corner, pointing RIGHT"
    ],
    "answer": 0,
    "exp": "When a square is rotated 90 degrees clockwise, the top-left corner moves to the top-right corner. A triangle pointing UP will also rotate 90 degrees clockwise, meaning it will now point RIGHT."
  },
  {
    "section": "Reasoning",
    "q": "A figure consists of a horizontal line with a solid circle on the left end and a hollow square on the right end. If the figure is rotated 180 degrees in the plane, what is the resulting orientation?",
    "opts": [
      "Horizontal line, hollow square on the left, solid circle on the right",
      "Vertical line, solid circle on top, hollow square on the bottom",
      "Horizontal line, solid circle on the left, hollow square on the right",
      "Vertical line, hollow square on top, solid circle on the bottom"
    ],
    "answer": 0,
    "exp": "A 180-degree rotation flips the left and right sides (as well as up and down). The left end (circle) moves to the right end, and the right end (square) moves to the left end. The line remains horizontal."
  },
  {
    "section": "Reasoning",
    "q": "Introducing a guest at a party, a woman remarks, \"His wife is the only daughter of my mother's husband.\" How is the guest related to the woman?",
    "opts": [
      "Brother",
      "Uncle",
      "Husband",
      "Brother-in-law"
    ],
    "answer": 2,
    "exp": "The woman's \"mother's husband\" is her father. The \"only daughter\" of her father is the woman herself. Therefore, the guest's wife is the woman speaking, meaning the guest is her husband."
  },
  {
    "section": "Reasoning",
    "q": "All roses are flowers. Some flowers fade quickly. Conclusion I: Some roses fade. II: All flowers are roses.",
    "opts": [
      "Only I follows",
      "Only II follows",
      "Neither follows",
      "Both follow"
    ],
    "answer": 2,
    "exp": "I: 'Some flowers fade' doesn't necessarily include roses — NOT valid.\nII: Converse of first premise — NOT valid.\nNeither conclusion follows."
  },
  {
    "section": "Reasoning",
    "q": "A is to the south of B. C is to the east of B. In which direction is C w.r.t. A?",
    "opts": [
      "North-East",
      "North-West",
      "South-East",
      "South-West"
    ],
    "answer": 0,
    "exp": "A is south of B → B is north of A.\nC is east of B → C is north-east of A."
  },
  {
    "section": "Reasoning",
    "q": "Complete the series: AZ, BY, CX, ?",
    "opts": [
      "DV",
      "DW",
      "EW",
      "CW"
    ],
    "answer": 1,
    "exp": "First letter: A, B, C, D (+1 each)\nSecond letter: Z, Y, X, W (−1 each)\nAnswer: DW"
  },
  {
    "section": "Reasoning",
    "q": "If 5×4 = 15, 7×3 = 18, then 6×5 = ?",
    "opts": [
      "20",
      "25",
      "30",
      "24"
    ],
    "answer": 1,
    "exp": "Pattern: a×b − a = result\n5×4−5 = 15 ✓, 7×3−3 = 18 ✓\n6×5−5 = 25"
  },
  {
    "section": "Reasoning",
    "q": "A drone flies 8 km East, turns right and flies 6 km, then turns right again and flies 8 km. How far is the drone from its starting point?",
    "opts": [
      "6 km",
      "8 km",
      "10 km",
      "14 km"
    ],
    "answer": 0,
    "exp": "The drone goes East (8 km), South (6 km), and West (8 km). The East and West movements cancel out, leaving the drone 6 km directly South of the start."
  },
  {
    "section": "Reasoning",
    "q": "Odd one out: 8, 27, 64, 100, 125",
    "opts": [
      "8",
      "27",
      "100",
      "125"
    ],
    "answer": 2,
    "exp": "8=2³, 27=3³, 64=4³, 125=5³ — all perfect cubes.\n100 is NOT a perfect cube → odd one out."
  },
  {
    "section": "Reasoning",
    "q": "Six people around a circular table. Distinct seating arrangements?",
    "opts": [
      "720",
      "120",
      "360",
      "60"
    ],
    "answer": 1,
    "exp": "Circular arrangements = (n−1)! = (6−1)! = 5! = 120"
  },
  {
    "section": "Reasoning",
    "q": "What is the angle between clock hands at 3:40?",
    "opts": [
      "120°",
      "125°",
      "130°",
      "135°"
    ],
    "answer": 2,
    "exp": "Formula: |30H − 5.5M| = |30×3 − 5.5×40| = |90 − 220| = 130°"
  },
  {
    "section": "Reasoning",
    "q": "Looking at a portrait, a man states, \"The father of this person is the only son of my father.\" If the man has no brothers, who is in the portrait?",
    "opts": [
      "His nephew",
      "His cousin",
      "His father",
      "His child"
    ],
    "answer": 3,
    "exp": "Since the man has no brothers, the \"only son of my father\" is the man himself. The statement simplifies to \"The father of this person is me\", which means the person in the portrait is his child."
  },
  {
    "section": "Reasoning",
    "q": "P is 7th from left, Q is 9th from right in a row of 20. How many people between P and Q?",
    "opts": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 2,
    "exp": "P = 7th from left. Q = 9th from right = 20−9+1 = 12th from left.\nBetween P(7) and Q(12): 12−7−1 = 4 people"
  },
  {
    "section": "Reasoning",
    "q": "Facing East, turn left twice. Which direction are you facing?",
    "opts": [
      "North",
      "South",
      "East",
      "West"
    ],
    "answer": 3,
    "exp": "East → turn left → North → turn left → West"
  },
  {
    "section": "Reasoning",
    "q": "In a code language, MANGO is written as NBNHP. How is APPLE written?",
    "opts": [
      "BQQMF",
      "BQPMF",
      "BQQNF",
      "BPQMF"
    ],
    "answer": 0,
    "exp": "Each letter is shifted +1: M→N, A→B, N→O, G→H, O→P\nAPPLE: A→B, P→Q, P→Q, L→M, E→F → BQQMF"
  },
  {
    "section": "Reasoning",
    "q": "If a project launches on a Tuesday, and the first major update is scheduled exactly 150 days later, on what day of the week will the update occur?",
    "opts": [
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "answer": 1,
    "exp": "Dividing 150 by 7 gives a quotient of 21 and a remainder of 3. Three days after Tuesday is Friday."
  },
  {
    "section": "Reasoning",
    "q": "A is mother of B. C is father of B. D is brother of C. How is D related to B?",
    "opts": [
      "Uncle",
      "Father",
      "Brother",
      "Cousin"
    ],
    "answer": 0,
    "exp": "C is B's father. D is C's brother → D is B's paternal uncle."
  },
  {
    "section": "Reasoning",
    "q": "An open dice is shown below. When folded into a cube, which face will be opposite to 3?",
    "image": "/exam-images/dice.svg",
    "opts": [
      "4",
      "5",
      "6",
      "1"
    ],
    "answer": 2,
    "exp": "From views 1 and 2, face 3 is adjacent to 1, 2, 4, and 5. Since a dice has 6 faces, the only remaining face is 6, which must be opposite to 3."
  },
  {
    "section": "Reasoning",
    "q": "An unfolded cube (a net) consists of 4 squares in a straight vertical line labeled A, B, C, D from top to bottom, with square E attached to the left of square B, and square F attached to the right of square C. Which face is opposite to square B?",
    "image": "/exam-images/cube-net.svg",
    "opts": [
      "A",
      "C",
      "D",
      "F"
    ],
    "answer": 2,
    "exp": "Faces in a straight line separated by one face are opposite. In the vertical line A-B-C-D, face A is opposite C, and face B is opposite D."
  },
  {
    "section": "Reasoning",
    "q": "In a figure series, the first frame has a single arrow pointing UP. The second frame has the arrow pointing RIGHT and 1 dot appears. The third frame has the arrow pointing DOWN and 2 dots appear. What should the fourth frame look like?",
    "image": "/exam-images/pattern.svg",
    "opts": [
      "/exam-images/pattern-opt0.svg",
      "/exam-images/pattern-opt1.svg",
      "/exam-images/pattern-opt2.svg",
      "/exam-images/pattern-opt3.svg"
    ],
    "answer": 2,
    "exp": "The arrow rotates 90 degrees clockwise in each frame (UP -> RIGHT -> DOWN -> LEFT). The number of dots increases by one in each frame (0 -> 1 -> 2 -> 3)."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "The company plans to ____ its operations next year.",
    "isTyped": true,
    "typedAnswer": "expand",
    "opts": [],
    "answer": 0,
    "exp": "Expand fits best."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "She has been working here ____ 2015.",
    "isTyped": true,
    "typedAnswer": "since",
    "opts": [],
    "answer": 0,
    "exp": "'Since' is used with a specific point in time."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "He is good ____ mathematics.",
    "isTyped": true,
    "typedAnswer": "at",
    "opts": [],
    "answer": 0,
    "exp": "'at' is the correct preposition."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "The manager's decision was ____; nobody could change it.",
    "isTyped": true,
    "typedAnswer": "final",
    "opts": [],
    "answer": 0,
    "exp": "Final means conclusive."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "She is married ____ a doctor.",
    "isTyped": true,
    "typedAnswer": "to",
    "opts": [],
    "answer": 0,
    "exp": "'to' is the correct preposition."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "He worked hard ____ he could pass the exam.",
    "isTyped": true,
    "typedAnswer": "so",
    "opts": [],
    "answer": 0,
    "exp": "'so' expresses purpose."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "I will call you ____ I arrive.",
    "isTyped": true,
    "typedAnswer": "when",
    "opts": [],
    "answer": 0,
    "exp": "'when' indicates time."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "The book is ____ the table.",
    "isTyped": true,
    "typedAnswer": "on",
    "opts": [],
    "answer": 0,
    "exp": "'on' indicates surface position."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "He is afraid ____ spiders.",
    "isTyped": true,
    "typedAnswer": "of",
    "opts": [],
    "answer": 0,
    "exp": "'afraid of' is the correct collocation."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "I have known him ____ ten years.",
    "isTyped": true,
    "typedAnswer": "for",
    "opts": [],
    "answer": 0,
    "exp": "'for' is used for duration."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "She is interested ____ learning new languages.",
    "isTyped": true,
    "typedAnswer": "in",
    "opts": [],
    "answer": 0,
    "exp": "'interested in' is the correct collocation."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "He apologized ____ his mistake.",
    "isTyped": true,
    "typedAnswer": "for",
    "opts": [],
    "answer": 0,
    "exp": "'apologize for' is the correct collocation."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "The train departs ____ 5 PM.",
    "isTyped": true,
    "typedAnswer": "at",
    "opts": [],
    "answer": 0,
    "exp": "'at' is used for specific times."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "I am looking forward ____ meeting you.",
    "isTyped": true,
    "typedAnswer": "to",
    "opts": [],
    "answer": 0,
    "exp": "'looking forward to' is a phrasal verb."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "She is capable ____ doing it herself.",
    "isTyped": true,
    "typedAnswer": "of",
    "opts": [],
    "answer": 0,
    "exp": "'capable of' is the correct collocation."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "He was accused ____ stealing.",
    "isTyped": true,
    "typedAnswer": "of",
    "opts": [],
    "answer": 0,
    "exp": "'accused of' is the correct collocation."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "I prefer tea ____ coffee.",
    "isTyped": true,
    "typedAnswer": "to",
    "opts": [],
    "answer": 0,
    "exp": "'prefer...to' is the correct structure."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "She is immune ____ the virus.",
    "isTyped": true,
    "typedAnswer": "to",
    "opts": [],
    "answer": 0,
    "exp": "'immune to' is the correct collocation."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "He is oblivious ____ his surroundings.",
    "isTyped": true,
    "typedAnswer": "to",
    "opts": [],
    "answer": 0,
    "exp": "'oblivious to' is the correct collocation."
  },
  {
    "section": "Verbal",
    "verbalType": "sentence",
    "q": "I am confident ____ your abilities.",
    "isTyped": true,
    "typedAnswer": "in",
    "opts": [],
    "answer": 0,
    "exp": "'confident in' is the correct collocation."
  },
  {
    "section": "Verbal",
    "verbalType": "passage",
    "q": "Reconstruct the passage.",
    "passageText": "The industrial revolution marked a major turning point in history. Almost every aspect of daily life was influenced in some way. In particular, average income and population began to exhibit unprecedented sustained growth.",
    "isTyped": true,
    "opts": [],
    "answer": 0,
    "exp": "Your answer will be scored for clear and accurate content, not word-for-word memorization."
  },
  {
    "section": "Verbal",
    "verbalType": "passage",
    "q": "Reconstruct the passage.",
    "passageText": "Climate change is a long-term shift in global or regional climate patterns. Often climate change refers specifically to the rise in global temperatures from the mid-20th century to present. It is largely attributed to the increased levels of atmospheric carbon dioxide produced by the use of fossil fuels.",
    "isTyped": true,
    "opts": [],
    "answer": 0,
    "exp": "Your answer will be scored for clear and accurate content, not word-for-word memorization."
  },
  {
    "section": "Verbal",
    "verbalType": "passage",
    "q": "Reconstruct the passage.",
    "passageText": "Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.",
    "isTyped": true,
    "opts": [],
    "answer": 0,
    "exp": "Your answer will be scored for clear and accurate content, not word-for-word memorization."
  },
  {
    "section": "Verbal",
    "verbalType": "passage",
    "q": "Reconstruct the passage.",
    "passageText": "The internet is a vast network that connects computers all over the world. Through the internet, people can share information and communicate from anywhere with an internet connection. It has revolutionized the way we live and work.",
    "isTyped": true,
    "opts": [],
    "answer": 0,
    "exp": "Your answer will be scored for clear and accurate content, not word-for-word memorization."
  },
  {
    "section": "Verbal",
    "verbalType": "email",
    "q": "Read the following situation and write an email addressing the issues described. You must write at least 100 words.\n\nSituation: You ordered a laptop from an online store. It was supposed to arrive in 3 days, but it has been two weeks. Write an email to customer service complaining about the delay and requesting a refund or immediate shipping.",
    "isTyped": true,
    "opts": [],
    "answer": 0,
    "exp": "Your answer will be scored on clarity, tone, and grammar."
  },
  {
    "section": "AdvQuant",
    "q": "A bag contains 5 red, 4 blue, and 3 green marbles. If 3 marbles are drawn at random, what is the probability that exactly 2 are red and 1 is blue?",
    "opts": [
      "12/55",
      "10/55",
      "4/55",
      "2/11"
    ],
    "answer": 3,
    "exp": "Ways to choose 2 red out of 5 = C(5,2) = 10. Ways to choose 1 blue out of 4 = C(4,1) = 4. Total favourable ways = 40. Total ways to choose 3 from 12 = C(12,3) = (12*11*10)/(3*2*1) = 220. Probability = 40/220 = 4/22 = 2/11."
  },
  {
    "section": "AdvQuant",
    "q": "In how many distinct ways can the letters of the word 'ASSASSINATION' be arranged?",
    "opts": [
      "10,810,800",
      "1,816,214,400",
      "39,916,800",
      "2,102,100"
    ],
    "answer": 0,
    "exp": "The word contains 13 letters. Frequencies: A(3), S(4), I(2), N(2), T(1), O(1). Number of arrangements = 13! / (3! * 4! * 2! * 2!) = 10,810,800."
  },
  {
    "section": "AdvQuant",
    "q": "Two trains of lengths 150m and 180m are running on parallel tracks in the same direction at 50 km/hr and 32 km/hr respectively. In what time will they completely cross each other?",
    "opts": [
      "33 seconds",
      "66 seconds",
      "45 seconds",
      "72 seconds"
    ],
    "answer": 1,
    "exp": "Relative speed = (50 - 32) km/hr = 18 km/hr = 18 * (5/18) m/s = 5 m/s. Total distance = 150 + 180 = 330m. Time = Distance / Speed = 330 / 5 = 66 seconds."
  },
  {
    "section": "AdvQuant",
    "q": "A vessel contains 60 litres of milk. 6 litres are drawn off and replaced by water. This process is repeated twice more. How much milk is left in the vessel?",
    "opts": [
      "43.74 litres",
      "40.50 litres",
      "42.00 litres",
      "45.00 litres"
    ],
    "answer": 0,
    "exp": "Formula: Amount left = Initial Amount * (1 - (Replacement Volume / Total Volume))^n. Milk left = 60 * (1 - 6/60)^3 = 60 * (9/10)^3 = 60 * (729/1000) = 43.74 litres."
  },
  {
    "section": "AdvQuant",
    "q": "Find the remainder when 2^256 is divided by 17.",
    "opts": [
      "1",
      "2",
      "4",
      "16"
    ],
    "answer": 0,
    "exp": "By Fermat's Little Theorem, 2^(17-1) ≡ 1 (mod 17), so 2^16 ≡ 1 (mod 17). Since 256 = 16 * 16, (2^16)^16 ≡ 1^16 ≡ 1 (mod 17). Remainder is 1."
  },
  {
    "section": "AdvQuant",
    "q": "If a sum of money at compound interest amounts to thrice itself in 3 years, in how many years will it become 9 times itself?",
    "opts": [
      "6 years",
      "9 years",
      "12 years",
      "15 years"
    ],
    "answer": 0,
    "exp": "P(1+r)^3 = 3P -> (1+r)^3 = 3. We want P(1+r)^t = 9P -> (1+r)^t = 9. Since 9 = 3^2, (1+r)^t = ((1+r)^3)^2 = (1+r)^6. Thus, t = 6 years."
  },
  {
    "section": "AdvQuant",
    "q": "A solid cube is painted red on all faces. It is then cut into 64 smaller equal-sized cubes. How many small cubes have exactly two faces painted?",
    "opts": [
      "16",
      "24",
      "32",
      "8"
    ],
    "answer": 1,
    "exp": "For an n x n x n cube (here n=4), the number of cubes with exactly 2 faces painted is 12(n-2). So, 12(4-2) = 12 * 2 = 24."
  },
  {
    "section": "AdvQuant",
    "q": "A man covers half his journey at 6 km/h and the remaining half at 3 km/h. What is his average speed for the entire journey?",
    "opts": [
      "4.5 km/h",
      "4 km/h",
      "5 km/h",
      "3.5 km/h"
    ],
    "answer": 1,
    "exp": "Average speed = (2 * v1 * v2) / (v1 + v2) = (2 * 6 * 3) / (6 + 3) = 36 / 9 = 4 km/h."
  },
  {
    "section": "AdvQuant",
    "q": "Statement 1: All squares are rectangles. Statement 2: All rectangles are polygons. Conclusion I: All squares are polygons. Conclusion II: All polygons are squares. Which conclusion logically follows?",
    "opts": [
      "Only I follows",
      "Only II follows",
      "Both I and II follow",
      "Neither I nor II follows"
    ],
    "answer": 0,
    "exp": "By syllogism rules (A + A = A), All squares are polygons is a valid deduction. However, the reverse (all polygons are squares) is completely invalid."
  },
  {
    "section": "AdvQuant",
    "q": "If A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}, how many subsets does the set (A ∩ B) have?",
    "opts": [
      "2",
      "4",
      "8",
      "16"
    ],
    "answer": 1,
    "exp": "A ∩ B = {4, 5}. The number of subsets for a set with n elements is 2^n. Here n = 2, so 2^2 = 4 subsets."
  },
  {
    "section": "AdvQuant",
    "q": "What is the angle between the hour and minute hands of a clock at 8:20?",
    "opts": [
      "130 degrees",
      "140 degrees",
      "120 degrees",
      "150 degrees"
    ],
    "answer": 0,
    "exp": "Angle = |(30 * H) - (5.5 * M)| = |(30 * 8) - (5.5 * 20)| = |240 - 110| = 130 degrees."
  },
  {
    "section": "AdvQuant",
    "q": "A pipe can fill a tank in 12 hours. Due to a leak at the bottom, it takes 15 hours to fill the tank. If the tank is full, in how much time will the leak empty it?",
    "opts": [
      "30 hours",
      "45 hours",
      "60 hours",
      "75 hours"
    ],
    "answer": 2,
    "exp": "Work rate of pipe = 1/12. Combined work rate = 1/15. Leak rate = (1/12) - (1/15) = (5-4)/60 = 1/60. The leak will empty the tank in 60 hours."
  },
  {
    "section": "AdvQuant",
    "q": "Find the unit digit of the product 81 x 82 x 83 x ... x 89.",
    "opts": [
      "0",
      "2",
      "6",
      "8"
    ],
    "answer": 0,
    "exp": "The series includes 82 and 85. The product of any even number and 5 results in a number ending in 0. Thus, the entire product ends in 0."
  },
  {
    "section": "AdvQuant",
    "q": "If log2(x) + log2(x-3) = 2, what is the value of x?",
    "opts": [
      "4",
      "1",
      "-1",
      "2"
    ],
    "answer": 0,
    "exp": "log2(x(x-3)) = 2 -> x(x-3) = 2^2 -> x^2 - 3x - 4 = 0. Solving the quadratic gives (x-4)(x+1) = 0. Since x > 3 (for logs to be valid), x = 4."
  }
];
