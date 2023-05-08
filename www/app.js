

function sendData(srch){
    console.log(srch.value);
    fetch('http://localhost:3004/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'localhost'
        },
        body: JSON.stringify({payload: srch.value})
    });
}