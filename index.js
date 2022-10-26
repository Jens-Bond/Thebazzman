function getNumber() {
 var input = document.getElementById('inputNumber').value;
 var part2 = input.replace("https://www.merinfo.se/search?who=", "");
 var part1 = "https://www.merinfo.se/search?who=";
 var final = part1 + part2;
 let temp = "https://www.merinfo.se/search?who=0702990271";
 //getHTML(final);
 getHTML(temp);
};


function getHTML(link) {
 let PROXY = "https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/";
 let finalLink = PROXY + link;
 response = fetch(finalLink).then(response => response.text()).then((html) => {
     var parser = new DOMParser();
     var doc = parser.parseFromString(html, 'text/html');
     console.log(doc);
 }).catch(err => console.log(err))
};



function displayDetails(info) {
   console.log(info);
  
};
