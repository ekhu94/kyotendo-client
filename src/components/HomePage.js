import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import HomeCarousel from './HomeCarousel';


const HomePage = ({ games, getGames }) => {
    return (
        <div>
            <HomeCarousel />
            
        </div>
    );
};

const mapStateToProps = state => {
    return {
        games: state.games
    };
};

const { getGames } = action.games;

export default connect(mapStateToProps, { getGames })(HomePage);