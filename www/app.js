function sendData(srch){
    const searchResults = document.getElementById('searchResults')
    let query = srch.value;
    if(query.length = 0){
        searchResults.style.visibility = "hidden";
    }
    
    if (query.length > 0){
        searchResults.style.visibility = "visible";
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
                    searchResults.innerHTML += `<a href="http://localhost:3000/event/${item._id}"><p>${item.titulo}</p></a>`
                });
            })
    }

    document.addEventListener('click', function(event) {
        if (event.target !== srch && event.target !== searchResults) {
            searchResults.style.visibility = "hidden";
        }
    });

}