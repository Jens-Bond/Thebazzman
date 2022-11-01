/*


function getHTML(link) {
 fetch("https://www.merinfo.se/search?who=0702990271&where=", {referrer: "https://www.merinfo.se/"})
   .then(function(response) {
   console.log(response)
 });
};
*/



/*


message.addEventListener('input', function () {
           result.textContent = this.value;
       });


*/
let collectedData = {};
let carsTemp = [];



// Functions:
function countSameItems(array1, array2){
 let arr1 = array1,
   arr2 = array2,
   compare = (a1, a2) => arr1.reduce((a, c) => a + arr2.includes(c), 0);
 return compare(arr1, arr2);
};

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}




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
 //var loaderElem = document.createElement("div");
 //loaderElem.setAttribute("id", "loaderElemId");
};



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
   let mixList = namnTag.split(/\/|-/g);
   console.log(namnTag);
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
 /*
 waitForElm('#loaderId').then((elm) => {
    console.log('Element is ready');
    console.log(elm.textContent);
 });
 */
 let countC = 0;
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
       //let test = doc1.querySelector("#valuation-section-div > div > div.col-12.col-md-8 > div > div:nth-child(2) > section > span.price");
       //console.log(list1[i]["url"]);
       //     let Code = list1[i]["url"];
       //let regex = /[^/]+$/g;
       //      let priceCode = Code.match(/[^/]+$/g);
       //      console.log(priceCode);
       countX += 1;
       
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
    //                      var loader = document.createElement("div");
    //                      loader.setAttribute("id", "loaderId");
    //                      loader.setAttribute("style", "padding: 0; margin: 0; boarder: 0;")
    //                      document.getElementById("carsList").appendChild(loader);
    
      
    
   }).catch(err => console.log(err))
  let onC = document.createElement("p");
  onC.setAttribute("class", "titleCarsYoo");
  onCText = document.creatheTextNode("Köpta på kredit: " + string(countC));
  onC.appendChild(onCText);
  document.getElementById("carsTitle").appendChild(onC);
  
 };
};


