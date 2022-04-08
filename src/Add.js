import React, {useState} from 'react';

function Add(props) {
    const [disabled, cDisabled] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        cDisabled(true)
        let result
        if (props.currentBook) {
            result = props.client.updateBook(
                props.currentBook._id,
                e.target.title.value,
                e.target.author.value,
                e.target.genre.value,                
                e.target.isbn.value,
                e.target.blurb.value,
                e.target.bookRead.checked
            )
        } else {
            result = props.client.addBook(
                e.target.title.value,
                e.target.author.value,
                e.target.genre.value,                
                e.target.isbn.value,
                e.target.blurb.value,
                e.target.bookRead.checked)
        }
        result
            .then(() => {
                cDisabled(false)
                document.getElementById("addForm").reset()
                props.refreshList()
            })
            .catch(() => {
                alert("an error occured, please try again");
                cDisabled(false);
            });
    }

    return (
        <>
        {props.currentBook ? 'Update' : 'Add'}
        <br />

        <form onSubmit={(e) => submitHandler(e)} id="addForm">
            Title: <br />
            <input
                type="text"
                defaultValue={props.currentBook?.title}
                name="title"
                disabled={disabled}
            />
            <br />
            Author:
            <br />
            <input
                type="text"
                defaultValue={props.currentBook?.author}
                name="author"
                disabled={disabled}
            />
            <br />
            Genre:
            <br />
            <input
                type="text"
                defaultValue={props.currentBook?.genre}
                name="genre"
                disabled={disabled}
            />
            <br />
            ISBN:
            <br />
            <input
                type="text"
                defaultValue={props.currentBook?.isbn}
                name="isbn"
                disabled={disabled}
            />
            <br />
            blurb:
            <br />
            <input
                type="text"
                defaultValue={props.currentBook?.blurb}
                name="blurb"
                disabled={disabled}
            />
            <br />
            Read?:
            <br />            
            <input
                type="checkbox"
                defaultValue={props.currentBook?.bookRead}
                name="bookRead"
                disabled={disabled}
            />
            <br />
            <br />
            <button type="submit" disabled={disabled}>
                {" "}
                Submit{" "}
            </button>

        </form>

        </>
    )
}

export default Add;