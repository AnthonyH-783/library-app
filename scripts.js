/**
 * Global Variables
 */
const grid = document.querySelector(".grid");
let empty_div = document.createElement("div");
empty_div.innerHTML = "Your Library is currently empty";
const add_button = document.getElementById("add-button");



/**
 * Backend
 */

const book_library = {
    size: 0,
    collection : [],
    addBook: function(author, title, num_pages, is_read, image_url){
        const book = new Book(author, title, num_pages, is_read, image_url);
        this.collection.push(book);
        this.size++;
    },
    removeBook: function(book_id){

        const index = this.collection.findIndex((element) => element.book_id === book_id);
        if(index === -1){
            alert("Error: The book you wish to remove does not exist");
        }
        else{
            this.collection.splice(index, 1);
            this.size--;
        }
    },
};

// Book Constructor
function Book(author, title, num_pages, is_read, image_url){
    if(!new.target){
        console.error("You missed the new operator when creating an object");
    }
    this.book_id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.num_pages = num_pages;
    this.is_read = is_read;
    this.image_url = image_url;
}

// Book Object to frontend div conversion
function addBookToHTML(book_obj){
    // Creating required nodes
    let div = document.createElement("div");
    let img = document.createElement("img");
    let span = document.createElement("span");

    // Styling the nodes
    div.classList.add("grid-item");
    img.classList.add("book-img");
    span.classList.add("remove-span");
    span.innerText = "Remove";

    // Adding book image
    if(book_obj.image_url !== null){
        img.src = book_obj.image_url;
    }
    else{
        img.src = "images/no-image-icon.png";
    }

    // Creating link between image and span
    span.dataset.book_id = book_obj.book_id;

    // Making DOM connections
    div.appendChild(img);
    div.appendChild(span);
    grid.appendChild(div);

}

function removeBook(evt){

    if(evt.target.nodeName === "SPAN"){

        let book_id = evt.target.dataset.book_id;
        evt.target.parentNode.remove();
        book_library.removeBook(book_id);

        if(book_library.size === 0){
            displayEmptyMessage();
        }
    }
}

function createModalForm(){

    
}

function promptBookInfo(){

}

// Display Library
function displayLibrary(book_library){

    if(book_library.size === 0){
        displayEmptyMessage();
    }
    else if(grid.classList.contains("single-msg-container")){
        switchDisplayToGrid();

    }

    book_library.collection.forEach((book) => {
        addBookToHTML(book);
    });
}

// Creating Book and html element

book_library.addBook("Dan Koe", "The Art of Focus", 400, false, null);
book_library.addBook("Dan Koe", "The Art of Focus", 400, false, null);
book_library.addBook("Dan Koe", "The Art of Focus", 400, false, null);
book_library.addBook("Dan Koe", "The Art of Focus", 400, false, null);
book_library.addBook("Dan Koe", "The Art of Focus", 400, false, null);
book_library.addBook("Dan Koe", "The Art of Focus", 400, false, null);
book_library.addBook("Dan Koe", "The Art of Focus", 400, false, null);
displayLibrary(book_library);








/**
 * Controller
 */


function displayEmptyMessage(){

  
    grid.classList.remove("grid");
    grid.classList.add("single-msg-container");

    empty_div.style.fontWeight = 300;

    grid.appendChild(empty_div);
}

function switchDisplayToGrid(){

    grid.classList.remove("single-msg-container");
    grid.classList.add("grid");
}

grid.addEventListener("click", removeBook);




if(book_library.size === 0){
    displayEmptyMessage();
}


