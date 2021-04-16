import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Dimmer, Loader, Image } from 'semantic-ui-react';
import pikachuGif from '../assets/icons/loading-pikachu.gif';


const PageLoader = () => {
    const [delayed, setDelayed] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setDelayed(true);
        }, 7000);

        return () => {
            setDelayed(false);
        }
    }, []);

    return (
        <div>
            <Dimmer active style={{marginTop: '65px',height: '100vh', minHeight: '100vh'}}>
                <Image style={{margin: '0 auto', width: '250px'}} src={pikachuGif} alt="loading..." />
                <h5 style={{letterSpacing: '0.1rem'}} className="text-center">{delayed ? "Sometimes this takes a little while..." : "Loading...Please wait..."}</h5>

                {/* disabled */}
                <Loader disabled size='huge'>{delayed ? "Sometimes this takes a while..." : "Loading...Please wait..."}</Loader>
            </Dimmer>
            {/* <Image src='/images/wireframe/short-paragraph.png' />
            <Image src='/images/wireframe/short-paragraph.png' />
            <Image src='/images/wireframe/short-paragraph.png' /> */}
        </div>
    );
};

export default PageLoader;