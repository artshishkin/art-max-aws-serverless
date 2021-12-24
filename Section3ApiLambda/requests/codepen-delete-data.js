var xhr = new XMLHttpRequest();
xhr.open('DELETE', 'https://9cxvvjl4d0.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself');
xhr.onreadystatechange = function (event) {
    console.log(event.target.response);
}
xhr.send();