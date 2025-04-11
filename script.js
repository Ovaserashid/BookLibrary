let bookLibrary = [];

const addBookButton = document.querySelector("#add-book");

const cardContainer = document.querySelector(".card-holder");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function updateCardContainer() {
    cardContainer.innerHTML = ""; // Clear existing cards
    bookLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="cardBox">
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            </div>
            <br>
            <button class="remove-book" data-index="${index}">Remove Book</button>
        `;
        cardContainer.appendChild(card); 
    });
    const removeBookButton = document.querySelectorAll(".remove-book");
    removeBookButton.forEach((button) => {
        button.addEventListener("click", function (e) {
            const bookIndex = e.target.getAttribute("data-index");
            bookLibrary.splice(bookIndex, 1); // Remove the book from the library
            updateCardContainer();
        });
    });
}

addBookButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    const book = new Book(
        document.querySelector("#book-title").value,
        document.querySelector("#book-author").value,
        document.querySelector("#pagenumber").value,
        document.querySelector("#read").checked
    );
    bookLibrary.push(book);
    updateCardContainer();
});
