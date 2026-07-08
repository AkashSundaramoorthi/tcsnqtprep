export interface Topic {
  title: string;
  cat: string;
  desc: string;
  formula: string[];
  method: string[];
  example: { problem: string; solution: string };
  problems: { q: string; sol: string; difficulty: "Easy" | "Medium" | "Hard" }[];
}

export const TOPICS: Topic[] = [
  {
    "cat": "Numerical",
    "title": "Number System — Unit Digits, Divisibility & HCF/LCM",
    "desc": "Unit digits follow repeating cycles when you raise a number to a power — for example, 7¹ ends in 7, 7² ends in 9, 7³ ends in 3, 7⁴ ends in 1, then it repeats. Divisibility rules let you check if a number divides cleanly without doing long division. HCF is the largest number that divides both, LCM is the smallest number both divide into — and HCF × LCM always equals the product of the two numbers.",
    "formula": [
      "Cyclicity lengths: {0,1,5,6} -> 1, {4,9} -> 2, {2,3,7,8} -> 4",
      "Unit digit of a^b = Unit digit of [ (last digit of a) ^ (b mod cyclicity) ]",
      "If b mod cyclicity == 0, use the cyclicity length as the effective exponent.",
      "HCF(a, b) × LCM(a, b) = a × b",
      "If d = k × q (k is a factor of d), then N mod k = (N mod d) mod k"
    ],
    "example": {
      "problem": "Find the unit digit of 7⁹⁵.",
      "solution": "Cycle of 7: (7, 9, 3, 1) — length 4.\n95 ÷ 4 = 23 remainder 3.\nTake the 3rd element of the cycle = 3.\nUnit digit of 7⁹⁵ is 3."
    },
    "method": [
      "Unit digit of aᵇ depends ONLY on the last digit of a. Find its cyclicity.",
      "Cyclicity: 0,1,5,6 → cycle 1. 4,9 → cycle 2. 2,3,7,8 → cycle 4.",
      "Compute b mod (cycle length). If result = 0, take the LAST element of the cycle.",
      "HCF × LCM = Product of the two numbers.",
      "Remainder shortcut: if N = d×q + r and d is a multiple of k, then N mod k = r mod k."
    ],
    "problems": [
      {
        "q": "Find the unit digit of 4¹⁷.",
        "sol": "Cycle of 4 = (4, 6), length 2.\n17 is odd → 1st element = 4.\nUnit digit = 4.",
        "difficulty": "Easy"
      },
      {
        "q": "Find the unit digit of 13³⁵ × 27²².",
        "sol": "13 → unit 3, cycle (3,9,7,1) len 4: 35 mod 4=3 → 7.\n27 → unit 7, cycle (7,9,3,1) len 4: 22 mod 4=2 → 9.\n7×9=63 → unit digit = 3.",
        "difficulty": "Medium"
      },
      {
        "q": "Find the unit digit of 2²⁵⁶.",
        "sol": "Cycle of 2 = (2,4,8,6), length 4.\n256 mod 4 = 0 → last element = 6.\nUnit digit = 6.",
        "difficulty": "Easy"
      },
      {
        "q": "HCF of two numbers is 11 and LCM is 7700. One number is 275. Find the other.",
        "sol": "Other = (HCF × LCM) / first = (11 × 7700) / 275 = 308.",
        "difficulty": "Easy"
      },
      {
        "q": "Find the least number divisible by 12, 15, 20, and 27 with remainder 8.",
        "sol": "LCM(12,15,20,27) = 540.\nLeast number = 540 + 8 = 548.",
        "difficulty": "Medium"
      },
      {
        "q": "A number divided by 296 leaves remainder 75. Remainder when divided by 37?",
        "sol": "296 = 37 × 8, so 296 is divisible by 37.\n75 ÷ 37 = 2 remainder 1.\nAnswer = 1.",
        "difficulty": "Medium"
      },
      {
        "q": "Find the largest 3-digit number exactly divisible by 8.",
        "sol": "999 ÷ 8 = 124.8 → 124 × 8 = 992.\nAnswer = 992.",
        "difficulty": "Easy"
      },
      {
        "q": "What is the remainder when 2⁷³ is divided by 8?",
        "sol": "2³ = 8. For any n ≥ 3, 2ⁿ is divisible by 8.\n73 ≥ 3 → remainder = 0.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Numerical",
    "title": "Percentages — Growth, Decrease & Successive Changes",
    "desc": "A percentage is just a fraction out of 100. The trap in NQT questions is successive changes — if something increases by 20% then decreases by 20%, you do NOT get back to the start. You multiply the multipliers: 1.2 × 0.8 = 0.96, so you end up 4% down. Always convert percentages to multipliers before chaining them.",
    "formula": [
      "\\text{Percentage Value} = \\frac{\\text{Part}}{\\text{Base}} \\times 100",
      "\\text{Net Successive Change (a\\% then b\\%)} = a + b + \\frac{a \\times b}{100}",
      "\\text{If A is } x\\% \\text{ more than B, then B is less than A by } = \\frac{x}{100 + x} \\times 100",
      "\\text{If A is } x\\% \\text{ less than B, then B is more than A by } = \\frac{x}{100 - x} \\times 100",
      "\\text{Population after } n \\text{ years} = \\text{Initial} \\times \\left(1 \\pm \\frac{r}{100}\\right)^n"
    ],
    "example": {
      "problem": "A number is increased by 20% and then decreased by 20%. What is the net change?",
      "solution": "Use the successive change formula: net = a + b + ab/100\na = +20, b = −20\nnet = 20 + (−20) + (20×−20)/100\nnet = 0 − 4 = −4%\nThe number decreases by 4%."
    },
    "method": [
      "x% of y = (x/100) × y. Always identify the base before applying a percentage.",
      "Successive % change: net = a + b + ab/100.",
      "If A is x% more than B → B less than A = x/(100+x) × 100.",
      "Population/growth: Final = Initial × (1 ± r/100)ⁿ.",
      "Fractions to memorise: 1/8=12.5%, 1/6≈16.67%, 1/3≈33.33%, 3/8=37.5%."
    ],
    "problems": [
      {
        "q": "If 30% of a number is 150, find the number.",
        "sol": "Number = 150 / 0.30 = 500.",
        "difficulty": "Easy"
      },
      {
        "q": "In an exam 40% students failed. If 300 passed, find total students.",
        "sol": "Passed = 60%\nTotal = 300 / 0.60 = 500.",
        "difficulty": "Easy"
      },
      {
        "q": "Two successive discounts of 10% and 20% equal a single discount of?",
        "sol": "Net = 10 + 20 + (10×−20)/100\n= 30 − 2 = 28%.",
        "difficulty": "Medium"
      },
      {
        "q": "A's salary is 25% more than B's. By what % is B's salary less than A's?",
        "sol": "B less than A = 25/(100+25) × 100\n= 25/125 × 100 = 20%.",
        "difficulty": "Medium"
      },
      {
        "q": "If the price of sugar rises 25%, by what % must consumption fall to keep expenditure the same?",
        "sol": "Reduction = 25/(100+25) × 100\n= 25/125 × 100 = 20%.",
        "difficulty": "Medium"
      },
      {
        "q": "Population of a town is 1,00,000 and grows at 10% p.a. Population after 2 years?",
        "sol": "Final = 1,00,000 × (1.10)²\n= 1,00,000 × 1.21 = 1,21,000.",
        "difficulty": "Easy"
      },
      {
        "q": "A student scores 220 out of 400. What % must he score in remaining 200 marks to get 60% overall?",
        "sol": "Total needed = 600 × 0.60 = 360.\nAlready scored = 220.\nNeeded in remaining = 140.\n140/200 × 100 = 70%.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Numerical",
    "title": "Profit, Loss & Discount — Marked Price & Trade Problems",
    "desc": "Profit and loss are always calculated on Cost Price unless the question says otherwise. Marked Price is what's written on the tag, Selling Price is what's actually paid after discount. The key relationship: SP = MP × (1 − discount%) = CP × (1 + profit%). Most questions give you two of these and ask for the third.",
    "formula": [
      "\\text{Profit}\\% = \\frac{\\text{SP} - \\text{CP}}{\\text{CP}} \\times 100",
      "\\text{Loss}\\% = \\frac{\\text{CP} - \\text{SP}}{\\text{CP}} \\times 100",
      "\\text{SP after Discount} = \\text{MP} \\times \\left(1 - \\frac{\\text{Discount}\\%}{100}\\right)",
      "\\text{Net Profit}\\% = x - y - \\frac{x \\times y}{100}",
      "\\text{If CP of m = SP of n, Gain}\\% = \\frac{m - n}{n} \\times 100",
      "\\text{Overall Loss}\\% = \\left(\\frac{x}{10}\\right)^2"
    ],
    "example": {
      "problem": "A shopkeeper marks goods 40% above cost price and gives a 10% discount. Find the profit%.",
      "solution": "Let CP = ₹100.\nMarked Price = CP × 1.40 = ₹140.\nAfter 10% discount: SP = 140 × 0.90 = ₹126.\nProfit = SP − CP = 126 − 100 = ₹26.\nProfit% = (26/100) × 100 = 26%.\n\nShortcut: Profit% = 40 − 10 − (40×10)/100 = 30 − 4 = 26%."
    },
    "method": [
      "Profit% = (SP − CP)/CP × 100. Loss% = (CP − SP)/CP × 100.",
      "If CP of m articles = SP of n articles → Gain% = (m−n)/n × 100.",
      "Discount is ALWAYS on Marked Price (MP). SP = MP × (1 − D/100).",
      "Mark-up then discount: Profit% = x − y − xy/100.",
      "Two items sold at same SP, one at x% gain and one at x% loss → always a LOSS of (x/10)²%."
    ],
    "problems": [
      {
        "q": "CP of 20 articles = SP of 16 articles. Find gain%.",
        "sol": "Gain% = (20−16)/16 × 100\n= 4/16 × 100 = 25%.",
        "difficulty": "Easy"
      },
      {
        "q": "An item bought for ₹400 is sold for ₹460. Find profit%.",
        "sol": "Profit = 460−400 = ₹60.\nProfit% = (60/400) × 100 = 15%.",
        "difficulty": "Easy"
      },
      {
        "q": "By selling an article for ₹450 a man loses 10%. Find CP.",
        "sol": "SP = CP × (1 − 10/100)\n450 = CP × 0.90\nCP = 450/0.90 = ₹500.",
        "difficulty": "Easy"
      },
      {
        "q": "A trader gives 20% discount and makes 20% profit. Find ratio of MP to CP.",
        "sol": "SP = MP × 0.80 and SP = CP × 1.20\nSo MP × 0.80 = CP × 1.20\nMP/CP = 1.20/0.80 = 3:2.",
        "difficulty": "Medium"
      },
      {
        "q": "A sells to B at 20% profit, B sells to C at 25% profit. C pays ₹450. Find A's cost.",
        "sol": "A's CP = C's price / (1.20 × 1.25)\n= 450 / 1.50 = ₹300.",
        "difficulty": "Medium"
      },
      {
        "q": "A man sells two items at ₹990 each, one at 10% gain, other at 10% loss. Net result?",
        "sol": "Two items, same SP, same ±% → always a loss.\nLoss% = (10)²/100 = 1%.",
        "difficulty": "Hard"
      },
      {
        "q": "A dishonest dealer uses 900 g weight for 1 kg. Find gain%.",
        "sol": "He sells 900 g but charges for 1000 g.\nGain = (1000−900)/900 × 100\n= 100/900 × 100 ≈ 11.11%.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Numerical",
    "title": "Ratio, Proportion & Age Problems",
    "desc": "A ratio just means \"for every X of one thing there are Y of another.\" Age problems use the fact that the difference between two people's ages never changes — if A is 5 years older than B today, A is still 5 years older in 10 years. Set up a variable x for the ratio multiplier, write the future or past ages in terms of x, then solve.",
    "formula": [
      "If A:B = p:q and B:C = r:s, then combined ratio A:B:C = (p × r) : (q × r) : (q × s)",
      "\\text{If } \\frac{a}{b} = \\frac{c}{d} \\text{, then } a \\times d = b \\times c",
      "\\text{Age matching: solve } \\frac{at + x}{bt + x} = \\frac{c}{d}"
    ],
    "example": {
      "problem": "Ages of A and B are in ratio 5:7. After 6 years it becomes 3:4. Find A's present age.",
      "solution": "Let present ages be 5x and 7x.\nAfter 6 years: (5x+6)/(7x+6) = 3/4\nCross-multiply: 4(5x+6) = 3(7x+6)\n20x + 24 = 21x + 18\nx = 6\nA's present age = 5 × 6 = 30 years."
    },
    "method": [
      "Assign multiplier x to the ratio: 5:7 → 5x and 7x. Form and solve the equation.",
      "Future ages: add the same number to both sides.",
      "If A:B = p:q and B:C = r:s → A:B:C = pr:qr:qs.",
      "Proportion cross-multiply: a/b = c/d → ad = bc."
    ],
    "problems": [
      {
        "q": "A father is 30 years older than his son. In 5 years he will be twice the son's age. Find son's present age.",
        "sol": "Let son = S, father = S+30.\nIn 5 years: (S+35) = 2(S+5)\nS+35 = 2S+10\nS = 25 years.",
        "difficulty": "Easy"
      },
      {
        "q": "Ratio of A:B 5 years ago was 3:4. Present ratio is 4:5. Find present ages.",
        "sol": "Past ages: 3x and 4x.\nPresent: 3x+5 and 4x+5.\n(3x+5)/(4x+5) = 4/5\n15x+25 = 16x+20 → x=5.\nA=20, B=25.",
        "difficulty": "Medium"
      },
      {
        "q": "Divide ₹870 among A, B, C in ratio 1/2 : 1/3 : 1/4.",
        "sol": "Multiply all by LCM(2,3,4)=12 → ratio 6:4:3.\nTotal parts = 13.\nA = 6/13×870 = ₹401.5\nB = 4/13×870 = ₹267.7\nC = 3/13×870 = ₹200.8.",
        "difficulty": "Medium"
      },
      {
        "q": "Two numbers in ratio 4:7. Adding 6 to each gives ratio 5:8. Find the numbers.",
        "sol": "(4x+6)/(7x+6) = 5/8\n8(4x+6) = 5(7x+6)\n32x+48 = 35x+30\nx = 6\nNumbers = 24 and 42.",
        "difficulty": "Medium"
      },
      {
        "q": "If A:B = 2:3 and B:C = 4:5, find A:B:C.",
        "sol": "A:B = 2:3 and B:C = 4:5\nA:B:C = (2×4):(3×4):(3×5) = 8:12:15.",
        "difficulty": "Easy"
      },
      {
        "q": "The ratio of two numbers is 3:5 and their sum is 64. Find the larger number.",
        "sol": "Larger = 5/(3+5) × 64 = 5/8 × 64 = 40.",
        "difficulty": "Easy"
      }
    ]
  },
  {
    "cat": "Numerical",
    "title": "Speed, Distance & Time — Trains, Boats & Relative Speed",
    "desc": "The core formula is Distance = Speed × Time, and every question is just a rearrangement of this. For trains passing each other or a platform, the distance is the length of the train plus the length of whatever it's passing. For boats, going downstream means adding the stream speed, upstream means subtracting it. Relative speed: if two objects move toward each other, add their speeds; if in the same direction, subtract.",
    "formula": [
      "\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}",
      "\\text{km/h to m/s: } \\times \\frac{5}{18} \\quad | \\quad \\text{m/s to km/h: } \\times \\frac{18}{5}",
      "Train crossing stationary object (pole/man): Distance = Length of Train",
      "Train crossing platform/bridge: Distance = Length of Train + Length of Platform",
      "Relative Speed (Opposite Directions) = Speed_A + Speed_B",
      "Relative Speed (Same Direction) = Speed_A - Speed_B",
      "\\text{Average Speed} = \\frac{2ab}{a + b}",
      "Downstream Speed (d) = Boat Speed (b) + Stream Speed (s)",
      "Upstream Speed (u) = Boat Speed (b) - Stream Speed (s)",
      "b = \\frac{d + u}{2} \\quad | \\quad s = \\frac{d - u}{2}"
    ],
    "example": {
      "problem": "A 240 m train passes a pole in 24 seconds. How long to pass a 650 m platform?",
      "solution": "Speed = Distance / Time = 240 / 24 = 10 m/s.\nTo cross the platform: total distance = 240 + 650 = 890 m.\nTime = 890 / 10 = 89 seconds."
    },
    "method": [
      "Speed = Distance / Time. Convert km/h to m/s by multiplying by 5/18.",
      "Train crossing a pole: Time = Length of train / Speed.",
      "Train crossing a platform: Time = (Length of train + Platform length) / Speed.",
      "Two trains: Relative speed = Sum (opposite directions) or Difference (same direction).",
      "Boats: Downstream = boat+stream. Upstream = boat−stream. Stream = (Down−Up)/2."
    ],
    "problems": [
      {
        "q": "A train at 54 km/h crosses a pole in 12 s. Find length of train.",
        "sol": "54 km/h = 54 × 5/18 = 15 m/s.\nLength = Speed × Time = 15 × 12 = 180 m.",
        "difficulty": "Easy"
      },
      {
        "q": "A 150 m train crosses a 100 m platform in 25 s. Find speed.",
        "sol": "Total distance = 150 + 100 = 250 m.\nSpeed = 250/25 = 10 m/s = 10×18/5 = 36 km/h.",
        "difficulty": "Easy"
      },
      {
        "q": "Two trains 120 m and 80 m run in opposite directions at 40 and 32 km/h. Time to cross?",
        "sol": "Relative speed = 40+32 = 72 km/h = 20 m/s.\nTotal length = 120+80 = 200 m.\nTime = 200/20 = 10 s.",
        "difficulty": "Medium"
      },
      {
        "q": "Boat goes 30 km downstream in 2 h and 30 km upstream in 6 h. Find stream speed.",
        "sol": "Downstream speed = 30/2 = 15 km/h.\nUpstream speed = 30/6 = 5 km/h.\nStream = (15−5)/2 = 5 km/h.",
        "difficulty": "Medium"
      },
      {
        "q": "A man covers a distance at 4 km/h and returns at 6 km/h. Find average speed.",
        "sol": "Average speed = 2ab/(a+b)\n= 2×4×6/(4+6)\n= 48/10 = 4.8 km/h.",
        "difficulty": "Medium"
      },
      {
        "q": "Two trains run in same direction at 60 and 40 km/h. Faster passes slower (150 m long) in 30 s. Find length of faster train.",
        "sol": "Relative speed = 60−40 = 20 km/h = 50/9 m/s.\nTotal distance covered = 30 × 50/9 ≈ 166.7 m.\nFaster train length = 166.7 − 150 ≈ 16.7 m.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Numerical",
    "title": "Time & Work — Pipes, Efficiency & Shared Work",
    "desc": "If a person completes a job in N days, their rate of work is 1/N per day. Add rates when people work together: if A does 1/6 per day and B does 1/12 per day, together they do 1/6 + 1/12 = 3/12 = 1/4 per day, so they finish in 4 days. Pipes work the same way — inlet pipes add to the rate, outlet pipes subtract.",
    "formula": [
      "\\text{1-day work rate} = \\frac{1}{D}",
      "If Work is constant: Days taken is inversely proportional to Efficiency (E1 × D1 = E2 × D2)",
      "Pairwise rates combined: 2 × (A + B + C) = (A + B) + (B + C) + (C + A)",
      "Net Pipe Filling Rate = Sum of Fill Rates - Sum of Drain Rates",
      "\\frac{M_1 \\times D_1 \\times H_1}{W_1} = \\frac{M_2 \\times D_2 \\times H_2}{W_2}"
    ],
    "example": {
      "problem": "A+B finish work in 12 days, B+C in 15 days, C+A in 20 days. How long for all three together?",
      "solution": "2(A+B+C) = (A+B)+(B+C)+(C+A)\n= 1/12 + 1/15 + 1/20\n= 5/60 + 4/60 + 3/60\n= 12/60 = 1/5\nSo A+B+C = 1/10\nAll three together = 10 days."
    },
    "method": [
      "If a person finishes in d days, 1-day work = 1/d. Add rates to work together.",
      "LCM method: set total work = LCM of days to avoid fractions.",
      "Pairwise trick: given (A+B), (B+C), (C+A) days → 2(A+B+C) = sum of three rates.",
      "Pipes: Fill rate − Drain rate = Net rate. Time = 1 / Net rate."
    ],
    "problems": [
      {
        "q": "A does a job in 10 days, B in 15 days. Together?",
        "sol": "Rate = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6.\nTogether = 6 days.",
        "difficulty": "Easy"
      },
      {
        "q": "A is twice as efficient as B. Together they finish in 12 days. B alone?",
        "sol": "A's rate = 2B's rate. Let B = 1/b.\nThen A = 2/b.\n3/b = 1/12 → b = 36.\nB alone = 36 days.",
        "difficulty": "Medium"
      },
      {
        "q": "A pipe fills a tank in 6 h; another drains it in 8 h. Both open — time to fill?",
        "sol": "Net rate = 1/6 − 1/8 = 4/24 − 3/24 = 1/24.\nTime = 24 hours.",
        "difficulty": "Easy"
      },
      {
        "q": "3 pipes fill in 6, 8, 12 h. A 4th drains in 4 h. All open — time to fill?",
        "sol": "Fill rate = 1/6+1/8+1/12 = 4/24+3/24+2/24 = 9/24 = 3/8.\nDrain rate = 1/4 = 2/8.\nNet = 3/8−2/8 = 1/8.\nTime = 8 hours.",
        "difficulty": "Hard"
      },
      {
        "q": "12 men finish a work in 8 days. How many days for 16 men?",
        "sol": "M₁×D₁ = M₂×D₂\n12×8 = 16×d\nd = 96/16 = 6 days.",
        "difficulty": "Easy"
      },
      {
        "q": "20 men do work in 15 days. After 6 days 5 men leave. Days to finish remaining?",
        "sol": "Total work = 20×15 = 300 units.\nDone in 6 days = 20×6 = 120 units.\nRemaining = 180 units. Workers = 15.\nDays = 180/15 = 12 days.",
        "difficulty": "Medium"
      }
    ]
  },
  {
    "cat": "Numerical",
    "title": "Averages, Mixtures & Alligation — Replacement & Blending",
    "desc": "Average = Total Sum ÷ Number of items. When one item in a group changes, the change in average × number of items = the change in that item's value. Alligation is a cross-method for mixing two things at different concentrations or prices — draw a cross, put the target in the middle, subtract diagonally to get the ratio of the two ingredients.",
    "formula": [
      "\\begin{aligned} \\text{Average} &= \\\\ &\\frac{\\text{Total Sum}}{\\text{Count of Elements}} \\end{aligned}",
      "\\begin{aligned} \\text{Corrected Average} &= \\\\ &\\frac{\\text{Original Sum} - \\text{Incorrect} + \\text{Correct}}{\\text{Count}} \\end{aligned}",
      "\\begin{aligned} \\text{Ratio} &= \\\\ &\\frac{\\text{Dearer} - \\text{Mean}}{\\text{Mean} - \\text{Cheaper}} \\end{aligned}",
      "\\begin{aligned} \\text{Remaining} &= \\text{Initial} \\times \\\\ &\\left(1 - \\frac{\\text{Removed}}{\\text{Initial}}\\right)^n \\end{aligned}"
    ],
    "example": {
      "problem": "Tea at ₹20/kg and ₹25/kg is mixed to sell at ₹22/kg. Find the mixing ratio.",
      "solution": "Use alligation (cross method):\n\n  Cheaper (₹20)     Dearer (₹25)\n              ↘   ↙\n           Mean (₹22)\n         ↙           ↘\n  25 − 22 = 3    22 − 20 = 2\n\nRatio = 3 : 2\nMix 3 parts of ₹20 tea with 2 parts of ₹25 tea."
    },
    "method": [
      "Average = Sum / Count. If avg of n numbers is A, total sum = n × A.",
      "Wrong value corrected: new sum = old sum − wrong + correct value, re-divide.",
      "Alligation cross: Ratio = (Dearer − Mean) : (Mean − Cheaper).",
      "Milk-water replacement (t times, removing x from n litres): Remaining = n × (1 − x/n)ᵗ."
    ],
    "problems": [
      {
        "q": "Average of all primes between 30 and 50.",
        "sol": "Primes: 31, 37, 41, 43, 47.\nSum = 199, count = 5.\nAverage = 199/5 = 39.8.",
        "difficulty": "Easy"
      },
      {
        "q": "Average weight of 8 people increases by 2.5 kg when a new person replaces one of 65 kg. New person's weight?",
        "sol": "Total weight increase = 8 × 2.5 = 20 kg.\nNew person = 65 + 20 = 85 kg.",
        "difficulty": "Medium"
      },
      {
        "q": "Average age of 30 students is 12. With teacher it becomes 13. Teacher's age?",
        "sol": "Old total = 30×12 = 360.\nNew total = 31×13 = 403.\nTeacher's age = 403−360 = 43.",
        "difficulty": "Easy"
      },
      {
        "q": "In what ratio should water (₹0/L) be mixed with milk (₹12/L) to gain 25% selling at ₹12/L?",
        "sol": "Required CP = 12/1.25 = ₹9.6.\nAlligation: (12−9.6):(9.6−0) = 2.4:9.6 = 1:4.\nRatio water:milk = 1:4.",
        "difficulty": "Hard"
      },
      {
        "q": "40-litre jar of milk: 8 litres removed and replaced with water, repeated 3 times. Milk remaining?",
        "sol": "Milk = 40 × (1 − 8/40)³\n= 40 × (32/40)³\n= 40 × (0.8)³\n= 40 × 0.512 = 20.48 litres.",
        "difficulty": "Medium"
      },
      {
        "q": "Average of 11 results is 50. Avg of first 6 is 49, last 6 is 52. Find 6th result.",
        "sol": "6th result = sum of first 6 + sum of last 6 − sum of all 11\n= 6×49 + 6×52 − 11×50\n= 294 + 312 − 550 = 56.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Numerical",
    "title": "Permutation, Combination & Probability — Counting & Chance",
    "desc": "Permutation is for arrangements where order matters (how many ways to arrange 3 people in a line). Combination is for selections where order doesn't matter (how many ways to choose 3 people from 5). The key formula: nPr = n!/(n−r)!, nCr = n!/(r!(n−r)!). Probability = favourable outcomes ÷ total outcomes — always count the total space carefully first.",
    "formula": [
      "\\text{nPr} = \\frac{n!}{(n - r)!}",
      "\\text{nCr} = \\frac{n!}{r! \\times (n - r)!}",
      "\\text{Arrangement (n items, p repeats)} = \\frac{n!}{p!}",
      "Circular arrangement of n distinct objects = (n - 1)!",
      "P(E) = \\frac{\\text{Favorable Outcomes}}{\\text{Total Outcomes}}"
    ],
    "example": {
      "problem": "Two dice are rolled. What is the probability that the sum is 7?",
      "solution": "Total outcomes = 6 × 6 = 36.\nFavourable (sum = 7):\n  (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6 outcomes.\nP(sum = 7) = 6/36 = 1/6."
    },
    "method": [
      "Permutation (order matters): nPr = n! / (n−r)!.",
      "Combination (selection): nCr = n! / (r! × (n−r)!).",
      "Arrangements with repeated letters = n! / (p! × q! × …).",
      "Probability = Favourable outcomes / Total outcomes.",
      "Circular arrangements of n objects = (n−1)! ways."
    ],
    "problems": [
      {
        "q": "How many ways to arrange letters of 'LEADER'?",
        "sol": "6 letters, E repeated twice.\nArrangements = 6!/2! = 720/2 = 360.",
        "difficulty": "Easy"
      },
      {
        "q": "How many 3-digit numbers from digits 1–5 without repetition?",
        "sol": "First digit: 5 choices.\nSecond digit: 4 choices.\nThird digit: 3 choices.\nTotal = 5×4×3 = 60.",
        "difficulty": "Easy"
      },
      {
        "q": "From 7 men and 4 women, choose a committee of 3 men and 2 women.",
        "sol": "Selecting men: 7C3 = 35 ways.\nSelecting women: 4C2 = 6 ways.\nTotal = 35×6 = 210 ways.",
        "difficulty": "Medium"
      },
      {
        "q": "In how many ways can 5 people sit around a circular table?",
        "sol": "Circular arrangements = (n−1)! = (5−1)! = 4! = 24 ways.",
        "difficulty": "Easy"
      },
      {
        "q": "A bag has 3 red and 2 blue balls. P(drawing 2 red without replacement)?",
        "sol": "P(1st red) = 3/5.\nP(2nd red | 1st red) = 2/4.\nP(both red) = 3/5 × 2/4 = 6/20 = 3/10.",
        "difficulty": "Medium"
      },
      {
        "q": "A card is drawn from a deck. P(King or Heart)?",
        "sol": "P(King) = 4/52.\nP(Heart) = 13/52.\nP(King of Hearts) = 1/52.\nP(King or Heart) = (4+13−1)/52 = 16/52 = 4/13.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Numerical",
    "title": "Progressions — AP, GP & Special Series Sums",
    "desc": "An Arithmetic Progression adds the same number each time (2, 5, 8, 11...). A Geometric Progression multiplies by the same number each time (2, 6, 18, 54...). For AP: nth term = a + (n−1)d, sum = n/2 × (first + last). For GP: nth term = a×rⁿ⁻¹. NQT often asks you to find a missing term or the sum — identify whether the differences are constant (AP) or the ratios are constant (GP) first.",
    "formula": [
      "Arithmetic Progression nth term: a_n = a + (n - 1)d",
      "S_n = \\frac{n}{2} [ 2a + (n - 1)d ]",
      "Geometric Progression nth term: a_n = a × r^(n - 1)",
      "Geometric Progression Sum (r > 1): S_n = a × (r^n - 1) / (r - 1)",
      "Infinite Geometric Series Sum (|r| < 1): S_inf = a / (1 - r)",
      "Sum of first n natural numbers = n × (n + 1) / 2",
      "Sum of squares of first n natural numbers = [ n × (n + 1) × (2n + 1) ] / 6"
    ],
    "example": {
      "problem": "Find the sum of first 20 terms of AP: 1, 3, 5, 7, …",
      "solution": "a = 1 (first term), d = 2 (common difference), n = 20.\nSₙ = n/2 × (2a + (n−1)d)\nS₂₀ = 20/2 × (2×1 + 19×2)\n= 10 × (2 + 38)\n= 10 × 40\n= 400."
    },
    "method": [
      "AP nth term: aₙ = a + (n−1)d. Sum: Sₙ = n/2 × (first + last).",
      "GP nth term: aₙ = a × rⁿ⁻¹. Sum: Sₙ = a(rⁿ−1)/(r−1).",
      "Infinite GP (|r|<1): Sum = a/(1−r).",
      "Special sums: 1+2+…+n = n(n+1)/2. Sum of squares = n(n+1)(2n+1)/6."
    ],
    "problems": [
      {
        "q": "Find the 15th term of AP: 3, 8, 13, 18, …",
        "sol": "a=3, d=5.\naₙ = a + (n−1)d\na₁₅ = 3 + 14×5 = 3+70 = 73.",
        "difficulty": "Easy"
      },
      {
        "q": "An AP has 10 terms, first is 5 and last is 50. Find sum.",
        "sol": "S = n/2 × (first + last)\n= 10/2 × (5+50)\n= 5 × 55 = 275.",
        "difficulty": "Easy"
      },
      {
        "q": "Sum of all even numbers from 2 to 100.",
        "sol": "AP: 2, 4, …, 100. a=2, l=100, n=50.\nS = 50/2 × (2+100) = 25 × 102 = 2550.",
        "difficulty": "Medium"
      },
      {
        "q": "3rd term of GP is 4 and 6th term is 32. Find first term.",
        "sol": "a×r² = 4 and a×r⁵ = 32.\nr³ = 32/4 = 8 → r = 2.\na × 4 = 4 → a = 1.",
        "difficulty": "Medium"
      },
      {
        "q": "Sum of first 5 terms of GP 2, 6, 18, …",
        "sol": "a=2, r=3, n=5.\nS = a(rⁿ−1)/(r−1) = 2×(243−1)/2 = 242.",
        "difficulty": "Medium"
      },
      {
        "q": "Find sum of infinite GP: 8, 4, 2, 1, …",
        "sol": "a=8, r=4/8=0.5 (|r|<1).\nSum = a/(1−r) = 8/(1−0.5) = 8/0.5 = 16.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Reasoning",
    "title": "Number & Letter Series — Differences, Ratios & Patterns",
    "desc": "Every series question has a hidden rule connecting the terms. Check the differences between consecutive terms first — if they're constant it's AP, if the differences themselves form a pattern look one level deeper. For letter series, convert letters to positions (A=1, B=2...) and look for the same arithmetic patterns. Never guess — always verify the rule works for every term before committing.",
    "formula": [
      "Primary checking progression sequence: 1st Differences -> 2nd Differences -> Constant Ratio Multiplication",
      "Standard Series Models: n^2, n^3, (n^2 + n), (n^2 - 1), Fibonnaci additions",
      "A-Z letter conversions to numbers range from 1 to 26 (EJOTY shortcut: 5, 10, 15, 20, 25)"
    ],
    "example": {
      "problem": "Find the next term in the series: 2, 6, 12, 20, 30, ?",
      "solution": "Find differences between consecutive terms:\n6−2=4, 12−6=6, 20−12=8, 30−20=10.\nDifferences: 4, 6, 8, 10 → increasing by 2 each time.\nNext difference = 12.\nNext term = 30 + 12 = 42.\n(General pattern: n² + n)"
    },
    "method": [
      "Write out differences between consecutive terms — constant, increasing, or doubling?",
      "If differences don't work, try ratios (each term multiplied by a constant).",
      "Check for n², n³, or n²+n type patterns.",
      "For alternating series: separate odd and even indexed terms — two independent patterns.",
      "For letter series: convert to positions (A=1…Z=26) and apply number-series logic."
    ],
    "problems": [
      {
        "q": "Next term: 3, 6, 11, 18, 27, ?",
        "sol": "Differences: 3, 5, 7, 9 → next = 11.\nAnswer = 27 + 11 = 38.",
        "difficulty": "Easy"
      },
      {
        "q": "Next term: 5, 11, 23, 47, ?",
        "sol": "Each term = previous × 2 + 1.\n5→11, 11→23, 23→47, 47→95.\nAnswer = 95.",
        "difficulty": "Medium"
      },
      {
        "q": "Next term: 1, 4, 9, 16, 25, ?",
        "sol": "Perfect squares: 1², 2², 3², 4², 5².\nNext = 6² = 36.",
        "difficulty": "Easy"
      },
      {
        "q": "Odd one out: 8, 27, 64, 100, 125.",
        "sol": "8=2³, 27=3³, 64=4³, 125=5³ are perfect cubes.\n100 is NOT a perfect cube.\nOdd one out = 100.",
        "difficulty": "Easy"
      },
      {
        "q": "Next term in series: AZ, BY, CX, ?",
        "sol": "1st letter: A,B,C → D (ascending).\n2nd letter: Z,Y,X → W (descending).\nNext = DW.",
        "difficulty": "Easy"
      },
      {
        "q": "Next term: B, E, H, K, ?",
        "sol": "Positions: 2, 5, 8, 11 → +3 each time.\nNext = 14 = N.",
        "difficulty": "Medium"
      }
    ]
  },
  {
    "cat": "Reasoning",
    "title": "Coding-Decoding — Shifts, Position Sums & Reversals",
    "desc": "In coding-decoding, a word is transformed by a consistent rule and you have to find or apply that rule. Common patterns: shift each letter by a fixed number (A→D means +3), reverse the word, replace each letter with its position number and sum them, or mirror the alphabet (A↔Z, B↔Y). Always decode the example given in the question first to identify the exact rule before applying it to the target word.",
    "formula": [
      "Linear Letter Shift Code Position: New Index = (Original Index + Shift Value) mod 26",
      "Mirror Alphabet Reverse Position mapping rule: Opposite Position = 27 - Current Position"
    ],
    "example": {
      "problem": "If 'TEACHER' is coded as 'VGCEJGT', how is 'STUDENT' coded?",
      "solution": "Compare letter by letter:\nT→V: 20→22 (+2)\nE→G: 5→7 (+2)\nA→C: 1→3 (+2)\nRule: each letter is shifted +2 positions.\nSTUDENT: S→U, T→V, U→W, D→F, E→G, N→P, T→V\nCode = UVWFGPV."
    },
    "method": [
      "Compare code letter-by-letter with the original. Find the gap (difference in positions).",
      "Constant positive gap → forward Caesar shift. Constant negative → backward shift.",
      "Number codes: usually sum of letter positions (A=1, B=2 … Z=26).",
      "Reversal rule: code is the original word reversed (CAT → TAC).",
      "Mirror alphabet: A↔Z, B↔Y, C↔X (each letter maps to 27 minus its position)."
    ],
    "problems": [
      {
        "q": "If CAT = 24 and DOG = 26, what is RAT?",
        "sol": "Sum of positions: C=3,A=1,T=20 → 24.\nR=18, A=1, T=20.\nRAT = 18+1+20 = 39.",
        "difficulty": "Easy"
      },
      {
        "q": "If 'POND' is coded as 'QPQE', how is 'WORD' coded?",
        "sol": "P→Q(+1), O→P(+1), N→O(+1), D→E(+1).\nRule: each letter +1.\nWORD → XPSE.",
        "difficulty": "Easy"
      },
      {
        "q": "In a code A=Z, B=Y, C=X. How is 'CAT' coded?",
        "sol": "Mirror: position of mirror = 27−original.\nC(3) → Z−2 = X(24).\nA(1) → Z(26).\nT(20) → 27−20=7 = G.\nCode = XZG.",
        "difficulty": "Medium"
      },
      {
        "q": "If 'RAIL' is coded as 'LIAR', what is the coding rule?",
        "sol": "RAIL reversed = LIAR.\nRule = word reversal.",
        "difficulty": "Easy"
      },
      {
        "q": "If 'MOUSE'='12345' and 'TICK'='6789', how is 'MICE' coded?",
        "sol": "M=1, I=7, C=8, E=5.\nMICE = 1785.",
        "difficulty": "Medium"
      },
      {
        "q": "If 'CAB'=6, 'BAD'=7, find 'DAD'.",
        "sol": "Sum of positions: C(3)+A(1)+B(2)=6. B(2)+A(1)+D(4)=7.\nD(4)+A(1)+D(4) = 9.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Reasoning",
    "title": "Blood Relations — Family Tree & Pointer Statements",
    "desc": "Draw a family tree as you read — don't try to hold the relationships in your head. Use boxes for people and arrows/lines for relationships. The tricky part is \"pointer\" statements like \"pointing to a photograph, X says...\" — identify who X is first, then trace the relationship from X to the person in the photo. Gender words (son, daughter, mother, father) are your anchors.",
    "formula": [
      "Structural mapping shortcuts: Grandfather's only son/daughter = Father/Mother",
      "Parent's sibling = Uncle / Aunt | Sibling's child = Nephew / Niece",
      "Pointer statements execution rule: Read from right to left starting at the final personal pronoun ('my')"
    ],
    "example": {
      "problem": "Pointing to a photo: 'She is the daughter of my grandfather's only son.' How is she related to the man?",
      "solution": "Step 1: 'my grandfather's only son' = the man's own father.\nStep 2: 'daughter of the man's father' = the man's sister.\nAnswer: She is his sister."
    },
    "method": [
      "Draw a family tree as you read each clue. Label gender clearly.",
      "'Grandfather's only son' collapses directly to 'father'.",
      "Pointer statement: start from the last noun and work backwards step by step.",
      "Key: sibling of parent = uncle/aunt. Child of sibling = nephew/niece."
    ],
    "problems": [
      {
        "q": "A says to B: 'Your mother's husband's sister is my aunt.' How is A related to B?",
        "sol": "B's mother's husband = B's father.\nB's father's sister = B's aunt.\nThat aunt is also A's aunt.\nA and B are siblings.",
        "difficulty": "Medium"
      },
      {
        "q": "A woman says pointing to a man: 'His mother is the only daughter of my mother.' Relation?",
        "sol": "Only daughter of her mother = herself.\nSo the man's mother IS the woman.\nShe is his mother.",
        "difficulty": "Medium"
      },
      {
        "q": "P is Q's brother. Q is R's sister. R is S's father. How is P related to S?",
        "sol": "P→brother of Q→sister of R→father of S.\nP is R's brother.\nR is S's father → P is S's uncle.",
        "difficulty": "Easy"
      },
      {
        "q": "A is B's father. C is A's mother. D is C's father. How is D related to B?",
        "sol": "D is C's father.\nC is A's mother → D is A's grandfather.\nA is B's father → D is B's great-grandfather.",
        "difficulty": "Hard"
      },
      {
        "q": "Introducing a girl, a boy says 'She is the daughter of the only son of my grandmother.' How is she related?",
        "sol": "Only son of his grandmother = his father.\nFather's daughter = his sister.",
        "difficulty": "Medium"
      }
    ]
  },
  {
    "cat": "Reasoning",
    "title": "Directions & Distances — Turns, Compass & Shortest Path",
    "desc": "Always start by drawing the path on paper — a small sketch takes 10 seconds and eliminates most errors. Fix North as up. \"Turn right\" from North means you now face East. Track your net displacement in the North-South direction and East-West direction separately. The final distance from the starting point is calculated using Pythagoras on those two net values.",
    "formula": [
      "Turning Rules: Right Turn = 90 degrees Clockwise | Left Turn = 90 degrees Counter-Clockwise",
      "Shortest straight path displacement = Square Root of (Net Horizontal^2 + Net Vertical^2)",
      "Shadow property: Morning shadow falls completely West | Evening shadow falls completely East"
    ],
    "example": {
      "problem": "A man walks 5 km North, turns right and walks 3 km, then turns right and walks 5 km. How far from start?",
      "solution": "Plot step by step:\n↑ 5 km North.\nTurn right → facing East: → 3 km East.\nTurn right → facing South: ↓ 5 km South.\n\nNet North-South: 5 − 5 = 0 km.\nNet East-West: 3 km East.\nShortest distance = 3 km (straight line from start)."
    },
    "method": [
      "Draw axes: North=up, South=down, East=right, West=left.",
      "Right turn = 90° clockwise. Left turn = 90° anticlockwise.",
      "Track the person's facing direction after EVERY turn before moving.",
      "Shortest distance = Pythagoras on net horizontal and vertical displacements."
    ],
    "problems": [
      {
        "q": "A man walks 3 km East, then 4 km North. How far from start?",
        "sol": "Net East = 3, Net North = 4.\nDistance = √(3²+4²) = √(9+16) = √25 = 5 km.",
        "difficulty": "Easy"
      },
      {
        "q": "Facing North, turn right twice. Which direction now?",
        "sol": "North → East (1st right) → South (2nd right).\nFacing South.",
        "difficulty": "Easy"
      },
      {
        "q": "A walks 10 m South, 10 m West, 10 m North. Final position relative to start?",
        "sol": "Net NS: 10S − 10N = 0. Net EW: 10m West.\nHe is 10 m West of start.",
        "difficulty": "Easy"
      },
      {
        "q": "A starts facing East, turns left 3 times. Which direction is he facing?",
        "sol": "East → North (1st left) → West (2nd left) → South (3rd left).\nFacing South.",
        "difficulty": "Medium"
      },
      {
        "q": "A walks 4 km N then 3 km E. B walks 3 km W then 4 km S from same start. Distance between them?",
        "sol": "A is at (+3, +4). B is at (−3, −4).\nDistance = √((3−(−3))²+(4−(−4))²)\n= √(6²+8²) = √(36+64) = √100 = 10 km.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Reasoning",
    "title": "Seating Arrangements — Linear Rows & Circular Tables",
    "desc": "For linear arrangements, fix a reference point and place people relative to each other using the clues. For circular arrangements, fix one person's seat to eliminate rotational duplicates — then arrange the rest relative to them. List all conditions first, find the most restrictive one (someone who must sit next to or opposite someone else), place them first, and fill in the rest.",
    "formula": [
      "Linear Position conversion: Position from Right = Total Items - Position from Left + 1",
      "Items sandwiched between index positions X and Y = |Y - X| - 1",
      "Circular table orientation (facing center): Left movement = Clockwise | Right movement = Counter-Clockwise"
    ],
    "example": {
      "problem": "In a row of 7 facing north, P is 3rd from left and Q is 2nd from right. How many people are between them?",
      "solution": "P's position = 3 (from left).\nQ's position from left = 7 − 2 + 1 = 6.\nPeople between P and Q = |6 − 3| − 1 = 3 − 1 = 2."
    },
    "method": [
      "Linear: draw numbered seats. 'Xth from left' and 'Yth from right' in n seats: position from left = n−Y+1.",
      "Place definite clues first (ends, fixed positions), then use relative clues.",
      "Circular tables facing centre: YOUR left = clockwise, YOUR right = anticlockwise.",
      "(n−1)! distinct circular arrangements for n people."
    ],
    "problems": [
      {
        "q": "In a row of 25, a person is 7th from left. Position from right?",
        "sol": "Position from right = 25 − 7 + 1 = 19th.",
        "difficulty": "Easy"
      },
      {
        "q": "Five boys P,Q,R,S,T sit in a row. P is left of Q but right of S. T is right of Q. R is right of T. Who is in the middle?",
        "sol": "From clues, order is: S, P, Q, T, R.\nMiddle position (3rd) = Q.",
        "difficulty": "Medium"
      },
      {
        "q": "Six people sit around a circle facing centre. Distinct seating arrangements?",
        "sol": "Circular arrangements = (n−1)! = (6−1)! = 5! = 120.",
        "difficulty": "Easy"
      },
      {
        "q": "8 persons around a circular table. P is exactly opposite Q. How many sit between them on one side?",
        "sol": "8 seats. Opposite means 4 seats apart.\nBetween them on one side = 4 − 1 = 3 persons.",
        "difficulty": "Medium"
      }
    ]
  },
  {
    "cat": "Reasoning",
    "title": "Syllogism — Venn Diagram Logic & Valid Conclusions",
    "desc": "Syllogism gives you two or more statements and asks which conclusions must be true. Draw a Venn diagram for every question — it takes 15 seconds and is almost always faster than pure logic. \"All A are B\" means circle A sits completely inside circle B. \"Some A are B\" means the circles overlap but neither contains the other. \"No A are B\" means the circles don't touch. A conclusion is valid only if it holds true in every possible valid diagram.",
    "formula": [
      "All A are B implies subset grouping layout: A is entirely contained inside B (A ⊆ B)",
      "Some A are B implies intersecting layout: Circle A overlapping Circle B",
      "No A is B implies completely disjoint layout: Isolated distinct circles",
      "Validity condition: A conclusion is true if and only if it holds across every possible Venn layout configuration"
    ],
    "example": {
      "problem": "Statements: All cats are animals. All animals breathe.\nConclusion: All cats breathe. Valid or not?",
      "solution": "Draw Venn diagrams:\nCats ⊆ Animals ⊆ Breathing things.\nSince all cats are inside animals,\nand all animals are inside breathing things,\nall cats must be inside breathing things.\nConclusion: VALID."
    },
    "method": [
      "'All A are B' = A circle is entirely inside B circle (A ⊆ B).",
      "'Some A are B' = circles overlap (at least one common element).",
      "'No A is B' = circles are completely separate.",
      "A conclusion is valid ONLY if it holds in every possible Venn diagram."
    ],
    "problems": [
      {
        "q": "All roses are flowers. Some flowers fade.\nConclusion I: Some roses fade. II: All flowers are roses.",
        "sol": "I: Does not necessarily follow (fading flowers may not be roses).\nII: Invalid — A⊆B doesn't mean B⊆A.\nAnswer: Neither follows.",
        "difficulty": "Medium"
      },
      {
        "q": "Some pens are books. All books are papers.\nConclusion: Some pens are papers.",
        "sol": "Pens that are books must also be papers (since all books are papers).\nConclusion: VALID.",
        "difficulty": "Easy"
      },
      {
        "q": "No dog is a cat. All cats are animals.\nConclusion: No dog is an animal.",
        "sol": "Dogs and cats are separate, but dogs can still independently be animals.\nConclusion: INVALID.",
        "difficulty": "Medium"
      },
      {
        "q": "All A are B. No B is C.\nConclusion: No A is C.",
        "sol": "A ⊆ B. B and C are completely separate.\nSo A and C are also completely separate.\nConclusion: VALID.",
        "difficulty": "Hard"
      },
      {
        "q": "Some mangoes are yellow. Some yellow things are birds.\nConclusion: Some mangoes are birds.",
        "sol": "The yellow mangoes and yellow birds may be different yellow objects.\nConclusion: INVALID.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Reasoning",
    "title": "Non-Verbal / Visual Reasoning — Dice & Cubes, Cube Folding & Paper Cutting, Pattern/Figure Series, Embedded Figures, Visual Analogies",
    "desc": "Non-verbal reasoning tests your ability to understand and interpret visual information. Common question types include finding the next figure in a pattern series, determining which unfolded paper matches a folded cube, identifying embedded figures hidden inside a complex drawing, solving dice orientation puzzles by identifying opposite faces, and recognizing the underlying relationship in visual analogies.",
    "formula": [
      "Standard Dice: Opposite faces always sum to 7 (1 opposite 6, 2 opposite 5, 3 opposite 4).",
      "Unfolded Cube Rule: On a flat net of a cube, faces in a straight line that are separated by exactly one face are ALWAYS opposite each other.",
      "Pattern Series: Track the rotation (clockwise or counter-clockwise), movement of specific elements, and addition/deletion of lines.",
      "Paper Cutting: Imagine unfolding the paper in reverse order. Symmetries will appear across the fold lines."
    ],
    "method": [
      "For Dice/Cubes: Find a common face across multiple views of the same dice. Write adjacent faces in clockwise order to deduce opposites.",
      "For Figure Series: Focus on one element at a time (e.g., an arrow or dot). Trace its movement across the series before looking at other elements.",
      "For Embedded Figures: Mentally rotate the target shape if allowed, and systematically scan quadrants of the complex figure.",
      "For Paper Folding: Use the axis of the last fold as a mirror line to reflect the cuts."
    ],
    "example": {
      "problem": "Two positions of a dice are shown. In the first position, faces 1, 2, and 3 are visible. In the second position, faces 1, 4, and 5 are visible. Which face is opposite to 1?",
      "solution": "Face 1 is common to both views. The faces adjacent to 1 in the first view are 2 and 3. The faces adjacent to 1 in the second view are 4 and 5. Since a dice has 6 faces and faces 2, 3, 4, and 5 are all adjacent to 1, the only remaining face (face 6) MUST be opposite to 1."
    },
    "problems": [
      {
        "q": "Three positions of a dice are given. View 1 shows faces: A, B, C. View 2 shows: C, D, E. View 3 shows: A, E, F. What face is opposite to C?",
        "sol": "From View 1 and View 2, the common face is C. Adjacent to C are A, B, D, and E. Since a dice has 6 faces (A,B,C,D,E,F), the only face not adjacent to C is F. Therefore, F is opposite to C.",
        "difficulty": "Easy"
      },
      {
        "q": "An unfolded cube (a net) consists of 4 squares in a straight vertical line labeled 1, 2, 3, 4 from top to bottom, with square 5 attached to the left of square 2, and square 6 attached to the right of square 3. Which face is opposite to square 2?",
        "sol": "Using the alternate face rule for straight lines on a cube net: faces separated by one square are opposite. In the vertical line 1-2-3-4, face 1 is opposite 3, and face 2 is opposite 4. Therefore, 4 is opposite to 2.",
        "difficulty": "Medium"
      },
      {
        "q": "In a figure series, the first frame has a single arrow pointing UP. The second frame has the arrow pointing RIGHT and a dot appears. The third frame has the arrow pointing DOWN and a second dot appears. What should the fourth frame look like?",
        "sol": "The arrow rotates 90 degrees clockwise in each frame (UP -> RIGHT -> DOWN). The next rotation is LEFT. The number of dots increases by one in each frame (0 -> 1 -> 2). Therefore, the fourth frame will have the arrow pointing LEFT and contain 3 dots.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Verbal",
    "title": "Error Spotting & Sentence Correction — Grammar Rules",
    "desc": "The most common errors in NQT are: subject-verb agreement (singular subject needs singular verb), wrong preposition (good *at*, not good *in*), tense consistency, and misuse of articles (a vs an vs the). Read each underlined part independently and ask \"does this follow standard grammar?\" The error is almost always in the verb or preposition, rarely in the noun.",
    "formula": [
      "Singular indefinite pronouns (Each, One, Either, Neither, Everyone) must bind with Singular Verbs",
      "'One of the + [Plural Noun]' structural sequence requires a Singular Verb",
      "Prepositions mandate Objective Pronouns (e.g., Use 'between you and me' instead of 'you and I')",
      "Subjunctive / Hypothetical expressions require conditional plural past tenses (e.g., 'If I were...')"
    ],
    "example": {
      "problem": "Spot the error: 'Each of the students / have submitted / their assignment / on time.'",
      "solution": "The subject is 'Each' — always singular.\nSingular subject → singular verb.\n'have submitted' → 'has submitted'.\nCorrected: 'Each of the students has submitted their assignment on time.'"
    },
    "method": [
      "Find the real subject (ignore 'of the…' phrases). Singular subject → singular verb.",
      "'One of the + plural noun' → verb is SINGULAR ('one' is the subject).",
      "Double comparative is wrong: 'more taller' → 'taller'.",
      "After prepositions (between, for, with), use objective pronouns: me/him/her/us/them.",
      "Hypothetical conditions → subjunctive: 'If I were you' (NOT 'was')."
    ],
    "problems": [
      {
        "q": "Spot error: 'He is / more taller / than his brother.'",
        "sol": "'more taller' → 'taller'.\nDouble comparative is incorrect.",
        "difficulty": "Easy"
      },
      {
        "q": "Spot error: 'Between / you and I / everything / is fine.'",
        "sol": "'I' → 'me'.\nAfter a preposition ('between'), use objective pronoun.",
        "difficulty": "Easy"
      },
      {
        "q": "Spot error: 'She is / one of those girls / who always completes / their homework.'",
        "sol": "'completes' → 'complete'.\n'who' refers to plural 'girls' → plural verb.",
        "difficulty": "Medium"
      },
      {
        "q": "Choose correct: 'If I ___ you, I would apologise.' (am/was/were/be)",
        "sol": "'were' — contrary-to-fact condition requires the subjunctive mood.",
        "difficulty": "Medium"
      },
      {
        "q": "Choose: 'He ___ in this city for 10 years.' (lives/lived/has lived/is living)",
        "sol": "'has lived' — action started in the past and still continues → present perfect.",
        "difficulty": "Easy"
      },
      {
        "q": "Choose: 'Neither the manager nor the employees ___ present.' (was/were)",
        "sol": "'were' — with 'neither…nor', verb agrees with the nearer subject ('employees', plural).",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Verbal",
    "title": "Vocabulary — Synonyms, Antonyms & Root-Word Shortcuts",
    "desc": "For synonyms pick the word closest in meaning; for antonyms pick the opposite. If you don't know the word, use root words — \"bene\" means good (beneficial, benevolent), \"mal\" means bad (malicious, malfunction), \"loqui\" means to speak (loquacious = talkative). Eliminate options that are clearly wrong first, then choose between what's left. Tone matters: if the original word is negative, the synonym must also be negative.",
    "formula": [
      "Prefix / Root translations: bene- (good), mal- (bad), omni- (all), uni- (one), loqu- (speech)"
    ],
    "example": {
      "problem": "Choose the antonym of BENEVOLENT:\n(a) Kind  (b) Generous  (c) Malevolent  (d) Gentle",
      "solution": "Root analysis:\nbene- = 'good/well'. Benevolent = well-meaning, kind.\nAntonym needs to mean 'ill-wishing' or 'cruel'.\nmal- = 'bad'. Malevolent = wishing harm on others.\nAnswer: (c) Malevolent."
    },
    "method": [
      "Root shortcuts: bene-=good, mal-=bad, omni-=all, uni-=one, brev-=short, aqua-=water.",
      "Prefix negation: in-/un-/dis-/mis- often create antonyms.",
      "Synonyms may differ in intensity: brave vs reckless, happy vs ecstatic.",
      "Context-clue strategy: predict the answer before reading options."
    ],
    "problems": [
      {
        "q": "Synonym of AMELIORATE?",
        "sol": "Improve / enhance / better.\n(Latin: ad+melior = to make better)",
        "difficulty": "Medium"
      },
      {
        "q": "Antonym of LOQUACIOUS?",
        "sol": "Taciturn / reticent.\n(Loquacious = excessively talkative)",
        "difficulty": "Medium"
      },
      {
        "q": "Synonym of EPHEMERAL?",
        "sol": "Transient / fleeting / short-lived.",
        "difficulty": "Easy"
      },
      {
        "q": "Choose synonym of CANDID:\n(a) Secretive (b) Frank (c) Cunning (d) Hesitant",
        "sol": "(b) Frank — candid means truthful and straightforward.",
        "difficulty": "Easy"
      },
      {
        "q": "Choose antonym of ABUNDANT:\n(a) Plentiful (b) Scarce (c) Ample (d) Sufficient",
        "sol": "(b) Scarce — abundant means plentiful; scarce means in short supply.",
        "difficulty": "Easy"
      },
      {
        "q": "Antonym of OBDURATE?",
        "sol": "Flexible / compliant.\n(Obdurate = stubbornly refusing to change)",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Advanced",
    "title": "Algebra — Linear Systems, Quadratics & Word Equations",
    "desc": "Linear equations have one solution; simultaneous equations need two equations to solve for two unknowns — add or subtract the equations to eliminate one variable. For quadratics (ax²+bx+c=0), try factoring first: find two numbers that multiply to ac and add to b. Word problems become algebra by assigning a variable to the unknown and translating each sentence into an equation literally.",
    "formula": [
      "\\text{Quadratic solution (} ax^2 + bx + c = 0 \\text{): } x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      "\\text{Sum of quadratic roots} = \\frac{-b}{a} \\quad | \\quad \\text{Product of quadratic roots} = \\frac{c}{a}",
      "\\text{Two-digit integer expansion rule: Value of number with tens digit 't' and units digit 'u'} = 10t + u"
    ],
    "example": {
      "problem": "The sum of two numbers is 20 and their difference is 4. Find both numbers.",
      "solution": "Let the numbers be x and y.\nx + y = 20  …(1)\nx − y = 4   …(2)\nAdd (1)+(2): 2x = 24 → x = 12.\nSubstitute in (1): 12 + y = 20 → y = 8.\nNumbers are 12 and 8."
    },
    "method": [
      "One equation per unknown. Name unknowns before writing equations.",
      "Linear system: substitution (express one variable) or elimination (add/subtract equations).",
      "Quadratic ax²+bx+c=0: factorise or use x = (−b ± √(b²−4ac)) / 2a.",
      "Sum of roots = −b/a. Product of roots = c/a."
    ],
    "problems": [
      {
        "q": "Solve: 2x + 3y = 12 and x − y = 1.",
        "sol": "From (2): x = y+1.\nSubstitute: 2(y+1)+3y = 12\n5y = 10 → y = 2, x = 3.",
        "difficulty": "Easy"
      },
      {
        "q": "Find roots of x² − 5x + 6 = 0.",
        "sol": "Factorise: (x−2)(x−3) = 0.\nRoots: x = 2 or x = 3.",
        "difficulty": "Easy"
      },
      {
        "q": "Sum of roots = 7 and product = 12. Write the quadratic equation.",
        "sol": "x² − (sum)x + (product) = 0\nx² − 7x + 12 = 0.",
        "difficulty": "Easy"
      },
      {
        "q": "Roots of x²+px+q=0 are 3 and −4. Find p and q.",
        "sol": "Sum = 3+(−4) = −1 = −p → p = 1.\nProduct = 3×(−4) = −12 = q.",
        "difficulty": "Medium"
      },
      {
        "q": "A two-digit number is 4× the sum of its digits. Adding 27 reverses its digits. Find it.",
        "sol": "Let tens=a, units=b.\n10a+b = 4(a+b) → 6a = 3b → b = 2a.\n10a+b+27 = 10b+a → b−a = 3.\nb=2a and b=a+3 → a=3, b=6.\nNumber = 36.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Advanced",
    "title": "Geometry & Mensuration — 2D Areas, 3D Volumes & Theorems",
    "desc": "Mensuration is about measuring shapes. For 2D: area of triangle = ½×base×height, circle = πr². For 3D: volume of cylinder = πr²h, cone = ⅓πr²h, sphere = 4/3πr³. The Pythagorean theorem (a²+b²=c²) applies to any right triangle. The most common NQT trick is giving you a combined shape — break it into standard shapes, calculate each part separately, then add or subtract.",
    "formula": [
      "\\text{Circle} = \\pi r^2, \\text{Triangle} = \\frac{1}{2}bh, \\text{Square} = \\frac{d^2}{2}",
      "\\text{Cyl} = \\pi r^2h, \\text{Cone} = \\frac{1}{3}\\pi r^2h, \\text{Sphere} = \\frac{4}{3}\\pi r^3",
      "Pythagorean Theorem: Hypotenuse^2 = Base^2 + Perpendicular^2"
    ],
    "example": {
      "problem": "A wire of length 44 cm is bent into a circle. Find the area enclosed (π = 22/7).",
      "solution": "Circumference = 2πr = 44.\nr = 44 / (2 × 22/7) = 44 × 7 / 44 = 7 cm.\nArea = πr² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm²."
    },
    "method": [
      "2D: Triangle=½bh. Circle=πr². Trapezium=½(a+b)h. Square diagonal: Area = d²/2.",
      "3D: Cuboid=l×b×h. Cylinder=πr²h. Sphere=(4/3)πr³. Cone=(1/3)πr²h.",
      "Right triangle: a²+b²=c² (Pythagoras). Angles in triangle sum to 180°."
    ],
    "problems": [
      {
        "q": "Area of a circle with radius 7 (π=22/7)?",
        "sol": "Area = πr² = (22/7) × 49 = 154 sq units.",
        "difficulty": "Easy"
      },
      {
        "q": "Right triangle with legs 6 and 8. Find hypotenuse and area.",
        "sol": "Hypotenuse = √(6²+8²) = √100 = 10.\nArea = ½ × 6 × 8 = 24 sq units.",
        "difficulty": "Easy"
      },
      {
        "q": "Volume of cylinder r=7, h=10 (π=22/7)?",
        "sol": "V = πr²h = (22/7) × 49 × 10 = 1540 cubic units.",
        "difficulty": "Easy"
      },
      {
        "q": "The diagonal of a square is 10 cm. Find its area.",
        "sol": "Area = d²/2 = 10²/2 = 100/2 = 50 cm².",
        "difficulty": "Medium"
      },
      {
        "q": "Volume of sphere with radius 3 (π=22/7)?",
        "sol": "V = (4/3)πr³ = (4/3) × (22/7) × 27\n= (4×22×27)/(3×7) = 2376/21 ≈ 113.1 cubic units.",
        "difficulty": "Medium"
      }
    ]
  },
  {
    "cat": "Advanced",
    "title": "Data Sufficiency & Logical Puzzles — Floor, Box & Constraint Problems",
    "desc": "Data sufficiency asks \"is the information given enough to answer the question?\" — you don't need to find the answer, just decide if you could. For floor/box puzzles, make a grid with people as rows and attributes as columns, then fill in what's certain from each clue. Work from the most restrictive clues first. Never assume anything not stated — only use what the question explicitly tells you.",
    "formula": [
      "Data Sufficiency standard checking sequence: Check (1) alone -> Check (2) alone -> Check Combined -> Conclude",
      "Sufficiency criteria: A statement is sufficient if and only if it produces exactly one unique outcome numerical answer"
    ],
    "example": {
      "problem": "Is n divisible by 6?\n(1) n is divisible by 2.\n(2) n is divisible by 3.",
      "solution": "Test Statement 1 alone: n=4 is divisible by 2 but not 6. NOT sufficient.\nTest Statement 2 alone: n=9 is divisible by 3 but not 6. NOT sufficient.\nBoth together: n divisible by both 2 and 3 → divisible by LCM(2,3) = 6.\nBoth together are SUFFICIENT.\nAnswer: C."
    },
    "method": [
      "Data Sufficiency options: A=Stmt1 alone. B=Stmt2 alone. C=Both. D=Either. E=Neither.",
      "Check: can you get a UNIQUE answer from each statement independently?",
      "Floor/box puzzles: draw a grid (floors top-to-bottom). Place definite clues first.",
      "Eliminate positions using constraints one by one until only one arrangement works."
    ],
    "problems": [
      {
        "q": "What is x?\n(1) x+2=5\n(2) x is a positive integer.",
        "sol": "Stmt 1: x=3 uniquely. Sufficient alone.\nStmt 2: x could be 1,2,3,… Not sufficient.\nAnswer: A.",
        "difficulty": "Easy"
      },
      {
        "q": "What is x+y?\n(1) x−y=4\n(2) xy=21",
        "sol": "(x+y)² = (x−y)² + 4xy = 16+84 = 100\nx+y = 10. Both statements needed.\nAnswer: C.",
        "difficulty": "Hard"
      },
      {
        "q": "Five people on floors 1–5 (5=top). B is on top. A is above C. D is just below B. Can E be on floor 1?",
        "sol": "B=5, D=4. A above C.\nTry: C=2, A=3, E=1 → all clues hold.\nYes, E can be on floor 1.",
        "difficulty": "Medium"
      },
      {
        "q": "Six boxes stacked: A just above C. B at top. F just above D. D just below E. Order from top?",
        "sol": "B=1 (top).\nD just below E and F just above D: … F, D, E …\nA just above C: … A, C …\nTry: B, A, C, F, D, E → verify all clues.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "title": "Clocks & Calendars — Angles, Overlap & Day Calculations",
    "cat": "Reasoning",
    "desc": "The minute and hour hands overlap every 65 and 5/11 minutes — they do NOT overlap every hour on the hour. To find overlaps, set up the equation: minute hand position = hour hand position, using the 6° and 0.5° per minute rates. For calendar problems, remember that a century year (1900, 2100) is NOT a leap year unless divisible by 400 — so 2000 was a leap year but 1900 was not.",
    "formula": [
      "Angle between hands = |30H - 5.5M|",
      "\\text{Hands overlap every } 65 \\frac{5}{11} \\text{ minutes}",
      "Leap year has 366 days (2 odd days), Ordinary year has 365 days (1 odd day)",
      "Odd days in 100 years = 5, 200 years = 3, 300 years = 1, 400 years = 0"
    ],
    "method": [
      "For clock angles, use the formula |30H - 5.5M| where H is hours and M is minutes.",
      "If the angle is greater than 180°, subtract from 360° to get the reflex angle if asked.",
      "For overlap, both hands coincide when angle is 0. Calculate using formula.",
      "For calendars, find the total odd days from the reference date to the given date.",
      "Divide total days by 7; the remainder is the number of odd days.",
      "Add odd days to the reference day of the week to get the target day."
    ],
    "example": {
      "problem": "Find the angle between the hour hand and the minute hand of a clock when the time is 3:40.",
      "solution": "Given Time: H = 3, M = 40\nAngle = |30(3) - 5.5(40)|\nAngle = |90 - 220|\nAngle = |-130|\nAngle = 130°"
    },
    "problems": [
      {
        "q": "What is the angle between the two hands of a clock at 8:20?",
        "sol": "H = 8, M = 20\nAngle = |30(8) - 5.5(20)|\nAngle = |240 - 110|\nAngle = 130°",
        "difficulty": "Easy"
      },
      {
        "q": "At what time between 4 and 5 o'clock will the hands of a clock coincide?",
        "sol": "Let they coincide at M minutes past 4.\nAngle = 0 = |30(4) - 5.5(M)|\n120 = 5.5M\nM = 120 / 5.5 = 240 / 11 = 21 9/11 minutes\nTime is 4:21 9/11",
        "difficulty": "Medium"
      },
      {
        "q": "What was the day of the week on 15th August 1947?",
        "sol": "1946 years = 1600 (0) + 300 (1) + 46 (11 leap + 35 ordinary)\nOdd days = 1 + 22 + 35 = 58 = 2 odd days.\n1947 Jan to Aug 15 = 31+28+31+30+31+30+31+15 = 227 days\n227 mod 7 = 3 odd days.\nTotal odd days = 2 + 3 = 5.\n5 = Friday.",
        "difficulty": "Hard"
      },
      {
        "q": "Today is Monday. After 61 days, it will be:",
        "sol": "61 divided by 7 gives a remainder of 5.\nMonday + 5 days = Saturday.\nHence, after 61 days, it will be Saturday.",
        "difficulty": "Easy"
      },
      {
        "q": "How many times do the hands of a clock coincide in a day?",
        "sol": "The hands coincide 11 times in every 12 hours.\nTherefore, in 24 hours, they coincide 22 times.",
        "difficulty": "Easy"
      }
    ]
  },
  {
    "title": "Simple & Compound Interest — SI, CI & Instalment Problems",
    "cat": "Numerical",
    "desc": "For instalments, the key is that each instalment pays off both the current interest and part of the principal. Work backwards from the last instalment — it has the least interest accumulated. The formula for equal instalments on CI is structured like a geometric series. For SI instalments, the interest on each remaining amount is simple and additive — list each payment's interest separately and sum them.",
    "formula": [
      "\\text{SI} = \\frac{P \\times R \\times T}{100}",
      "A = P \\left(1 + \\frac{R}{100}\\right)^T",
      "Compound Interest (CI) = A - P",
      "\\text{CI} - \\text{SI (2 Yrs)} = P \\left(\\frac{R}{100}\\right)^2",
      "\\text{Half-yearly: Rate} = \\frac{R}{2}, \\text{Time} = 2T"
    ],
    "method": [
      "Identify the given values: Principal (P), Rate (R), and Time (T).",
      "Determine if the interest is Simple or Compound.",
      "For Simple Interest, apply the direct formula SI = PRT/100.",
      "For Compound Interest, find the Amount first using A = P(1 + R/100)^T, then subtract P.",
      "For half-yearly compounding, halve the rate and double the time periods.",
      "For difference problems (2 years), directly use the formula Difference = P(R/100)^2."
    ],
    "example": {
      "problem": "Find the compound interest on ₹5000 at 10% per annum for 2 years.",
      "solution": "Principal (P) = 5000, Rate (R) = 10%, Time (T) = 2 years\nAmount (A) = 5000 × (1 + 10/100)^2\nA = 5000 × (1.1)^2 = 5000 × 1.21 = 6050\nCI = Amount - Principal\nCI = 6050 - 5000 = ₹1050"
    },
    "problems": [
      {
        "q": "Find the simple interest on ₹8000 at 5% per annum for 3 years.",
        "sol": "P = 8000, R = 5, T = 3\nSI = (8000 × 5 × 3) / 100\nSI = ₹1200",
        "difficulty": "Easy"
      },
      {
        "q": "The difference between CI and SI on a sum for 2 years at 8% per annum is ₹32. Find the sum.",
        "sol": "Difference for 2 years = P × (R / 100)^2\n32 = P × (8 / 100)^2\n32 = P × (64 / 10000)\nP = (32 × 10000) / 64 = ₹5000",
        "difficulty": "Medium"
      },
      {
        "q": "A sum of money doubles itself in 8 years at simple interest. What is the rate of interest?",
        "sol": "Amount = 2P, so SI = P.\nSI = (P × R × T) / 100\nP = (P × R × 8) / 100\nR = 100 / 8 = 12.5%",
        "difficulty": "Easy"
      },
      {
        "q": "Find the compound interest on ₹10000 at 20% per annum for 1 year, compounded half-yearly.",
        "sol": "P = 10000, R = 20/2 = 10%, T = 1 × 2 = 2 periods\nA = 10000 × (1 + 10/100)^2\nA = 10000 × 1.21 = 12100\nCI = 12100 - 10000 = ₹2100",
        "difficulty": "Medium"
      },
      {
        "q": "An amount of ₹4000 becomes ₹4410 in 2 years at compound interest. Find the rate of interest.",
        "sol": "A = P(1 + R/100)^2\n4410 = 4000(1 + R/100)^2\n4410/4000 = 441/400 = (21/20)^2\n1 + R/100 = 21/20\nR/100 = 1/20\nR = 5%",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "title": "Data Interpretation — Tables, Bar Charts & Pie Charts",
    "cat": "Numerical",
    "desc": "Read the title and units of the chart before anything else — most errors come from misreading the scale or units. For percentage questions on pie charts, remember the whole circle = 100% = 360°. For bar charts, approximate values confidently rather than trying to read exact decimals. For tables, calculate only what the question asks — don't compute everything in the table hoping it helps.",
    "formula": [
      "\\text{Percentage Share} = \\frac{\\text{Value}}{\\text{Total}} \\times 100",
      "\\text{Percentage Change} = \\frac{\\text{Final} - \\text{Initial}}{\\text{Initial}} \\times 100",
      "\\text{Average} = \\frac{\\text{Sum of Observations}}{\\text{Number of Observations}}",
      "\\text{Ratio } A:B = \\frac{\\text{Value of A}}{\\text{Value of B}}"
    ],
    "method": [
      "Carefully read the headings, labels, and units of the table or chart.",
      "Identify exactly what data the question is asking for.",
      "Extract the relevant numbers from the given dataset.",
      "Apply the correct formula (percentage, average, ratio).",
      "Double-check calculations, as DI questions often have close options.",
      "Use approximations to save time if the options are widely spaced."
    ],
    "example": {
      "problem": "Table shows revenue in millions:\nCompany | 2022 | 2023\nA | 150 | 180\nB | 200 | 250\nC | 100 | 90\nFind the percentage growth of Company A from 2022 to 2023.",
      "solution": "Initial Revenue (2022) = 150\nFinal Revenue (2023) = 180\nGrowth = 180 - 150 = 30\nPercentage Growth = (30 / 150) × 100\n= (1/5) × 100 = 20%"
    },
    "problems": [
      {
        "q": "Using the same table, what is the ratio of revenue of Company B in 2022 to Company C in 2023?",
        "sol": "Revenue of Company B in 2022 = 200\nRevenue of Company C in 2023 = 90\nRatio = 200 / 90 = 20:9",
        "difficulty": "Easy"
      },
      {
        "q": "Using the same table, what is the average revenue of the 3 companies in 2023?",
        "sol": "Total revenue in 2023 = 180 + 250 + 90 = 520\nAverage = 520 / 3\n= 173.33 million",
        "difficulty": "Easy"
      },
      {
        "q": "A pie chart shows market share: A (40%), B (30%), C (20%), D (10%). If total sales are ₹500,000, what is the sales value of Company C?",
        "sol": "Share of C = 20%\nSales of C = 20% of 500,000\n= (20/100) × 500000\n= ₹100,000",
        "difficulty": "Easy"
      },
      {
        "q": "A bar chart shows production of 50, 70, 90, 80 units in 4 years. Find the percentage increase from year 1 to year 2.",
        "sol": "Year 1 = 50, Year 2 = 70\nIncrease = 70 - 50 = 20\nPercentage increase = (20 / 50) × 100 = 40%",
        "difficulty": "Medium"
      },
      {
        "q": "Using the table, which company showed a decline in revenue?",
        "sol": "Company A: 150 to 180 (Growth)\nCompany B: 200 to 250 (Growth)\nCompany C: 100 to 90 (Decline)\nAnswer: Company C",
        "difficulty": "Medium"
      }
    ]
  },
  {
    "cat": "Verbal",
    "title": "Para Jumbles — Sentence Ordering & Connectors",
    "desc": "Connector words are your fastest clue: \"however\", \"therefore\", \"moreover\", \"despite this\" all signal that the sentence is continuing or contrasting something said just before it. A sentence starting with \"This\", \"These\", or \"Such\" must follow the sentence that introduced that thing. The concluding sentence usually makes a judgment, gives a result, or offers a recommendation — it feels like an ending.",
    "formula": [
      "Find the opening sentence: it introduces a topic without back-references (no 'this', 'however', 'therefore' as first word)",
      "Find the closing sentence: it concludes or summarises, often using 'thus', 'therefore', 'finally'",
      "Link pronouns to their antecedents: 'it' must follow the noun it refers to",
      "Connector words signal order: 'however'=contrast, 'moreover'=addition, 'therefore'=result, 'for example'=illustration",
      "Chronological or cause-effect chains: identify if the passage follows a timeline or argument structure"
    ],
    "method": [
      "Step 1: Read all sentences quickly to grasp the topic",
      "Step 2: Identify the opening sentence (no back-reference, introduces subject)",
      "Step 3: Find any sentence that must follow the opener (direct reference to it)",
      "Step 4: Chain remaining sentences using connectors and pronoun references",
      "Step 5: Verify the final sequence reads naturally from start to finish"
    ],
    "example": {
      "problem": "Arrange: (P) It also reduces air pollution significantly. (Q) Electric vehicles are becoming popular. (R) Moreover, they lower fuel costs for owners. (S) Governments worldwide are offering subsidies to promote them.",
      "solution": "Q → S → R → P. Q introduces EVs. S explains why (subsidies). R adds benefit (fuel cost). P adds another benefit (pollution). QSRP."
    },
    "problems": [
      {
        "q": "Arrange: (P) Therefore, deforestation must be stopped. (Q) Trees absorb CO₂ and release oxygen. (R) Forests are vital for life on Earth. (S) Cutting them down worsens climate change.",
        "sol": "Step 1: R introduces forests.\nStep 2: Q explains why they matter (absorb CO₂).\nStep 3: S shows consequence of cutting (climate change).\nStep 4: P concludes with solution.\nOrder: RQSP",
        "difficulty": "Easy"
      },
      {
        "q": "Arrange: (P) This made communication instantaneous across continents. (Q) The invention of the telephone changed the world. (R) Before it, letters took weeks to arrive. (S) However, it had its limitations in early years.",
        "sol": "Step 1: Q introduces the topic.\nStep 2: R provides contrast of the past (before it).\nStep 3: P shows the change it brought.\nStep 4: S adds a limitation (connector 'however').\nOrder: QRPS",
        "difficulty": "Medium"
      },
      {
        "q": "Arrange: (P) For example, yoga and meditation are now practised globally. (Q) Ancient Indian knowledge has influenced modern wellness. (R) Scientists have validated many of these traditional practices. (S) Furthermore, Ayurveda is gaining recognition in mainstream medicine.",
        "sol": "Step 1: Q introduces the topic (Indian knowledge → modern wellness).\nStep 2: P gives an example (yoga/meditation).\nStep 3: S adds another example (Ayurveda), using 'furthermore'.\nStep 4: R concludes with scientific validation.\nOrder: QPSR",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Verbal",
    "title": "Reading Comprehension — Inference & Main Idea",
    "desc": "An inference is something that must be true based on the passage — not something that could be true or that you personally believe. The main idea is what the passage is fundamentally about, not what it mentions in passing. Wrong answer traps in NQT RC are: too broad (goes beyond the passage), too narrow (only covers one detail), and opposite (contradicts the passage). Eliminate these and the right answer becomes obvious.",
    "formula": [
      "Main idea = what the entire passage is about, not just one paragraph",
      "Inference = what is implied but not directly stated — must be supported by the passage",
      "Tone clues: 'unfortunately', 'alarmingly' = concerned/critical; 'remarkably', 'impressively' = positive/appreciative",
      "Vocabulary in context: replace the word with each option and check which fits the sentence meaning",
      "Elimination strategy: rule out options that are too extreme, out of scope, or contradict the passage"
    ],
    "method": [
      "Step 1: Skim the passage in 30 seconds to identify topic and structure",
      "Step 2: Read each question before re-reading relevant parts of passage",
      "Step 3: For main idea questions — find the sentence that covers the whole passage, not a detail",
      "Step 4: For inference questions — pick the option most directly supported by passage text",
      "Step 5: For tone questions — look for emotion-carrying adjectives and adverbs in the passage",
      "Step 6: For vocabulary questions — substitute each option into the sentence and test meaning"
    ],
    "example": {
      "problem": "Passage: 'The ocean covers 71% of Earth's surface yet over 80% remains unexplored. Marine biodiversity is staggering — a single coral reef can host thousands of species. However, rising sea temperatures and pollution threaten these ecosystems.' Q: What is the author's tone? A) Celebratory B) Concerned C) Indifferent D) Humorous",
      "solution": "B) Concerned. Words like 'threaten' and 'however' signal concern about the ocean's future despite its richness."
    },
    "problems": [
      {
        "q": "Passage: 'Remote work has transformed modern employment. Employees gain flexibility and reduce commute time, boosting productivity. However, isolation and blurred work-life boundaries pose challenges. Companies must adapt policies to support hybrid models effectively.' Q: What does the passage suggest companies should do?",
        "sol": "Step 1: Identify the recommendation in the passage.\nStep 2: Last sentence: 'Companies must adapt policies to support hybrid models.'\nAnswer: Adapt their policies to support hybrid work models.",
        "difficulty": "Easy"
      },
      {
        "q": "Passage: 'Artificial intelligence is reshaping industries from healthcare to finance. While it promises efficiency, critics warn of job displacement and bias in algorithms. Policymakers face the challenge of harnessing AI's benefits while mitigating its risks.' Q: Which title best suits this passage? A) AI in Healthcare B) The Promise and Peril of AI C) Job Losses Due to AI D) Policymakers and Technology",
        "sol": "Step 1: The passage covers AI's benefits AND risks across multiple industries.\nStep 2: Option A is too narrow (only healthcare).\nStep 3: Option C is only one aspect (job losses).\nStep 4: Option D is only about policymakers.\nAnswer: B — 'Promise and Peril of AI' covers both sides of the passage.",
        "difficulty": "Medium"
      },
      {
        "q": "Passage: 'The placebo effect demonstrates the mind's extraordinary power over the body. Patients given sugar pills but told they received real medicine often show measurable improvement. Neuroscientists believe this occurs because belief triggers real neurochemical changes.' Q: What can be inferred about the placebo effect? A) It only works for minor ailments B) It proves medicine is unnecessary C) Belief can cause real physiological changes D) Sugar pills are a valid substitute for medicine",
        "sol": "Step 1: The passage says 'belief triggers real neurochemical changes' — this supports option C.\nStep 2: Option A is not mentioned (no restriction to minor ailments).\nStep 3: Option B and D are extreme/unsupported conclusions.\nAnswer: C — directly supported by 'belief triggers real neurochemical changes'.",
        "difficulty": "Hard"
      }
    ]
  },
  {
    "cat": "Verbal",
    "title": "Cloze Test — Context-Based Fill in the Blanks",
    "desc": "A cloze test is a paragraph with blanks — each blank has 4 options and you choose the one that fits grammatically and contextually. Read the full paragraph first for overall meaning. For each blank, check: does the word fit the grammar (noun/verb/adjective)? Does it fit the tone (positive/negative/neutral)? Does it connect logically to the sentence before and after? If two options both seem right grammatically, the tone and context will separate them.",
    "formula": [
      "Read the full paragraph first before filling any blank",
      "The blank's word must fit grammatically (noun/verb/adjective/adverb)",
      "The blank's word must fit contextually (positive/negative/neutral tone)",
      "Collocations matter: 'make a decision' not 'do a decision'; 'strong coffee' not 'powerful coffee'",
      "Connectors reveal relationship: 'although'=contrast, 'since'=reason/time, 'despite'=contrast with noun"
    ],
    "method": [
      "Step 1: Read the entire paragraph to understand the topic and tone",
      "Step 2: Identify the part of speech needed for each blank",
      "Step 3: Eliminate options that don't fit grammatically",
      "Step 4: Among remaining, pick the one that fits contextually and collocates correctly",
      "Step 5: Re-read the completed paragraph to confirm it flows naturally"
    ],
    "example": {
      "problem": "The internet has ___ (1) the way we communicate. ___ (2) its many benefits, it has also created new challenges such as misinformation. Blank 1: A) destroyed B) transformed C) ignored D) avoided | Blank 2: A) Despite B) Because of C) Therefore D) Unless",
      "solution": "Blank 1: B) transformed — the internet changed communication (not destroyed it). Blank 2: A) Despite — contrast between benefits and challenges."
    },
    "problems": [
      {
        "q": "Reading is one of the most ___ habits a person can develop. It not only improves vocabulary but also ___ critical thinking. Blank 1: A) wasteful B) dangerous C) beneficial D) boring | Blank 2: A) destroys B) ignores C) enhances D) removes",
        "sol": "Step 1: The passage is positive about reading.\nBlank 1: C) beneficial — fits the positive tone.\nBlank 2: C) enhances — 'enhances critical thinking' is the correct collocation.",
        "difficulty": "Easy"
      },
      {
        "q": "___ the heavy rainfall, the match continued without interruption. The players ___ remarkable determination throughout the game. Blank 1: A) Because of B) Despite C) Since D) Although | Blank 2: A) lacked B) displayed C) avoided D) removed",
        "sol": "Step 1: Rain + continued = contrast → 'Despite'.\nStep 2: Players continuing in rain = showing determination → 'displayed'.\nBlank 1: B) Despite | Blank 2: B) displayed",
        "difficulty": "Medium"
      },
      {
        "q": "Climate change is no longer a ___ threat — its consequences are already ___. Rising temperatures, erratic rainfall, and melting glaciers are ___ evidence of a planet under stress. Blank 1: A) distant B) welcome C) minor D) resolved | Blank 2: A) hypothetical B) invisible C) manifesting D) improving | Blank 3: A) weak B) compelling C) scarce D) irrelevant",
        "sol": "Step 1: The passage emphasises real, current consequences.\nBlank 1: A) distant — climate change was thought future but is now present.\nBlank 2: C) manifesting — consequences are appearing/occurring.\nBlank 3: B) compelling — strong, persuasive evidence.",
        "difficulty": "Hard"
      }
    ]
  }
];
