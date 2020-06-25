import React from 'react';

const Location = ({ city, weatherDescript }) => {
    return <h3>{`${city} is having ${weatherDescript}`}</h3>;
}



const Image = ({ image, imageLocation, imageDescript }) => {
    return (
        <div className="mt-1 container" > 
            <img id="img" src={image} alt={`Unsplash: ${image}`} />
            <h5 className="mt-2">{imageLocation ? imageLocation : imageDescript }</h5>
        </div>
    )
}

function MainPanel({ city, weatherType, weatherDescript, imageUrl, imageLocation, imageDescript }) {
    return (
        <React.Fragment>
            <Location city={city} weatherType={weatherType} weatherDescript={weatherDescript}/>
            <Image image={imageUrl} imageLocation={imageLocation} imageDescript={imageDescript} />
        </React.Fragment>
    )
}

export default MainPanel;