const BASE_URL = "http://localhost:3000";

export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    const users = await res.json();
    // const mappedData = data.map((element) => {

    // })
    return users;
}

export const getBooks = async () => {
    const res = await fetch(`${BASE_URL}/books`);
    const data = await res.json();
    // const mappedData = data.map((element) => {

    // })
    return data;
}