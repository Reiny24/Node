function* gen() {
    for (let i = 0; i < 2; i++) {
      yield i;
    }
}

const myGen = gen();
console.log(myGen.next())
console.log(myGen.next())
console.log(myGen.next())