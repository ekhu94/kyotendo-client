import React from 'react';
import { Dimmer, Loader, Image } from 'semantic-ui-react';


const PageLoader = () => {
    return (
        <div>
            <Dimmer active style={{height: '120vh'}}>
                <Loader size='huge'>Loading...Please Wait</Loader>
            </Dimmer>

            <Image src='/images/wireframe/short-paragraph.png' />
            <Image src='/images/wireframe/short-paragraph.png' />
            <Image src='/images/wireframe/short-paragraph.png' />
        </div>
    );
};

export default PageLoader;