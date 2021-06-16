function findAuthorById(authors, id) {
  //looks for the author in the authors array that matches the provided id
  return authors.find((author)=> author.id === id);
}

function findBookById(books, id) {
  //looks for the book in the books array that matches the provided id
  return books.find((book)=> book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //creates two arrays, one for books that have been returned and one for those that haven't
  //returns an array containing the created arrays
  const arr1 = books.filter((book)=> book.borrows[0].returned === false);
  const arr2 = books.filter((book)=> book.borrows[0].returned === true)
  return [arr1, arr2];
}

function getBorrowersForBook({borrows}, accounts) {
  //loops through the given books borrow history
  //locates the matching account and sets that to a new variable
  //adds the extended account information to the result array for each entry in borrows
  let result = [];
  for (let item in borrows){
    const account = accounts.find((account)=> account.id === borrows[item].id);
    result.push({
      ...borrows[item],
      ...account,
    });
  }
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
