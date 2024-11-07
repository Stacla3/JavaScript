'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// at method (arr)
const simpleArr = ["nickel", 'pat', 'ball'];
console.log(simpleArr.at(1));

// at method on string
console.log("dssd".at(-1));

// forEach
simpleArr.forEach(function(data, i){
  console.log(data, i+1);
})

// map
let eurToUSD = 1.1;
const movementsToUSD = movements.map(mov => mov * eurToUSD);
console.log(movements, movementsToUSD);

////////////////////////////////////////////////////

const displayMovs = function(movements){
  containerMovements.innerHTML = '';
  movements.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>;
          <div class="movements__value">${mov}</div>
        </div>`
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

displayMovs(account1.movements);

const calcDisplayBalance = function(movements){
  const balance = movements.reduce(function(sum, mov){
    return sum + mov;
  }, 0)
  labelBalance.textContent = balance + '€';
}

calcDisplayBalance(account1.movements);

const calcDisplaySum = function(movements){
  const income = movements.filter(function(mov){
    return mov >= 0;
  }).reduce(function(sum, mov){
    return sum + mov;
  }, 0);
  labelSumIn.textContent = `${income}€`;

  const out = movements.filter(function(mov){
    return mov < 0;
  }).map(function(mov){
    return Math.abs(mov);
  }).reduce(function(sum, mov){
    return sum + mov;
  }, 0);
  labelSumOut.textContent = `${out}€`;
  
  const interest = movements.filter(function(mov){
    return mov >= 0;
  }).map(function(deposit){
    return deposit * 1.2 / 100;
  }).filter(function(int){
    return int >= 1;
  }).reduce(function(sum, interest){
    return sum + interest;
  }, 0)
  labelSumInterest.textContent = `${interest}€`;
}

calcDisplaySum(account1.movements);

function createUsernames(accounts){
  accounts.forEach(function(acc){
    acc.userName = acc.owner.toLowerCase().split(' ').map(function(user){
      return user[0];
    }).join('');
  })
}

createUsernames(accounts);

const deposits = movements.filter(function(mov){
  return mov >= 0;
});

const withdraws = movements.filter(function(mov){
  return mov < 0;
});

const findMaxBalance = movements.reduce(function(sum, mov){
  return sum < mov ? sum = mov : sum;
}, movements[0]);

const findMinBalance = movements.reduce(function(sum, mov){
  return sum > mov ? sum = mov : sum;
}, movements[0]);

console.log(findMaxBalance, findMinBalance);

const account = accounts.find(function(acc){
  return acc.owner === 'Sarah Smith';
})

console.log(account);