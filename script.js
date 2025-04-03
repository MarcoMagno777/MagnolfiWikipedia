const aggiungi = document.getElementById("aggiungi");
const azzera = document.getElementById("azzera");
const container = document.querySelector(".container");
let id;


aggiungi.addEventListener("click", async () => {

    const risposta = await fetch("https://it.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&rnnamespace=0&format=json&origin=*");
    const data = await risposta.json();

    id = data.query.random[0].id;

    const secondRequest = await fetch(`https://it.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exintro&format=json&origin=*&pageids=${id}`);
    const infoArticolo = await secondRequest.json();

    creaArticolo(infoArticolo);

});


function creaArticolo(infoA){

    const articolo = document.createElement("article");
    const paragrafo = document.createElement("p");
    const titolo = document.createElement("h3");

    paragrafo.innerHTML = infoA.query.pages[id].extract;
    titolo.innerHTML = infoA.query.pages[id].title;

    articolo.append(titolo, paragrafo);

    container.append(articolo);

}

azzera.addEventListener("click", () => {

    container.innerHTML = "";

});