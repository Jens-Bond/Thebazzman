function getNumber() {
 var input = document.getElementById('inputNumber').value;
 var part2 = input.replace("https://www.merinfo.se/search?who=", "");
 var part1 = "https://www.merinfo.se/search?who=";
 var final = part1 + part2;
 getHTML(final);
};
getHTML("https://www.merinfo.se/search?who=0702990271");

function getHTML(link) {
 let PROXY = "https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/";
 let finalLink = PROXY + link;
 response = fetch(finalLink).then(response => response.text()).then((html) => {
   var parser = new DOMParser();
   var doc = parser.parseFromString(html, 'text/html');
   console.log(doc);
   let mb = doc.getElementsByClassName("mb-0");
   let t = doc.getElementsByClassName("col pb-3 pl-3 pt-0 pr-0")[0].getElementsByClassName("mb-0")[1].innerHTML;
   console.log(t);
   let tt = t.replace(/\\x/g, '%').replace(/\\n/g, "");
   const city = tt.match(/[^ ]+$/g);
   const adress = tt.match(/^[^ ]+/g);
   var content = {"adress": decodeURI(adress), "city": decodeURI(city)};
   console.log(content);
 }).catch(err => console.log(err))
};



function displayDetails(info) {
   console.log(info);
  
};
