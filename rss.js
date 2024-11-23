document.addEventListener("DOMContentLoaded", function () {
    fetch("rss.xml") 
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            const items = xmlDoc.getElementsByTagName("item");
            let feedContent = "";

            for (let i = 0; i < items.length; i++) {
                const title = items[i].getElementsByTagName("title")[0].textContent;
                const link = items[i].getElementsByTagName("link")[0].textContent;
                const description = items[i].getElementsByTagName("description")[0].textContent;

                feedContent += `
                    <article>
                        <h3><a href="${link}" target="_blank">${title}</a></h3>
                        <p>${description}</p>
                    </article>
                `;
            }

            document.getElementById("feed-container").innerHTML = feedContent;
        })
        .catch(error => console.error("Error al cargar el feed:", error));
});
