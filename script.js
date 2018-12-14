
  
window.onload = function () {
    showBooks();
  };
  
  function getBooks() {
    return data["booklist"];
  }
  
  function showBooks(){

      let productDiv = document.getElementById("products");
    productDiv.innerHTML = `
      ${getBooks().map((book) => `
        <div class="book">
          <img src="${book["book"]["cover"]}" class="book-img" />
          <div class="text-title">
            <h3 class="book-title">${book["book"]["title"]}</h3>
          </div>
          <div class="text-summary">
            <p class="book-summary">${book["book"]["summary"]["text"]}</p>
          </div>
        </div>
        `).join("")}
        </div>
    `
    }
  
  
  
  