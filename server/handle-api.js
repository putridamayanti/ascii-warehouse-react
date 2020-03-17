const faces = require('cool-ascii-faces').faces;

function getUrlSearchParam(url, s) {
    const allQueries = url.slice(1).split('&');
    let val = '';

    allQueries.forEach((query) => {
        if (query.indexOf(s) !== -1) {
            val = query.split('=')[1];
        }
    });

    return val;
}

function getRandomString () {
    return (Math.random()).toString(36).substr(2);
}

function getRandomInRange (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getQueryParam(url) {
    let params = {};
    const queries = url.split('?');
    if (queries) {
        const allParams = queries[1].split('&');

        allParams.forEach(item => {
            let split = item.split('=');
            params[split[0]] = split[1];
        });
    }

    return params;
}

function createFacesItem(i, sort) {
    var item = {
        id: i + '-' + getRandomString(),
        size: getRandomInRange(12, 40),
        price: getRandomInRange(1, 1000),
        face: faces[i % faces.length],
        date: new Date(Date.now() - getRandomInRange(1, 1000 * 3600 * 24 * 15)).toString()
    };

    if (sort === 'size') {
        item.size = Math.min(42, 12 + Math.floor(i * 0.05));
    } else if (sort === 'price') {
        item.price = Math.min(1000, Math.floor(i * 0.1)+1);
    }

    return item;
}

module.exports = (req, res, next) => {
    if (req.url.indexOf('api') !== -1) {
        const params = getQueryParam(req.url);
        const data = { products: [] };

        if (params.skip && params.skip < 10) {
            for (let i = 0; i < params.limit; i++) {
                data.products.push(createFacesItem(i+params.skip, params.sort));
            }
        }

        res.writeHead(200, {
            'Content-Type': 'application/x-json-stream'
        });
        res.write(JSON.stringify(data.products));
        res.end();
    } else {
        next();
    }

};
