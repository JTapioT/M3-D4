window.onload = () => {
  let shoppingCart = document.querySelector(".shoppingCart");
  let booksContainer = document.querySelector(".booksContainer");

  let skippedBooks = [];

  function addToBooksList(book, index) {
    let colDivElement = document.createElement("div");
    colDivElement.classList.add("col-3");
    colDivElement.classList.add("mb-3");

    let cardDivElement = document.createElement("div");
    cardDivElement.classList.add("card");
    cardDivElement.id = index;

    cardDivElement.innerHTML = `
        <div style="height: 300px;">
        <img src=${book.img} class="img-fluid" style="width: 100%; height: 100%">
        </div>
        <div class="d-flex flex-column px-1 justify-content-between" style="height: 180px;">
        <h6 class="card-title m-0 mt-2" style="display: -webkit-box;
        -webkit-box-orient: vertical;  
        -webkit-line-clamp: 1;
        overflow: hidden;">${book.title}</h6>
        <p class="card-text m-0">${book.price}$</p>
        <div>
        <a href="#" class="btn btn-primary btn-cart w-100">ADD TO CART</a>
        <a href="#" class="btn btn-warning mt-2 mb-2 w-100">Skip this book</a>
        </div>`;

    colDivElement.appendChild(cardDivElement);
    booksContainer.appendChild(colDivElement);
  }

  function addToCartList(bookId, booksList) {
    let cartContainer = document.querySelector(".cartContainer");

    let bookInfo = document.createElement("div");
    bookInfo.id = bookId;
    bookInfo.classList.add("cartCard");
    bookInfo.className =
      "d-flex justify-content-between align-items-center mb-3";
    bookInfo.innerHTML = `
          <img src=${booksList[bookId].img} class="img-fluid" style="width: 60px; object-fit: cover;">
          <h6 class="card-title m-0 p-0" style=" display: -webkit-box;-webkit-line-clamp:1 ;-webkit-box-orient: vertical; overflow: hidden;">${booksList[bookId].title}</h6>
          <p class="card-text m-0 p-0">${booksList[bookId].price}$</p>
          <i class="bi bi-exclamation-octagon removeFromCart" style="font-size: 40px; color:red; cursor: pointer;"></i>
        `;
    cartContainer.appendChild(bookInfo);
  }

  function listBooks(booksList) {
    // EXERCISE 2 - .forEach:
    booksList.forEach((book, index) => {
      addToBooksList(book, index);
    });

    // HANDLER FOR SKIP BUTTON:
    let skipButtonNodeList = document.querySelectorAll(".btn-warning");
    let skipButtonsArray = Array.from(skipButtonNodeList);
    skipButtonsArray.forEach((button) => {
      button.addEventListener("click", (event) => {
        // Picked yesterday from one student's example. Quite interesting and neat way to traverse(?) HTML structure until element found.
        let cardElement = event.target.closest(".card");
        // Add skipped book to list:
        cardElement.classList.add("d-none");
        skippedBooks.push(cardElement);
        // Make button "show skipped books" visible: 
        let skippedBtn = document.querySelector(".skippedBtn");
        skippedBtn.classList.remove("d-none");

        skippedBtn.addEventListener("click", () => {
          skippedBooks.forEach(book => {
            book.classList.remove("d-none");
            booksContainer.insertBefore(book, booksContainer.firstElementChild);
          })
        })
      });
    });

    // HANDLER FOR ADD TO CART BUTTON:
    let addToCartButtonNodeList = document.querySelectorAll(".btn-cart");
    let addToCartButtonArray = Array.from(addToCartButtonNodeList);
    let cartBooks = [];
    addToCartButtonArray.forEach((button) => {
      button.addEventListener("click", (event) => {
        // Change shopping cart image:
        shoppingCart.src = "./assets/fullcart.png";
        // Add information to the shopping cart body:
        let bookId = event.target.closest(".card").id;

        addToCartList(bookId, booksList);

        // HANDLER FOR REMOVAL FROM CART MODAL:
        let removeFromCartIcon = document.querySelectorAll(".removeFromCart");
        removeFromCartIcon.forEach((removeIcon) => {
          removeIcon.addEventListener("click", (event) => {
            console.log(event.target.parentElement.id);
            // Remove the book from list
            // Change cart image to empty if needed
            // Are comments considered as HTML content??
            // innerHTML === "" => Does not work here.
            event.target.parentElement.remove();
            if(document.querySelector(".cartContainer").innerText == "") {
              shoppingCart.src = "./assets/shoppingcart.png";
            }
          });
        });

      });
    });

  }

  // EXERCISE 1:
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then(listBooks);
};
