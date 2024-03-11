fetch('nav.html')
.then(response => response.text())
.then(data =>{
    document.getElementById('header').innerHTML = data
})

.catch(error => {console.error("erro ao carregar o nav: ", error)})