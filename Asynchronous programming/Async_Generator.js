async function* asyncGenerator() {
    const data1 = await fetch("https://example.com/data1");
    const data2 = await fetch("https://example.com/data2");
  
    yield data1;
    yield data2;
}

const data = asyncGenerator();

console.log(data);