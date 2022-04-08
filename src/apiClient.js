import axios from 'axios';
const url = "http://localhost:3000/books"

export class ApiClient {
    apiCall(method, url, data) {
        return axios({
            method,
            url,
            data,
        }).catch((error) => {
            throw error;
        })
    }
    getBooks() {
        return this.apiCall("get", url)        
    }

    addBook(title, author, genre, isbn, blurb, bookRead) {
        return this.apiCall("post", `${url}/create`, { title, author, genre, isbn, blurb, bookRead })
    }

    removeBook(_id) {
        return this.apiCall("delete", `${url}/${_id}`)
    }

    updateBook(_id, title, author, genre, isbn, blurb, bookRead) {
        console.log(_id)
        return this.apiCall("put", `${url}/${_id}`, { title, author, genre, isbn, blurb, bookRead })
    }

}

