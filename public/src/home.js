function getTotalBooksCount(books) {
    //returns the length of the books array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  //returns the length of the accounts array
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //accumulator tracks each book that is not returned
  //final accumulator value is returned
  return books.reduce((acc, book)=>{
    if (book.borrows[0].returned === false){
      acc++;
    }
    return acc; 
  },0); 
}



function _popularHelper(propArr){
  //helper function that takes in an array of value:value objects and turns it into an array of name:value count:value objects
  //the array is then sorted and sliced
  let resultArr = [];
  for (let item in propArr){
    const name = item;
    const count = propArr[item];
    const newObj = {name, count};
    resultArr.push(newObj)
  }
  resultArr.sort((itemA, itemB) => (itemA.count < itemB.count ? 1 : -1))
  return resultArr.slice(0, 5);
}

function getMostCommonGenres(books) { 
  //creates an array of each genre and it's corresponding count
  //that array is then passed into _popularHelper and the function's formatted array is returned
  const genreArr = books.reduce((acc, {genre})=>{
    if (acc[genre]){
      acc[genre]++;
    } else {
      acc[genre]=1;
    }
    return acc;
  },[]);
  return _popularHelper(genreArr);
}

function getMostPopularBooks(books){
  //creates an array of each book and the number of times it's been borrowed
  //that array is then passed into _popularHelper and the function's formatted array is returned
  const booksArr = books.reduce((acc, {title, borrows})=>{
    acc[title] = borrows.length
    return acc;
  },[]);
  return _popularHelper(booksArr);
}

function getMostPopularAuthors(books, authors) {
  //creates an array of each authorID and it's corresponding count
  //that array is then used to create a new array where the authorID is replaced with the author's name
  //the new array is then passed into _popularHelper and the function's formatted array is returned
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId]+= borrows.length;
    } else {
      acc[authorId] = borrows.length;
    }
    return acc;
  }, {});
  let authorArr = [];
  for (let item in count){
    const {name: {first, last}} = authors.find((author)=> Number(item) === author.id);
    authorArr[`${first} ${last}`] = count[item];
  }
  return _popularHelper(authorArr)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
