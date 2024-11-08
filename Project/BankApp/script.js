'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

// flat
const nums = [12, 13, 14, [4, 5, 6], [7, [8, 9]]];
console.log(nums.flat());

//Sorted arr
const price = [2000, 300, 200, 100, 5000, 500, 700, 70];
price.sort(function(x, y){
  return x > y ? 1 : -1;
})
console.log(price);

// Parsing (use in CSS is useful)
console.log(Number.parseInt('300px', 10));
console.log(Number.parseFloat('3.5rem', 10));

// Check is a Number
console.log(Number.isNaN('20'));

// betten that above
console.log(Number.isFinite('20'));
console.log(Number.isFinite(20));

// Check is integer
console.log(Number.isInteger(20));

console.log(Math.sqrt(3))
console.log(Math.max(...[5, 4, 3, 2]));
console.log(Math.trunc(2.5222));

const randomInt = function(max, min){
  return Math.trunc(Math.random() * (max - min) + 1) + min;
}

console.log(randomInt(5, 1))

// Round demical
console.log((2.8).toFixed(3));

//Numeric operator
console.log(788_888);

//Big int
console.log(Number.MAX_SAFE_INTEGER);
console.log(8194718471847148714n);
console.log(BigInt(14141414131414141414));
console.log(1n + 2n);
console.log(20n < 199n);

//createDate
const now = new Date();
console.log(now);
console.log(new Date(0));

const future = new Date(2027, 2, 28, 16, 0);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());
console.log(new Date(future.getTime()));

////////////////////////////////////////////////////

const displayMovs = function(movements, sorted = false){
  containerMovements.innerHTML = '';
  const movs = sorted ? movements.slice().sort(function(a, b){
    return a - b;
  }) : movements;
  movs.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>;
          <div class="movements__value">${(mov).toFixed(2)}</div>
        </div>`
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce(function(sum, mov){
    return sum + mov;
  }, 0)
  labelBalance.textContent = acc.balance.toFixed(2) + '€';
}

const calcDisplaySum = function(accCur){
  const income = accCur.movements.filter(function(mov){
    return mov >= 0;
  }).reduce(function(sum, mov){
    return sum + mov;
  }, 0);
  labelSumIn.textContent = `${income.toFixed(2)}€`;

  const out = accCur.movements.filter(function(mov){
    return mov < 0;
  }).map(function(mov){
    return Math.abs(mov);
  }).reduce(function(sum, mov){
    return sum + mov;
  }, 0);
  labelSumOut.textContent = `${out.toFixed(2)}€`;
  
  const interest = accCur.movements.filter(function(mov){
    return mov >= 0;
  }).map(function(deposit){
    return (deposit * accCur.interestRate) / 100;
  }).filter(function(int){
    return int >= 1;
  }).reduce(function(sum, interest){
    return sum + interest;
  }, 0)
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}

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

const account = accounts.find(function(acc){
  return acc.owner === 'Sarah Smith';
})

const updateInterface = function(curAcc){
  //Display movements
  displayMovs(curAcc.movements);
  //Display balance
  calcDisplayBalance(curAcc);
  //Display summary
  calcDisplaySum(curAcc);
}

let currentAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  currentAccount = accounts.find(function(acc){
    return acc.userName === inputLoginUsername.value;
  })
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //Display welcome
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    //Display Ui
    updateInterface(currentAccount);
    inputLoginUsername.value = inputLoginPin.value = '';
  }
  console.log(currentAccount);
})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieveAccount = accounts.find(function(acc){
    return acc.userName === inputTransferTo.value;
  });
  inputTransferTo.value = inputTransferAmount.value = '';
  if(amount > 0 && currentAccount.balance >= amount && recieveAccount?.userName !== currentAccount.userName && recieveAccount){
    currentAccount.movements.push(-amount);
    recieveAccount.movements.push(amount);
    updateInterface(currentAccount);
  }
})

btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Math.floor((inputLoanAmount.value));
  if(amount > 0 && currentAccount.movements.some(function(mov){
    return mov >= amount/10;
  })){
    currentAccount.movements.push(amount);
    updateInterface(currentAccount);
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin){
    const indexCur = accounts.findIndex(function(acc){
      return acc.userName === inputCloseUsername.value;
    })
    accounts.splice(indexCur, indexCur+1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
})

let sortState = false
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovs(currentAccount.movements, !sortState);
  sortState = !sortState;
})

const movementsUi = Array.from(document.querySelectorAll('.movements_value'));

const depositSums =  accounts.flatMap(function(acc){
  return acc.movements;
}).filter(function(acc){
  return acc > 0;
}).reduce(function(sum, cur){
  return sum + cur;
});

const numDeposits1000 = accounts.flatMap(function(acc){
  return acc.movements;
}).filter(function(acc){
  return acc > 1000;
}).length

const sums = accounts.flatMap(function(acc){
  return acc.movements;
}).reduce(function(sum, curAcc){
  curAcc > 0 ? sum.deposits += curAcc : sum.withdraws += curAcc;
  return sum;
}, {deposits: 0, withdraws: 0})

const convertTitleCase = function(title){
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titles = title.toLowerCase().split(' ').map(function(title){
    return exceptions.includes(title) ? title : title.replace(title[0], title[0].toUpperCase());
  });
  return titles.join(' ');
}

console.log(convertTitleCase('nickel is the best developer.'));
