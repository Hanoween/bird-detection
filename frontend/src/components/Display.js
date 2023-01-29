import { useState } from "react";

const Display = () => {
    let images = null;
    const [mapURL, setMapURL] = useState(null);
    const [birdURL, setBirdURL] = useState(null);
    const [birdInfo, setBirdInfo] = useState(null);

    const fetchBird = () => {
        fetch(
            "https://en.wikipedia.org/w/api.php?format=json&action=query&titles=Mourning dove&prop=pageimages&format=json&pithumbsize=100&origin=*",
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(json => {
                setBirdURL(json.query.pages[Object.keys(json.query.pages)[0]].thumbnail.source);
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const fetchInfo = () => {
        fetch(
            "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Mourning dove&origin=*"
        )
            .then(response => response.json())
            .then(json => {
                setBirdInfo(json.query.pages[Object.keys(json.query.pages)[0]].extract);
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const getMap = (images) => {
        for (let i = -1; i >= -1 * Object.keys(images).length; i--) {
            if (images[i].title.toLowerCase().includes("range")
                || images[i].title.toLowerCase().includes("carte")
                || images[i].title.toLowerCase().includes("map")
                || images[i].title.toLowerCase().includes("locatie")
                || images[i].title.toLowerCase().includes("globe")
                || images[i].title.toLowerCase().includes("plot")
                || images[i].title.toLowerCase().includes("area")
                || images[i].title.toLowerCase().includes("location")) {
                return images[i].imageinfo[0].url;
            }
        };
    };

    const fetchId = () => {
        fetch(
            "https://www.wikidata.org/w/api.php?format=json&action=wbsearchentities&search=Mourning dove&language=en&origin=*",
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(json => {
                fetchMap(json.search[0].id);
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const fetchMap = (id) => {
        fetch(
            `https://www.wikidata.org/w/api.php?format=json&action=query&prop=imageinfo&iiprop=url&generator=images&titles=${id}&origin=*`,
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(json => {
                images = json.query.pages;
                if (images) {
                    setMapURL(getMap(images));
                };
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    fetchId();
    fetchBird();
    fetchInfo();

    return (
        <div className="display-page">
            <div className="display">
                {birdURL && <img src={birdURL} alt="" />}
                {birdInfo && <div className="info">{birdInfo}</div>}
                {mapURL && <img src={mapURL} alt="" />}
            </div>
        </div>
    );
};

export default Display; 