var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://6zlxd52ys6.execute-api.eu-north-1.amazonaws.com/Prod/compare-yourself');
xhr.onreadystatechange = function (event) {
    console.log(event.target.response);
}
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({age: 38, height: 180, income: 2500}));