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










/**
 * Controller
 */
const grid = document.querySelector(".grid");

let empty_div = document.createElement("div");
empty_div.innerHTML = "Your Library is currently empty";

function displayEmptyMessage(){

  
    grid.classList.remove("grid");
    grid.classList.add("single-msg-container");

    empty_div.style.fontWeight = 300;

    grid.appendChild(empty_div);
}

function switchDisplayOnFirstBook(){
    if(Array.from(nodes).find(node => node.isEqualNode(nodeToFind))){
        empty_div.remove();
    }
    grid.classList.remove("single-msg-container");
    grid.classList.add("grid");
}

function displayCollection(library_obj){
    
    const collection_arr = library_obj.collection;
    collection_arr.forEach(book_obj => {
        let book_card = document.createElement("div");
        book_card.classList.add("book-card")
        
    });
}
function createBookCard(book_obj){

}

displayEmptyMessage();
let arr = [1,2,3];
let index = arr.findIndex((element) => element === 4);
console.log(index);