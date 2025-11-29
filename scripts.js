
// Book Class

class Book{

    constructor(author,title, num_pages, is_read, image_url){
        if(!new.target){
            console.error("You missed the new operator at object creation");
        }
        this.book_id = crypto.randomUUID();
        this.author = author;
        this.title = title;
        this.num_pages = num_pages;
        this.is_read = is_read;
        this.image_url = image_url;
    }

}

// Book Library Class

class BookLibrary{
    // Field Variables
    #size;
    #collection;

    // Constructor
    constructor(size, collection){
        // Parameter Validation
        if(!size || !collection){
            this.#size = 0;
            this.#collection = new Array();
            return;
        }
        if(!Array.isArray(collection) || size !== collection.length){
            console.error("Invalid parameters");
            return;
        }
        if(!this.#validateItemsInCollection){
            console.error("The collection contains non-valid items");
            return;
        }
    
        this.#size = size;
        this.#collection = collection;
        

    }
    // Methods
    // Getters and Setters
    get collection(){
        return this.#collection;
    }
    get size(){
        return this.#size;
    }


    //Validation
    #validateItemsInCollection(collection){

        for(const item of collection){
            if(!item instanceof Book){
                return false;
            }
        }
        return true;
    }

    addBook(author, title, num_pages, is_read, image_url){
        const book = new Book(author, title, num_pages, is_read, image_url);
        this.#collection.push(book);
        this.#size++;
        return book;
    }
    removeBook(book_id){

        const index = this.#collection.findIndex((element) => element.book_id === book_id);
        if(index === -1){
            alert("Error: The book you wish to remove does not exist");
        }
        else{
            this.#collection.splice(index, 1);
            this.#size--;
        }
    }
    findBook(book_id){
        const book = this.#collection.find((book) => book.book_id === book_id);
        return book;
    }
    findMostRecent(){
        return this.#collection[size - 1];
    }

}

// Form Handler Class

class FormHandler{

    constructor(form){
        this.form = form;
        this.input_list = form.querySelectorAll("input");
    }
    collectFormData(){
        const dataset = {};
        this.input_list.forEach((input) => {
            let val = input.value;
            if(input.value === ""){
                val = null;
            }
            if(input.id === "checkbox"){
                val = input.checked;
            }
            if(input.value === undefined){
                val = null;
            }
            dataset[input.name] = val;
        } );
        this.form.reset();
        return dataset;
    }

}

class BookDom{

    constructor(book_obj){
        // Creating required nodes
        const div = document.createElement("div");
        const img = document.createElement("img");
        const span = document.createElement("span");

        // Styling the nodes
        div.classList.add("grid-item");
        img.classList.add("book-img");
        span.classList.add("remove-span");
        span.innerText = "Remove";

        // Creating link between image and span
        span.dataset.book_id = book_obj.book_id;
        img.dataset.book_id = book_obj.book_id;

        // Making DOM connections
        div.appendChild(img);
        div.appendChild(span);
        return div;
    }
}



(function DisplayController(){

    // Instantiating a Library
    const library = new BookLibrary();

    // Caching the DOM

    // Big Containers
    const body = document.querySelector("body");
    const main = body.querySelector("#main");
    const add_card = body.querySelector("#add-card");
    const info_card = body.querySelector("#info-card");

    // Buttons
    const add_btn = main.querySelector("#open-modal");
    const form_submit_btn = add_card.querySelector("#form-submit");
    const cancel_btn = add_card.querySelector("#cancel-form");
    const close_info =info_card.querySelector("#close-book-info");

    // Smaller Containers
    const form = add_card.querySelector("form");
    const modal = body.querySelector(".modal");
    const overlay = body.querySelector(".overlay");
    const grid = main.querySelector(".grid");
    let empty_div = document.createElement("div");
    empty_div.innerHTML = "Your Library is currently empty";
    const info = Array.from(info_card.children[0].children).slice(1,5);

    // Initial render

    displayLibrary();


    // Event Listeners
    grid.addEventListener("click", removeBook);
    grid.addEventListener("click", showBookInfo);
    add_btn.addEventListener("click", addBookHandler);
    form_submit_btn.addEventListener("click", formSubmissionHandler);
    cancel_btn.addEventListener("click", cancelInputForm);
    close_info.addEventListener("click", closeInfoCard);

    // Utility Functions
    function isGridEmpty(){
        return grid.classList.contains("single-msg-container");
    }
    function switchDisplayToGrid(){
        // Switches empty view to book grid
        if(isGridEmpty()){
            empty_div.remove();
            grid.classList.remove("single-msg-container");
            grid.classList.add("grid");
        }

    }
    function displayEmptyMessage(){
        // Shows that no books are present in the library
        grid.classList.remove("grid");
        grid.classList.add("single-msg-container");
        empty_div.style.fontWeight = 300;
        grid.appendChild(empty_div);
    }
    function displayLibrary(){
    
        if(library.size === 0){
            displayEmptyMessage();
        }
        else if(grid.classList.contains("single-msg-container")){
            switchDisplayToGrid();

        }
        library.collection.forEach((book) => {
            addBookToHTML(book);
        });
    }


    // DOM Functions
    function addBookToHTML(book){
        if(isGridEmpty()){
            switchDisplayToGrid();
        }
        // Create grid item
        const book_div = new BookDom(book);
        // Setting image
        const img = book_div.querySelector("img");
        const NO_IMG = "images/no-image-icon.png";
        img.src = (book.image_url !== null) ? book.image_url : NO_IMG;

        // Adding book to grid
        grid.appendChild(book_div);
    }

    function addBook(){
        const form_handler = new FormHandler(form);
        const dataset = form_handler.collectFormData();
        const book = library.addBook(dataset.author, dataset.title, dataset.num_pages,
                                        dataset.is_read,dataset.image_url);
        addBookToHTML(book);
    }

    function removeBook(event){

        if(event.target.nodeName !== "SPAN") return;
        // When target element is a span
        const book_id = event.target.dataset.book_id;
        event.target.parentNode.remove(); // removing book div from grid
        library.removeBook(book_id); // removing book from library

        if(library.size === 0){
            displayEmptyMessage();
        }
    }
    function cancelInputForm(){
        form.reset();
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }
    function addBookHandler(){
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }
    function formSubmissionHandler(event){
        event.preventDefault();
        addBook();
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }

    function closeInfoCard(){

        for(node of info){
            node.innerHTML = node.innerHTML.split(":")[0] + ":";
        }        
        info_card.classList.add("hidden");
        overlay.classList.add("hidden");  
    }
    function showBookInfo(evt){

        if(evt.target.nodeName !== "IMG") return;

        const book = library.findBook(evt.target.dataset.book_id);
        const idx_map = {0: "author", 1: "title", 2: "num_pages", 3: "is_read"};
        for(let i = 0; i < info.length; i++){
            let value = book[idx_map[i]]; // one of {author,title,num_pages, is_read}
           
            if(typeof(value) === "boolean"){
                value = (value) ? "yes":"no";
            }
            info[i].innerHTML += " " + value;
        }
        info_card.classList.remove("hidden");
        overlay.classList.remove("hidden");
            
        
    }

})();
/** 
// Book Object to frontend div conversion
function addBookToHTML(book_obj){
    // Check for empty display
    if(grid.classList.contains("single-msg-container")){
        switchDisplayToGrid();
        
    }
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
    img.dataset.book_id = book_obj.book_id;

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

const open_modal_btn = document.querySelector("#open-modal");
const close_modal_btn = document.querySelector("#close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

function openModal(){
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

open_modal_btn.addEventListener("click", openModal);


function closeModal(e){
    e.preventDefault();
    const dataset = collectFormData();
    const book_id = book_library.addBook(dataset.author, dataset.title, dataset.num_pages, dataset.is_read,dataset.image_url);
    addBookToHTML(book_library.findBook(book_id));
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}
function collectFormData(){
    const dataset = {};
    const input_list = Array.from(document.querySelectorAll("form input"));
    input_list.forEach((input) => {
        let val = input.value;
        if(input.value === ""){
            val = null;
        }
        if(input.id === "checkbox"){
            val = input.checked;
        }
        if(input.value === undefined){
            val = null;
        }
        dataset[input.name] = val;
    } );
    document.querySelector("form").reset();
    return dataset;
}


close_modal_btn.addEventListener("click", closeModal);


function cancelInputForm(){
    document.querySelector("form").reset();
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
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
document.getElementById("cancel-form").addEventListener("click", cancelInputForm);








function displayEmptyMessage(){

  
    grid.classList.remove("grid");
    grid.classList.add("single-msg-container");

    empty_div.style.fontWeight = 300;

    grid.appendChild(empty_div);
}

function switchDisplayToGrid(){
    empty_div.remove();
    grid.classList.remove("single-msg-container");
    grid.classList.add("grid");
}

grid.addEventListener("click", removeBook);
const info = document.getElementById("info-card");
const collection = Array.from(info.children[0].children).slice(1,5);
function resetInfoCard(){

    for(node of collection){
        node.innerHTML = node.innerHTML.split(":")[0] + ":";
    }        
    document.querySelector("#info-card").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");  
}
function showBookInfo(evt){

    if(evt.target.nodeName === "IMG"){
        const book = book_library.findBook(evt.target.dataset.book_id);
    
        
        const idx_map = {0: "author", 1: "title", 2: "num_pages", 3: "is_read"};
        for(let i = 0; i < collection.length; i++){
            let value = book[idx_map[i]]; // one of {author,title,num_pages, is_read}
            if(typeof(value) === "boolean"){
                value = (value) ? "yes":"no";
            }
            collection[i].innerHTML += " " + value;
        }
        document.querySelector("#info-card").classList.remove("hidden");
        document.querySelector(".overlay").classList.remove("hidden");
        
    }
}

grid.addEventListener("click", showBookInfo);
document.getElementById("close-book-info").addEventListener("click", resetInfoCard);



*/