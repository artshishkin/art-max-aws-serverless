var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://9cxvvjl4d0.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself');
xhr.onreadystatechange = function (event) {
    console.log(event.target.response);
}
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({age: 32, height: 175, income: 1500}));