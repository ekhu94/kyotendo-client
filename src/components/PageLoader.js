import React, { useState, useEffect } from 'react';
import { Dimmer, Loader, Image } from 'semantic-ui-react';


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
                <Loader size='huge'>{delayed ? "Please be patient....Sometimes this takes a while" : "Loading...Please wait"}</Loader>
            </Dimmer>

            <Image src='/images/wireframe/short-paragraph.png' />
            <Image src='/images/wireframe/short-paragraph.png' />
            <Image src='/images/wireframe/short-paragraph.png' />
        </div>
    );
};

export default PageLoader;