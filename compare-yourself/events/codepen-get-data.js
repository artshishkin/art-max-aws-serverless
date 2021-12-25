var xhr = new XMLHttpRequest();
xhr.open('GET','https://6zlxd52ys6.execute-api.eu-north-1.amazonaws.com/Prod/compare-yourself/single');
xhr.onreadystatechange = function(event) {
    console.log(JSON.parse(event.target.response));
}
xhr.send();