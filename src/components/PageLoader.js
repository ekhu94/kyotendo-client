import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Dimmer, Loader, Image } from 'semantic-ui-react';
import pikachuGif from '../assets/icons/loading-pikachu.gif';
import marioBrosGif from '../assets/icons/loading-mario-bros.gif';
import kirbyGif from '../assets/icons/loading-kirby.gif';

const gifs = [pikachuGif, marioBrosGif, kirbyGif];

const PageLoader = () => {
    const [delayed, setDelayed] = useState(false);
    const [gif, setGif] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setDelayed(true);
        }, 7000);

        const idx = Math.floor(Math.random() * 3);
        setGif(gifs[idx]);

        return () => {
            setDelayed(false);
            setGif(null);
        }
    }, []);

    return (
        <div>
            <Dimmer active style={{marginTop: '65px',height: '100vh', minHeight: '100vh'}}>
                {gif ? <Image style={{margin: '0 auto', width: '250px'}} src={gif} alt="loading..." /> : null }
                <h5 style={{letterSpacing: '0.1rem'}} className="text-center">{delayed ? "Sometimes this takes a little while..." : "Loading...Please wait..."}</h5>

                {/* disabled */}
                <Loader disabled size='huge'>{delayed ? "Sometimes this takes a while..." : "Loading...Please wait..."}</Loader>
            </Dimmer>
        </div>
    );
};

export default PageLoader;