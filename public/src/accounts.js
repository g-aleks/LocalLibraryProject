
function findAccountById(accounts, id) { 
  //looks for the account in the accounts array that matches the provided id
  return accounts.find((account)=> account.id === id);
}

function sortAccountsByLastName(accounts) {
  //sorts the accounts array alphabetically using each account's last name
  return accounts.sort((accA, accB)=> accA.name.last > accB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows({id}, books) {
  //loops through books and creates an array of each books' borrow history
  //checks to see if each 'borrow' equals the provided id and adds one to the counter if so
  let counter = 0;
  for (let book in books){
    const borrowed = books[book].borrows
    for (let item in borrowed){
      if (borrowed[item].id === id){
        counter++;
      }
    }
  }
  return counter;
}

// old function (needed to implement .map() somewhere)
  // function getBooksPossessedByAccount(account, books, authors) { 
  //   let checkedOut = books.filter((book)=> book.borrows[0].returned === false);
  //   let checkedOutByAccount = checkedOut.filter((book)=> book.borrows[0].id === account.id);
  //   for (let book in checkedOutByAccount){
  //     checkedOutByAccount[book].author = authors.find((author)=> author.id === checkedOutByAccount[book].authorId);
  //   }
  //   return checkedOutByAccount;
  // }

function getBooksPossessedByAccount(account, books, authors) {
  //filters through each book in books
  //checks to see if the most recent 'borrow' has been returned
  //returns a new array of each possessed book including new author variable set to the matching author
  return (books.filter((book) => book.borrows[0].id === account.id && !book.borrows[0].returned)
      .map((book) => {book["author"] = authors.find((author) => author.id === book.authorId);
        return book;
      })
  );
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
