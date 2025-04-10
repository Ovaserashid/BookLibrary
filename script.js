let bookLibrary = [];

const addBookButton = document.querySelector("#add-book");

const cardContainer = document.querySelector(".card-holder");


addBookButton.addEventListener("click", function () {
    const card = document.createElement("div");
    card.classList.add("card");
    cardContainer.appendChild(card);
});