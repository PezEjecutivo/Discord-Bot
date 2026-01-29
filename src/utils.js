function dateformater() {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formatedDate = `${year}-${month}-${day}`;
    return formatedDate;
}


async function fetchData(theme) {
    const date = dateformater();
    const url = `https://newsapi.org/v2/top-headlines?category=${theme}&from=${date}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("No se pudo conseguir el recurso");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { fetchData };