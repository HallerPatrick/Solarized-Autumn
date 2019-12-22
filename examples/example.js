import StorageManager from "./storage_manager"

/**
 * The model holds all data relevant for the buisness logic.
 * The data is then represented in the view, mostly by passing it
 * to the view.
 *
 * The model also handles the storaging of this that in a "database",
 * by using the StorageManager class
 *
 */
const Model = () => {

    // eslint-disable-next-line no-undef
    const storageManager = StorageManager()

    // stores books, will be replaced by storage in browser
    const myBooks = storageManager.retrieveBookEntries()

    /**
     *
     * @param {String} title
     * @param {String} author
     * @param {String} isbn
     * @param {String} description
     *
     * @returns {Boolean} True if book was added successfully
     */
    const addBook = (title, author, isbn, description) => {
        var book = {
            title: title,
            isbn: isbn,
            author: author,
            description: description
        }


        if (storageManager.saveBook(book)) {
            myBooks.push(book)
            return true
        }
        return false
    }

    /**
     * Get a book by its ISBN
     *
     * @param {String} isbn ISBN id
     */
    const getBook = (isbn) => {
        const book = storageManager.getBook(isbn)
        storageManager.deleteSessionBook()
        storageManager.saveSessionBook(book)
        return book
    }

    /**
     * Getter for all books
     *
     */
    const getBooks = () => myBooks

    /**
     * Gets the saved book from the session storage, to
     * keep the app more consistent when reloading
     *
     */
    const getSessionBook = () => storageManager.getSessionBook()

    /**
     * Deletes a book by comparing isbn ids, as they are unique
     *
     * @param {String} isbn ISBN id
     */
    const deleteBook = isbn => {
        for (let i = 0; i < myBooks.length; i += 1) {
            if (myBooks[i].isbn === isbn) {
                myBooks.splice(i, 1)
                i -= 1
            }
        }

        storageManager.deleteBook(isbn)

        const sessionBook = storageManager.getSessionBook()

        if (sessionBook) {
            if (sessionBook.isbn === isbn) {
                storageManager.deleteSessionBook()
            }
        }
    }

    // you need this to return the output of functions inside the Model function
    return {
        addBook: addBook,
        getBooks: getBooks,
        deleteBook: deleteBook,
        getBook: getBook,
        getSessionBook: getSessionBook
    }
}

export default Model
