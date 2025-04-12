let bookLibrary = [];

const addBookButton = document.querySelector("#add-book");
const cardContainer = document.querySelector(".card-holder");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function clearformfield() {
    document.querySelector("#book-title").value = "";
    document.querySelector("#book-author").value = "";
    document.querySelector("#pagenumber").value = "";
    document.querySelector("#read").checked = false;
}

function updateCardContainer() {
    cardContainer.innerHTML = ""; // Clear existing cards
    bookLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div id="read-container"><p id="read-status" class="toggle-read" card-index="${index}"></p></div>
            <div class="cardBox">
            <h2>${book.title}</h2>
            <p style="font-size: large"><b style="font-weght: 900;">Author:</b> ${book.author}</p>
            <p style="font-size: large"><b style="font-weght: 900;">Pages:</b> ${book.pages}</p>
            </div>
            <button class="remove-book" data-index="${index}">Remove</button>
        `;
        const readStatus = card.querySelector(".toggle-read");
        if (book.read) {
            readStatus.textContent = "Read";
            card.classList.add("read");
        } else {
            readStatus.textContent = "Not Read";
            card.classList.add("not-read");
        }
        cardContainer.appendChild(card); 
    });
    const removeBookButton = document.querySelectorAll(".remove-book");
    removeBookButton.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.stopPropagation();
            const bookIndex = e.target.getAttribute("data-index");
            bookLibrary.splice(bookIndex, 1); // Remove the book from the library
            updateCardContainer();
        });
    });

    const card = document.querySelectorAll(".card");
    card.forEach((card) => {
        card.addEventListener("click", function (e) {
            const cardIndex = e.currentTarget.querySelector(".toggle-read").getAttribute("card-index");
            const readStatus = card.querySelector(".toggle-read");
            if (readStatus.textContent === "Read") {
                readStatus.textContent = "Not Read";
                card.classList.remove("read");
                card.classList.add("not-read");
                bookLibrary[cardIndex].read = false; // Update the book's read status
            } else {
                readStatus.textContent = "Read";
                card.classList.remove("not-read");
                card.classList.add("read");
                bookLibrary[cardIndex].read = true; // Update the book's read status
            }
            
        });
    });
}

addBookButton.addEventListener("click", function (e) {
    // Prevent form submission
    if(e.target.form.checkValidity()){
        const book = new Book(
            document.querySelector("#book-title").value,
            document.querySelector("#book-author").value,
            document.querySelector("#pagenumber").value,
            document.querySelector("#read").checked
        );
        bookLibrary.push(book);
        updateCardContainer();
        e.target.form.reset();
        e.preventDefault(); 
    }else{
        e.target.form.reportValidity();
    }
    
});
