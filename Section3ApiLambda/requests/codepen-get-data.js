var xhr = new XMLHttpRequest();
xhr.open('GET','https://9cxvvjl4d0.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/all');
xhr.onreadystatechange = function(event) {
    console.log(event.target.response);
}
xhr.send();