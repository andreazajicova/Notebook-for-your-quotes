async function displayQuotes() {
    const quotes = await fetch('http://localhost:3000/api/quotes').then(response => response.json())
    .then(myJson => console.log(JSON.stringify(myJson)));
    // $(`#${id}`).html(`<>Quote: ${quote}/p>`);
};


// window.displayQuote = displayQuote;