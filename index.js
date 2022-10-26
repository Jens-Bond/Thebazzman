function getNumber() {
 var input = document.getElementById('inputNumber').value;
 var part2 = input.replace("https://www.merinfo.se/search?who=", "");
 var part1 = "https://www.merinfo.se/search?who=";
 var final = part1 + part2;
 getHTML(final);
};


function displayDetails(info) {
   console.log(info);
  
};
