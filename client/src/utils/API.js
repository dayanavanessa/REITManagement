import axios from "axios";

export default {
  getRequests: function() {
    return axios.get("/requests")
    // .then(function(response) {
    //   console.log('our resoinse!!!',response);
    // });
  },

 saveRequests: function(requestsData) {
    return axios.post("/newrequest", requestsData);
  },
  newUser: function(newUser){
  	return axios.post("/signup", newUser);
  }
}

 
 


// export default {
//   // Gets all books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
// };