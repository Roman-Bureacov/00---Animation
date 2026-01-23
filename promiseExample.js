let p = new Promise((resolve, reject) => {
    resolve(42);
    //reject(42);
})

p.then(ok => console.log("OK " + ok), no => console.log("NO " + no));
p.catch(no => console.log("NOPE: " + no));


p
    .then(ok => console.log("OK " + ok), no => console.log("NO " + no))
    .catch(no => console.log("NOPE: " + no));
