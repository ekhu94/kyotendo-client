import React from 'react';
import backgroundImg from '../assets/nopage-luigi.jpg';

const NoPage = () => {
    return (
        <div className="pt-5">
            <h3 className="text-center my-3 col-12">Ohh, Mamma Mia...404.</h3>
            <h4 className="text-center mb-5 col-12">Something's wrong with the link!</h4>
            <div className="row justify-content-center">
            <img className="col-12 col-sm-8 col-md-5" src={backgroundImg} alt="no-page" />
            </div>
        </div>
    );
};

export default NoPage;