// book class reperent a book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// ui classs handle ui 

class UI {
    static displaybooks() {


        const books = store.getbooks();

        books.forEach((book) => UI.addBookToList(book));

    }

    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class=" btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deletebook(el) {

        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }


    static showalert(message, classname) {


        const div = document.createElement("div");

        div.className = ` alert alert-${classname}`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);


        //DISAPEER AFTER 3 SECONDS

        setTimeout(() => {
            document.querySelector(".alert").remove()

        }, 3000);
    }


    static clearfealds() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
}



//STOREG PART

class store {
    static getbooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addbook(book) {

        const books = store.getbooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removebook(isbn) {

        const books = store.getbooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {

                books.splice(index, 1);

            }
        })
        localStorage.setItem("books", JSON.stringify(books));
    }
}




//display books

document.addEventListener("DOMContentLoaded", UI.displaybooks);


//add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {

    //prevent actual submit
    e.preventDefault();


    //get form value

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;


    //validate

    if (title === '' || author === '' || isbn === '') {
        UI.showalert('please fill out the form', 'danger');

    } else {

        //instatete book
        const book = new Book(title, author, isbn);



        //add book to ui

        UI.addBookToList(book);



        //SHOW SUCCES MESSAGE

        UI.showalert("Aded Successfully", "success");

        //clear fealds

        UI.clearfealds();


        //add book to store

        store.addbook(book);

    }


});


//remove book

document.querySelector("#book-list").addEventListener("click", (e) => {



    //remove book from ui
    UI.deletebook(e.target);

    //remove book from store

    store.removebook(e.target.parentElement.previousElementSibling.textContent);

    //SHOW SUCCES MESSAGE

    UI.showalert("Removed Successfully", "success")
});