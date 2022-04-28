//Variables
const addBookBtn = document.getElementById('newBookBtn');
const overlay = document.getElementById('overlay');
const rainbowContainer = document.getElementById('rainbowContainer')
const formContainer = document.getElementById('formContainer');
const formSubmitBtn = document.getElementById('formSubmitBtn');

// Need to create library function - it would create a new
// library, even though we only need 1. The point is, it would
// establish what a library is, define all of its functions.
// If this was a real world example, once we've done this, someone
// would call these functions and say library.addBook, or library.clearBooks
// which would be easier to read and make more sense.

let LibraryFactory = function () {
    // create lib object
    var library = {};

    // parameters as keys for this object
    library.titles = [];

    // function to add book
    library.addBook = function(){
        return ('book added')
    };
    return library; 
}


// library array of all books
let library = [];

// Our factory function that creates book objects
function createBook(title, author, pages, cover, read) {
    var book = {};

    book.title = title;
    book.author = author;
    book.pages = pages;
    book.cover = cover;
    book.read = read;
    return { title, 
             author, 
             pages, 
             cover, 
             read, 
             sayTitle: function(){
                 console.log(`Title: ${book.title}`);
             }}
}

// the function that adds a book to the library array
function addBookToLibrary(a, b, c, d, e) {
    library.push(createBook(a, b, c, d, e));
    console.log(a);
    console.table(library);
}

// Remove form and overlay from screen
function clearScreen() {
    //Make form visible
    rainbowContainer.classList.toggle('active');
    formContainer.classList.toggle('active');
    //Make overlay visible
    overlay.classList.toggle('active');
    return true;
}

// logic for deleting divs before adding new dom elements
function clearBoard() {
    const cardContainer = document.getElementById('container');
    var card = cardContainer.lastElementChild;
    while (card) {
    cardContainer.removeChild(card);
    card = cardContainer.lastElementChild;
    }
}

// logic for rendering the library array in the DOM
function addBookToDOM(bTitle, bAuthor, bPages, bCover, bRead) {

    //store container div as variable
    const container = document.getElementById('container');

    //create a new div and add a class of card
    const card = document.createElement('div');
    card.classList.add('card');

    //append that card div to its parent, the container div
    container.appendChild(card);

    //create divs, add classes
    const cardImg = document.createElement("div");
    const cardInfo = document.createElement("div");
    cardImg.classList.add('cardImg');
    cardInfo.classList.add('cardInfo');

    //append cardIMG&cardInfo to card
    card.appendChild(cardImg);
    card.appendChild(cardInfo);

    //cardInfo DOM elements:
    //title
    const title = document.createElement('p');
    title.classList.add('title');
    const titleNode = document.createTextNode(bTitle);
    title.dataset.title = bTitle;
    title.appendChild(titleNode);
    cardInfo.appendChild(title);

    //author
    const author = document.createElement('p');
    author.classList.add('author');
    const authorNode = document.createTextNode(bAuthor);
    author.appendChild(authorNode);
    cardInfo.appendChild(author);

    //pages
    const pages = document.createElement('p');
    pages.classList.add('pages');
    const pagesNode = document.createTextNode(`Pages: ${bPages}`);
    pages.appendChild(pagesNode);
    cardInfo.appendChild(pages);

    //cover
    cardImg.style.backgroundImage = 'url(img/coverNotFound.jpg)';
    if (bCover !== '') {
        cardImg.style.backgroundImage = `url(${bCover})`;
    }
    
    

    //haveYouReadThis?
    const readQuestion = document.createElement('p');
    readQuestion.classList.add('read');
    const readQuestionNode = document.createTextNode('haveYouReadThis?');
    readQuestion.appendChild(readQuestionNode);
    cardInfo.appendChild(readQuestion);

    // yes/no button
    const read = document.createElement('button');
    read.classList.add('readBtn');
    if (bRead == true) {
        read.classList.add('readBtnYes');
        const readNode = document.createTextNode('Yes');
        read.appendChild(readNode);
    } else {
        read.classList.add('readBtnNo');
        const readNode = document.createTextNode('No');
        read.appendChild(readNode);
    }
    cardInfo.appendChild(read);

    //delete book button
    const deleteBookBtn = document.createElement('button');
    const deleteNode = document.createTextNode('delete');
    deleteBookBtn.appendChild(deleteNode);
    deleteBookBtn.classList.add('deleteBookBtn');
    cardInfo.appendChild(deleteBookBtn);


    deleteBookBtn.addEventListener('click', function(){
        const result = library.filter(book => book.title !== title.dataset.title);
        console.log(title.dataset.title);
        console.log(title)
        library = result;
        console.table(library);
        title.parentElement.parentElement.remove();
        return library;
    })
}

// logic for the "book++" button, making the form and overlay appear
addBookBtn.addEventListener('click', function(){
    //Make form visible
    rainbowContainer.classList.toggle('active');
    formContainer.classList.toggle('active');
    //Make overlay visible
    overlay.classList.toggle('active');
    return true;
})

// logic for clicking outside the form to make it disappear
overlay.addEventListener('click', function(){
    //Make form visible
    rainbowContainer.classList.toggle('active');
    formContainer.classList.toggle('active');
    //Make overlay visible
    overlay.classList.toggle('active');
    return true;
})

// Upon clicking submit in the form, store form values as variables, then
// create an new book object and append it to the library array
formSubmitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    clearScreen();

    const bookTitleSubmission = document.getElementById('bookTitle');
    const bookAuthorSubmission = document.getElementById('bookAuthor');
    const bookPagesSubmission = document.getElementById('bookPages');
    const bookCoverSubmission = document.getElementById('bookCover');
    const bookReadYesSubmission = document.getElementById('bookReadYes');

    const bookTitle = bookTitleSubmission.value;
    const bookAuthor = bookAuthorSubmission.value;
    const bookPages = bookPagesSubmission.value;
    const bookCover = bookCoverSubmission.value;
    const bookRead = bookReadYesSubmission.checked;
    document.getElementById('formContainer').reset();

    // render our new book to the DOM
    // addBookToDOM(bookTitle, bookAuthor, bookPages, bookCover, bookRead);

    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookCover, bookRead);
    clearBoard();
    
    // we need to write a function that loops through each item in the array of objects and
    // runs addBookToDOM with the object values being the arguments
    library.forEach(book => {
        // console.log(book);
        // console.log(book.book);
        // console.log(book.book.title);
        addBookToDOM(book.title, book.author, book.pages, book.cover, book.read);
    });

    // return the book object so it can be added to the array
    return true;
})