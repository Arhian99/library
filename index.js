




/* Add form validation to form that would not allow users to submit an empty form */
let library = [];
library.push(new Book('./assets/images/harry-potter.jpg', 'Harry Potter and the Sorcerers Stone', 'JK Rowling', 734, true));
library.push(new Book('./assets/images/twilight.jpeg','Twilight', 'Stephanie Meyer', 498, false));
library.push(new Book('./assets/images/iewu.webp', 'It Ends with Us', 'Colleen Hoover', 376, false));
library.push(new Book('./assets/images/wimpy-kid.jpg','Diary of a Wimpy Kid', 'Jeff kinney', 221, true));

let favorites = [];
let readArray = [];


let form = document.querySelector('.newBookForm');
/* let formBtn = document.querySelector('.newBookForm button'); */
let headerAddBookBtn = document.querySelector('#add-btn');
let formCont = document.querySelector('.form-cont');
/* let body = document.querySelector('#body'); */
let newBookFormCancelBtn = document.querySelector('#newBookForm-cancelBtn');
let newBookFormAddBookBtn = document.querySelector('.newBookForm-btns-cont button[type="submit"]');
/* let bookCardDiv = document.querySelector('.book-card'); */
let bookDisplay = document.querySelector('.book-display');


window.addEventListener('load', renderAll());


function createBookCard() {
    let visibleIcon = document.createElement('span');
    visibleIcon.textContent = 'visibility';
    visibleIcon.classList.add('material-symbols-rounded');
    visibleIcon.classList.add('icon');
    visibleIcon.classList.add('vis');

    let deleteIcon = document.createElement('span');
    deleteIcon.textContent = 'delete';
    deleteIcon.classList.add('material-symbols-rounded');
    deleteIcon.classList.add('icon');
    deleteIcon.classList.add('del');

    let favoriteIcon = document.createElement('span');
    favoriteIcon.textContent = 'favorite';
    favoriteIcon.classList.add('material-symbols-rounded');
    favoriteIcon.classList.add('icon');
    favoriteIcon.classList.add('fav');

    let iconContDiv = document.createElement('div');
    iconContDiv.classList.add('icon-cont');

    let bkPages = document.createElement('h2');
    bkPages.classList.add('book-pages');
    bkPages.textContent = `${this.pages} Pages`;

    let btnPlacementDiv = document.createElement('div');
    btnPlacementDiv.classList.add('btn-placement')

    let bkAuthor = document.createElement('h2');
    bkAuthor.classList.add('book-author');
    bkAuthor.textContent = `Author: ${this.author}`;

    let bkTitle = document.createElement('h1');
    bkTitle.classList.add('book-title');
    bkTitle.textContent = this.title;

    let bookInfoDiv = document.createElement('div');
    bookInfoDiv.classList.add('book-info');

    let newImg = document.createElement('img');
    newImg.classList.add('book-cover');
    newImg.setAttribute('alt', 'book cover');
    newImg.setAttribute('src', `${this.cover}`);

    let newCard = document.createElement('div');
    newCard.classList.add('book-card');

    newCard.appendChild(newImg);
    newCard.appendChild(bookInfoDiv);

    bookInfoDiv.appendChild(bkTitle);
    bookInfoDiv.appendChild(bkAuthor);
    bookInfoDiv.appendChild(btnPlacementDiv);

    btnPlacementDiv.appendChild(bkPages);
    btnPlacementDiv.appendChild(iconContDiv);

    iconContDiv.appendChild(favoriteIcon);
    iconContDiv.appendChild(deleteIcon);
    iconContDiv.appendChild(visibleIcon);

    if (this.read == true || this.read == 'true') {
        visibleIcon.textContent = 'visibility_off';
        newCard.id = 'read';
        newImg.style.opacity = '0.5';
        let readContent = document.createElement('h1');
        readContent.innerText = 'READ';
        let readDiv = document.createElement('div');
        readDiv.id = 'read-div';
        readDiv.appendChild(readContent);
        newCard.appendChild(readDiv);
        readArray.push(newCard);
    }

    favoriteIcon.addEventListener('click', event => {
        if(favoriteIcon.id == 'liked') {
            favoriteIcon.removeAttribute('id');
            let currentBook = event.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.book-title').innerText;
            for (let book of favorites) {
                if (book.querySelector('.book-title').innerText == currentBook) {
                    let unfavIndex = favorites.indexOf(book);
                    favorites.splice(unfavIndex, 1);
                    return newCard;
                }
            }
        }
    
        favoriteIcon.id = 'liked';
        let currentBook = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
        favorites.push(currentBook);
        return newCard;
    });

    deleteIcon.addEventListener('click', event => {
        let currentBookName = event.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.book-title').innerText;
        for (let book of library) {
            if (book.title == currentBookName) {
                bookDisplay.removeChild(event.currentTarget.parentNode.parentNode.parentNode.parentNode);
                let deleteIndex = library.indexOf(book)
                library.splice(deleteIndex, 1);
            }
        }

        for (let book of readArray) {
            if (book.querySelector('.book-title').innerText == currentBookName) {
                let unreadIndex = readArray.indexOf(book);
                readArray.splice(unreadIndex, 1);
            }
        }

        for (let book of favorites) {
            if (book.querySelector('.book-title').innerText == currentBookName) {
                let unfavIndex = favorites.indexOf(book);
                favorites.splice(unfavIndex, 1);
            }
        }

    });

    visibleIcon.addEventListener('click', event => {
        let currentBook = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
        let currentBookName = currentBook.querySelector('.book-title').innerText;
        for (let book of library) {
            if (book.title == currentBookName) {

                if (this.read == false || this.read == 'false') {
                    book.toggleRead();                    

                    visibleIcon.textContent = 'visibility_off';
                    newCard.id = 'read';
                    newImg.style.opacity = '0.5';

                    let readContent = document.createElement('h1');
                    readContent.innerText = 'READ';
                    let readDiv = document.createElement('div');
                    readDiv.id = 'read-div';
                    readDiv.appendChild(readContent);
    

                    newCard.appendChild(readDiv);
                    readArray.push(newCard);
                }

                else if(this.read == true || this.read == 'true') {
                    book.toggleRead();   

                    visibleIcon.textContent = 'visibility';
                    newImg.style.opacity = '1';
                    let readDivRef = currentBook.querySelector('#read-div');
                    readDivRef.parentNode.removeChild(readDivRef);
                    newCard.removeAttribute('id');
                    for (let book of readArray) {
                        if (book.querySelector('.book-title').innerText == currentBookName) {
                            let unreadIndex = readArray.indexOf(book);
                            readArray.splice(unreadIndex, 1);
                        }
                    }
        
                }
            }
        }
    })

    return newCard;
}


function Book(cover, title, author, pages, read) {
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (read == true) {
            let readInfo = 'read';
        }
        else if (read == false) {
            readInfo = 'not read yet';
        }
        return `${title} by ${author}, ${pages} pages, ${readInfo}`
    }
    this.toggleRead = function() {
        if (this.read == true) {
            return this.read = false;
        }

        else return this.read = true;
    }
}


function createBook() {
    let cover = this[0]
    let title = this[1];
    let author = this[2];
    let pages = this[3];
    let read = this[4];
    let newBook = new Book(cover, title, author, pages, read);
    library.push(newBook);
}

form.addEventListener('submit', event => {
    event.preventDefault();

    let userFormData = new FormData(form);
    let userArray = [];
    for (let value of userFormData.values()) {
        if (value instanceof Blob) {
            userArray.push(URL.createObjectURL(value))
        }

        else userArray.push(value);
    }

    createBook.apply(userArray, userArray);

    renderNew();

    form.reset();

});

headerAddBookBtn.addEventListener('click', () => {
    formCont.style.display = 'flex';
});

newBookFormCancelBtn.addEventListener('click', () => {
    formCont.style.display = 'none';
})

newBookFormAddBookBtn.addEventListener('click', event => {
    formCont.style.display = 'none';
})


function renderAll() {
    if (library.length > 0) {
        for (let book of library) {
            let newBook = createBookCard.apply(book);
            bookDisplay.append(newBook);
        }
    }
    else alert('Library Is Empty. Would you like to add some books?');
}

function renderNew() {
    if (library.length > 0) {
        let newBook = createBookCard.apply(library[library.length - 1]);
        bookDisplay.append(newBook);
    }

    else alert('Library Is Empty. Would you like to add some books?');
}




/* On READ ME:

Lists button does NOT work: on implementation include drop down menu including 'read' 'unread' and 'favorites' lists
Trash icon --> add 'Are you sure you want to remove this book from library?' message when clicked
add memory such that state of library array (books added or removed) is kept even after user refresh page
make 'recently deleted' array and add deleted books to recently deleted array

the code should be cleaned up and make it easier to follow along, the books in the favorites and readArray arrays are passed as nodes, they should be passed as objects
*/