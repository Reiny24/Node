const myFunc = (param1, param2) => {
    console.log(param1 + param2 + '!');
};

setTimeout(myFunc, 2 * 1000, 'Hello', ' World');