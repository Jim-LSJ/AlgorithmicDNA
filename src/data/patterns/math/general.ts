import { AlgorithmPattern } from "../../../types";

export const mathGeneral: AlgorithmPattern = {
  id: "math-general",
  name: "Number Theory & Math",
  category: "Math",
  description: "Fundamental mathematical algorithms involving prime numbers, GCD, and efficient exponentiation.",
  imageUrl: "/patterns/math.png",
  complexity: {
    time: "Varies (O(log n) to O(sqrt n))",
    space: "O(1) to O(n)",
  },
  coreTemplate: `def gcd(a, b):
    [[core|while b: a, b = b, a % b|Euclidean algorithm for Greatest Common Divisor.|用於計算最大公因數的輾轉相除法。]]
    return a

def bin_pow(a, b, m):
    [[core|res = 1|Binary Exponentiation (a^b % m).|快速冪運算。]]
    a %= m
    while b > 0:
        if b % 2 == 1: res = (res * a) % m
        [[mod|a = (a * a) % m; b //= 2|Efficiently square and divide.|高效平方並折半。]]
    return res`,
  variations: [
    {
      id: "count-primes",
      title: "Count Primes (Sieve of Eratosthenes)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/count-primes/",
      description: "Find the number of prime numbers strictly less than n.",
      coreLogic: `is_prime = [True] * n
for i in range(2, sqrt(n)):
    if is_prime[i]: 
        for mult in range(i*i, n, i): is_prime[mult] = False`,
      adaptationLogic: ``,
      explanation: "Iteratively mark multiples of each prime starting from 2. All remaining unmarked numbers are prime.",
      fullCode: `def count_primes(n):
    if n < 3: return 0
    [[core|is_prime = [True] * n|Boolean array to track primality.|標記是否為質數的布林陣列。]]
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            [[mod|for j in range(i * i, n, i): is_prime[j] = False|Eliminate multiples.|剔除倍數。]]
    return sum(is_prime)`
    },
    {
      id: "pow-x-n",
      title: "Pow(x, n)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/powx-n/",
      description: "Implement pow(x, n), which calculates x raised to the power n.",
      coreLogic: `if n < 0: x = 1/x; n = -n
res = bin_pow(x, n)`,
      adaptationLogic: `Recursive or iterative bin_pow`,
      explanation: "Handle negative powers by taking the reciprocal and use binary exponentiation for speed.",
      fullCode: `def my_pow(x, n):
    if n < 0:
        x = 1 / x; n = -n
    res = 1
    while n:
        [[mod|if n % 2: res *= x|If power is odd, multiply once.|若冪為奇數，乘一次。]]
        x *= x
        [[mod|n //= 2|Square the base and halve the exponent.|底數平方，冪減半。]]
    return res`
    },
    {
      id: "fraction-to-recurring-decimal",
      title: "Fraction to Recurring Decimal",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/fraction-to-recurring-decimal/",
      description: "Convert a fraction into a repeated decimal string.",
      coreLogic: `res.append(str(rem // den))
rem %= den
if rem in seen: # found loop`,
      adaptationLogic: `HashMap to track remainders`,
      explanation: "Use a hashmap to remember the position of each remainder. If a remainder repeats, we found a recurring cycle.",
      fullCode: `def fraction_to_decimal(numerator, denominator):
    if numerator == 0: return "0"
    res = []
    if (numerator < 0) ^ (denominator < 0): res.append("-")
    n, d = abs(numerator), abs(denominator)
    res.append(str(n // d)); rem = n % d
    if rem == 0: return "".join(res)
    res.append(".")
    [[core|seen = {}|Record history of remainders to detect cycles.|記錄餘數歷史以偵測循環。]]
    while rem:
        if rem in seen:
            [[mod|res.insert(seen[rem], "("); res.append(")")|Insert parentheses at cycle start.|在循環起始處插入括號。]]
            break
        seen[rem] = len(res)
        rem *= 10
        res.append(str(rem // d))
        rem %= d
    return "".join(res)`
    }
  ]
};
