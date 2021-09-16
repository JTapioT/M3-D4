window.onload = () => {

  let booksContainer = document.querySelector(".booksContainer");
  let cartContainer = document.querySelector(".cartContainer");

  function listBooks(booksList) {
    // EXERCISE 2 - .forEach:
    booksList.forEach((book) => {
      let colDivElement = document.createElement("div");
      colDivElement.classList.add("col-4");

      let cardDivElement = document.createElement("div");
      cardDivElement.classList.add("card");

      cardDivElement.innerHTML = `
        <img src=${book.img} class="" alt="..." style="width: 100%; object-fit:cover;>
        <div class="card-body">
        <h6 class="card-title mt-2">${book.title}</h6>
        <p class="card-text">${book.price}$</p>
        <a href="#" class="btn btn-primary btn-cart">ADD TO CART</a>
        <a href="#" class="btn btn-warning">Skip this book</a>`;

      colDivElement.appendChild(cardDivElement);
      booksContainer.appendChild(colDivElement);
    });

    // HANDLER FOR SKIP BUTTON:
    let skipButtonNodeList = document.querySelectorAll(".btn-warning");
    let skipButtonsArray = Array.from(skipButtonNodeList);
    skipButtonsArray.forEach((button) => {
      button.addEventListener("click", (event) => {
        // Picked yesterday from one student's example. Quite interesting and neat way to traverse(?) HTML structure until element found.
        let cardElement = event.target.closest(".card");
        cardElement.classList.add("d-none");
      })
    })

    // HANDLER FOR ADD TO CART BUTTON:
    let addToCartButtonNodeList = document.querySelectorAll(".btn-cart");
    let addToCartButtonArray = Array.from(addToCartButtonNodeList);
    addToCartButtonArray.forEach((button) => {
      button.addEventListener("click", (event) => {
        // Make content such as title and cards visible:
        // Rename better later the contentContainer...
        let cartContentContainer = document.querySelector(".cartContent");
        cartContentContainer.classList.remove("d-none");

        let colDivElement = document.createElement("div");
        colDivElement.classList.add("col-4");

        let cardElement = event.target.closest(".card");
        colDivElement.appendChild(cardElement);

        cartContainer.appendChild(colDivElement);

        cardElement.style.background = "grey";
      })
    })
  }

  // EXERCISE 1:
  fetch("https://striveschool-api.herokuapp.com/books")
  .then(response => response.json())
  .then(listBooks);

}
