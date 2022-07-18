function Fizzbuzz(x) {
  var output = "";
  for (var i = 1; i <= x; i++) {
    output = i;
    if (i % 15 == 0) output = "Fizzbuzz";
    else if (i % 3 == 0) output = "Fizz";
    else if (i % 5 == 0) output = "Buzz";
    else console.log(output);
  }
}

for (let i = 1; i <= 100; )
  console.log((i++ % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i);
