function sendData(srch){
    const searchResults = document.getElementById('searchResults')
    console.log(srch.value);
    let query = srch.value;
    if (query.length > 0){
        const url = `http://localhost:3004/search?q=${query}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                searchResults.innerHTML = '';
                if(srch.length < 1){
                    searchResults.innerHTML = '<p>No hemos encontrado lo que buscas</p>';
                }
                data.forEach((item, index) => {
                    if(index > 0) searchResults.innerHTML += '<hr>';
                    searchResults.innerHTML += `<p>${item.titulo}</p>`
                });
            })
    }
}