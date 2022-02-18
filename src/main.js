
const firstName = 'lily';

function personRename(name) {
  return name + ':' + Math.random();
}

console.log('name', firstName);
console.log('named', personRename(firstName));
