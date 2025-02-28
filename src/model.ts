import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");
// db.query("create table user (user_id int not null primary key, email text, password text)").run()
const getBooks = () => {
    try {
        const books = db.query("select * from book")
        return books.all()
    } catch (error) {
        console.log(error);
        return []
    }
}

const getBook = (id: number) => {
    try {
        const books = db.query("select * from book where book_id = $id")
        return books.get({
            $id: id
        })
    } catch (error) {
        console.log(error);
        return []
    }
}

const createBook = (book: object) => {
    try {
        const query = db.query("insert into book values ($book_id,$book_name,$author)")

        return query.run({
            $book_id: book.book_id,
            $book_name: book.book_name,
            $author: book.author,
        })
    } catch (error) {
        console.log(error);
        return []
    }
}

const createUser = (user: object) => {
    try {
        const query = db.query("insert into user values ($user_id,$email,$password)")

        return query.run({
            $user_id: user.user_id,
            $email: user.email,
            $password: user.password
        })
    } catch (error) {
        console.log(error);
        return []
    }
}

const getUser = (user: object) => {
    try {
        const query = db.query("select * from user where email=$email and password=$password")

        const checkUser = query.get({
            $email: user.email,
            $password: user.password
        })
        if (!checkUser) {
            throw new Error("User Not Found!")

        }
        return {
            loggedIn: true
        }
    } catch (error) {
        console.log(error);
        return {
            loggedIn: false
        }
    }
}

const updateBook = (id: number, book: object) => {
    try {
        const query = db.query("update book set book_name = $book_name, author = $author where book_id = $book_id")

        return query.run({
            $book_id: id,
            $book_name: book.book_name,
            $author: book.author,
        })
    } catch (error) {
        console.log(error);
        return []
    }
}
const deleteBook = (id: number) => {
    try {
        const books = db.query("delete from book where book_id = $id")
        return books.run({
            $id: id
        })
    } catch (error) {
        console.log(error);
        return []
    }
}
// createBook({
//     book_id: 1,
//     book_name: "Book1",
//     author: "Pornput"
// })
// createBook({
//     book_id: 2,
//     book_name: "Book2",
//     author: "Pornput"
// })
// createBook({
//     book_id: 3,
//     book_name: "Book3",
//     author: "Pornput"
// })
// createUser({
//     user_id: 1,
//     email: "example@mail.com",
//     password: "1234"
// })

console.log(getUser({
    email: "example@mail.com",
    password: "12"
}));

export {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    getBook,
    createUser,
    getUser
}