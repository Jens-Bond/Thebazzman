
let collectedData = {};
let carsTemp = [];



// Functions:
function countSameItems(array1, array2){
 let arr1 = array1,
   arr2 = array2,
   compare = (a1, a2) => arr1.reduce((a, c) => a + arr2.includes(c), 0);
 return compare(arr1, arr2);
};



document.querySelector('#inputNumber.search.input').addEventListener('keypress', function (e) {
   if (e.key === 'Enter') {
     respondWith(document.getElementById("inputNumber").value);
     //event.preventDefault();
     document.getElementById("inputNumber").value = "";
     let parent = document.getElementById("carsList");
     while (parent.firstChild) {
       parent.removeChild(parent.firstChild);
     };
     let carTitle1 = document.getElementById("carsTitle");
     while (carTitle1.firstChild) {
       carTitle1.removeChild(carTitle1.firstChild);
     };
   }
});



function respondWith(nmr) {
 getSearchLink(nmr);
};


const button = document.getElementById("clipboardButton");
button.addEventListener("click", function() {
  const getClipboard = new Promise(function(resolve) {
    navigator.clipboard.readText().then(function(text) {resolve(text)});
  });
  getClipboard.then(function(text) {
    document.getElementById("inputNumber").value = "";
    let parent = document.getElementById("carsList");
     while (parent.firstChild) {
       parent.removeChild(parent.firstChild);
     };
     let carTitle1 = document.getElementById("carsTitle");
     while (carTitle1.firstChild) {
       carTitle1.removeChild(carTitle1.firstChild);
     };
    getSearchLink(text);
  });
});

function getSearchLink(nmr) {
 let part1 = "https://www.merinfo.se/search?who=";
 let part2 = String(nmr);
 let searchLink = part1 + part2;
 getSearchHTML(searchLink);
};



function getSearchHTML(link) {
 let finalLink = "https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/" + link;
 response = fetch(finalLink).then(response => response.text()).then((html) => {
   var parser = new DOMParser();
   var doc = parser.parseFromString(html, 'text/html');
   console.log(doc);
   let t = doc.getElementsByClassName("col pb-3 pl-3 pt-0 pr-0")[0].getElementsByClassName("mb-0")[1].innerText;
   let list_ = t.split("\\n").filter(e =>  e);
   //let prepareTranslate = list_.replace(/\\x/g, '%');
   for (let i = 0; i < list_.length; i++) {
     list_[i] = list_[i].replace(/\\x/g, '%');
     list_[i] = decodeURI(list_[i]);
   };
   list_[list_.length-1] = list_[list_.length-1].replace(/^[0-9\s]*/g, '');
   collectedData["gatuadress/postord"] = [list_];
   var content = {"address":String(list_[0]), "city":String(list_[1])};
   let namnTag = doc.getElementsByClassName("link-primary")[0].href;
   var switch1;
   window.switch1 = namnTag;
   console.log("NAMN TAAAAG", namnTag);
   document.getElementById('iframe1').setAttribute("src",namnTag);
   //console.log(namnTag);
   console.log("CONTEEEENT", content);
   carsAPI(content);
   
 }).catch(err => alert("Finns antagligen inte på Merinfo"))
};












function carsAPI(content, extra) {
 fetch("https://www.merinfo.se/api/v1/addresses/vehicles", {method: "POST", redirect: 'follow', headers: {'Content-type': 'application/json', 'Accept': 'application/json, text/plain, */*'}, body: JSON.stringify(content)}).then(function (response) {
   // The API call was successful!
   return response.json();
 }).then(function (data) {
   // This is the JSON from our response
   //console.log(data);
   creditFromURL(data["data"]["vehicles"]);
 }).catch(function (err) {
   // There was an error
   console.warn('Something went wrong.', err);
 });
};



function creditFromURL(list) {
 let list1 = list;
 let countCredit = 0;
 let totalCars = list.length;
 var listItem1 = document.createElement("p");
 listItem1.setAttribute("class", "titleCarsYo");
 var textP = "Totala antal bilar: " + String(totalCars);
 var listText1 = document.createTextNode(textP);
 listItem1.appendChild(listText1);
 document.getElementById("carsTitle").appendChild(listItem1);
  
 for (let i = 0; i < list1.length; i++) {
   response = fetch("https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/" + list1[i]["url"]).then(response => response.text()).then((html1) => {
     var parser = new DOMParser();
     var doc1 = parser.parseFromString(html1, 'text/html');
     //evaluate prie:
     //console.log(doc1);
     //console.log(list1[i]["url"]);
     
     //Credit Checker:
     let creditBool = doc1.getElementById("data-credit").textContent;
     if (creditBool === "Ja") {
       console.log(list1[i]["url"]);
       var fromCompany = doc1.getElementsByClassName("row no-gutters event-")[1].textContent;
       //console.log(fromCompany);
       //console.log(fromCompany.search(/[F\xc3\xb6retag]/g));
       if (fromCompany.search(/[F\xc3\xb6retag]/g) > 0) {
         let inner = doc1.getElementsByClassName("row no-gutters event-")[1].innerHTML;
         let innerLink = inner.search(/href='([^']*)/gm);
         console.log(innerLink);
       };
       var element = document.createElement("li");
       element.setAttribute("class", "carAll3");
       span1 = document.createElement("span");
       span2 = document.createElement("span");
       span3 = document.createElement("span");
       span1.setAttribute("class", "year1");
       span2.setAttribute("class", "model1");
       span3.setAttribute("class", "owner1");
       span1Text = document.createTextNode(list1[i]["year"]);
       span2Text = document.createTextNode(list1[i]["model"]);
       span3Text = document.createTextNode("Fordonsägare --- " + list1[i]["owner"]);
       span1.appendChild(span1Text);
       span2.appendChild(span2Text);
       span3.appendChild(span3Text);
       element.appendChild(span1);
       element.appendChild(span2);
       element.appendChild(span3);
       document.getElementById("carsList").appendChild(element);
       
     }
   }).catch(err => console.log(err))
 };
};


function myFunction() {
  var x = document.getElementById("iframeDiv");
  var y = document.getElementById("iframeDiv2");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
}

function showAllaBolag() {
  var allabolag = document.getElementById("iframeDiv2");
  var merinfo = document.getElementById("iframeDiv");
  allabolag.style.display = "block";
  merinfo.style.display = "none";
};
function showMerinfo() {
  document.getElementById("iframe1").src = window.switch1;
  var allabolag = document.getElementById("iframeDiv2");
  var merinfo = document.getElementById("iframeDiv");
  merinfo.style.display = "block";
  allabolag.style.display = "none";
};



/*-------------------DESCRIPTION-API--------------------*/


function linkedin() {
 let finalLink = "https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/" + window.switch1;
 response = fetch(finalLink).then(response => response.text()).then((html) => {
   var parser = new DOMParser();
   var doc = parser.parseFromString(html, 'text/html');
   let name = doc.getElementById("ratsit-lonekollen-url").href;
   name = name.replace("https://www.merinfo.se/redirect/lonekollen/", "");
   //console.log("NEEEW22222", name);
   getCommonName(name);
 }).catch(err => alert("Error in: linkedin"))
};

function getCommonName(link) {
 fetch("https://www.merinfo.se/api/v1/people/" + link + "/description", {method: "POST", redirect: 'follow', headers: {'Content-type': 'application/json', 'Accept': 'application/json, text/plain, */*'}}).then(function (response) {
   // The API call was successful!
   return response.json();
 }).then(function (data) {
   // This is the JSON from our response
   console.log("DAAAATAAA on line 209 ATM", data);
   let commonName = data["data"]["name"]["common"];
   let commonNameList = commonName.split(" ");
   let fullString = "https://www.linkedin.com/search/results/people/?firstName=" + commonNameList[0] + "&lastName=";
   commonNameList.shift();
   fullString += commonNameList.join("+");
   console.log("REEES", fullString);
   window.open(fullString, "_blank");
 }).catch(function (err) {
   // There was an error
   console.warn('Something went wrong.', err);
 });
};

// https://www.linkedin.com/search/results/people/?firstName=Jan-Erik&lastName=Eriksson&origin=SEO_PSERP&sid=nSS
