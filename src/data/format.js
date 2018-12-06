var fs = require('fs');
var zipcodes = require('./zipcodes.json');

function main() {
  const denormalized = zipcodes.reduce(
    (obj, city) => ({
      ...obj,
      [city.zipcode]: city
    }),
    {}
  );

  fs.writeFileSync('./zipcodes2.json', JSON.stringify(denormalized));
}

main();
