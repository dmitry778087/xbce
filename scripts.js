const getPoems = async () => {
    const url = "https://poetrydb.org/title";
    const response = await fetch(url);    
    if (response.status !== 200) {
        throw new Error('Oops... Something went wrong :(');
    }
    const poems = await response.json();
    if (poems.titles === undefined) {
        throw new Error('Oops... Something went wrong :(');
    }
    return poems.titles;
}

const selectTitle = async (titles) => {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const url = "https://poetrydb.org/title/" + encodeURIComponent(title);
    const response = await fetch(url);    
    if (response.status !== 200) {        
        throw new Error('Oops... Something went wrong :(');        
    }
    const poem = await response.json();
    if (poem[0] === undefined || (poem[0].lines.length > 42 && poem[0].lines.length >= 4)) {
        return selectTitle(titles);
    } else {
        return poem[0];
    }
}

const displayPoem = async () => {
    try {
        const titles = await getPoems();
        const poem = await selectTitle(titles);
        
        const titleElement = document.querySelector(".title");
        const authorElement = document.querySelector(".author");
        const versesElement = document.querySelector(".verses");
        
        titleElement.textContent = poem.title;
        authorElement.textContent = `by ${poem.author}`;
        versesElement.innerHTML = poem.lines.join("<br>");
    } catch (err) {
        console.error(err.message);
        document.querySelector(".verses").textContent = "Failed to load poem. Please try again.";
    }
}

// Load a poem when the page loads
document.addEventListener("DOMContentLoaded", displayPoem);

// Load a new poem when the button is clicked
document.getElementById("refresh-btn").addEventListener("click", displayPoem);