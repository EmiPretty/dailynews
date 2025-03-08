export async function getRssFeed(url) {
    let response, xmlText, xmlDoc;

    try {
        response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erreur ${response.status}: ${errorMessage}`);
        }

        xmlText = await response.text();
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlText, "text/xml");

        return parseFeedData(xmlDoc);

    } catch (error) {
        console.error('Problème pour récupérer le flux RSS:', error);
        throw error;
    }
}

function parseFeedData(xmlDoc) {
    let articles = [];
    const items = xmlDoc.querySelectorAll('item');

    items.forEach(item => {
        const title = item.querySelector('title')?.textContent || 'Pas de titre';
        const link = item.querySelector('link')?.textContent || '#';
        const description = item.querySelector('description')?.textContent || 'Pas de description';
        const pubDate = item.querySelector('pubDate')?.textContent || 'Date inconnue';
        const imageUrl = extractImageUrl(item, description);

        const newsItem = {
            title,
            link,
            description,
            pubDate,
            imageUrl
        };

        articles.push(newsItem);
    });

    return articles;
}

function extractImageUrl(item, description) {
    const enclosureUrl = item.querySelector('enclosure')?.getAttribute('url');
    const mediaContentUrl = item.querySelector('media\\:content, content')?.getAttribute('url');
    const mediaThumbnailUrl = item.querySelector('media\\:thumbnail')?.getAttribute('url');
    const imgFromDesc = extractImageFromDescription(description);
    return enclosureUrl || mediaContentUrl || mediaThumbnailUrl || imgFromDesc || null;
}

function extractImageFromDescription(description) {
    const match = description.match(/<img[^>]+src=["'](.*?)["']/);
    return match ? match[1] : null;
}
