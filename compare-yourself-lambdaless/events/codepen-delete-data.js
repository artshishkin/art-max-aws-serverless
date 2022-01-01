var xhr = new XMLHttpRequest();
xhr.open('DELETE', 'https://6zlxd52ys6.execute-api.eu-north-1.amazonaws.com/Prod/compare-yourself');
xhr.onreadystatechange = function (event) {
    console.log(event.target.response);
}
xhr.send();