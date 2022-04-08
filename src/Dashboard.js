import React, {useState, useEffect} from 'react'
import Add from './Add.js'

function Dashboard(props) {
    const [books, cBooks] = useState([])
    const [current, cCurrent] = useState(undefined)

    const refreshList = () => {
        props.client.getBooks().then((response) => cBooks(response.data))
    }

    const removeBook = (_id) => {
        props.client.removeBook(_id).then(() => refreshList())
    }

    const updateBook = (bookToUpdate) => {
        cCurrent(bookToUpdate)
    }

    useEffect( () => {
        refreshList()
    }, [])

    const buildrows = () => {
        return books.map( (current) => {
            return (
                <tr key={current._id}>
                    <td>{current.title}</td>
                    <td>{current.author}</td>
                    <td>{current.genre}</td>
                    <td>{current.isbn}</td>
                    <td>{current.bookRead.toString()}</td>
                    <td>
                        <button onClick={() => removeBook(current._id) }>remove</button> 
                        <button onClick={() => updateBook(current) }>update</button> 
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            Book Collection
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>ISBN</th>
                        <th>Read?</th>                    
                    </tr>
                </thead>
                <tbody>{buildrows()}</tbody>
            </table>
            <br />
            <br />
            <Add
                client={props.client}
                refreshList={() => {
                    refreshList()
                    cCurrent(undefined)
                }}
                currentBook={current}
            />
        
        </>
    )




}

export default Dashboard;