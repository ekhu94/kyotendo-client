import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Card } from 'react-bootstrap';
import './UserPage.css';

import BackButton from './BackButton';
import backgroundImg from '../assets/mario-maker.jpg';
import bowser from '../assets/icons/avatars/bowser.jpg';
import daisy from '../assets/icons/avatars/daisy.jpg';
import donkeyKong from '../assets/icons/avatars/donkey-kong.jpg';
import isabella from '../assets/icons/avatars/isabella.jpg';
import koopa from '../assets/icons/avatars/koopa.jpg';
import link from '../assets/icons/avatars/link.jpg';
import luigi from '../assets/icons/avatars/luigi.jpg';
import mario from '../assets/icons/avatars/mario.jpg';
import princessPeach from '../assets/icons/avatars/princess-peach.jpg';
import rosalina from '../assets/icons/avatars/rosalina.jpg';
import shyguy from '../assets/icons/avatars/shyguy.jpg';
import tanukiMario from '../assets/icons/avatars/tanuki-mario.jpg';
import toad from '../assets/icons/avatars/toad.jpg';
import villagerF from '../assets/icons/avatars/villager-f.jpg';
import villagerM from '../assets/icons/avatars/villager-m.jpg';
import waluigi from '../assets/icons/avatars/waluigi.jpg';
import wario from '../assets/icons/avatars/wario.jpg';
import yoshi from '../assets/icons/avatars/yoshi.jpg';

const nintendoCharacters = [
    bowser, daisy, donkeyKong, isabella, koopa, link, luigi, mario, princessPeach, rosalina, shyguy, tanukiMario, toad, villagerM, villagerF, waluigi, wario, yoshi
];

const UserPage = ({ auth, username }) => {

    useEffect(() => {
        console.log(auth.user)
    }, [auth])

    const renderAvatar = () => {
        return nintendoCharacters.map(n => {
            return <img src={n} className="col-3 mx-1" style={{borderRadius: '50%'}} />
        });
    }

    return (
        <div className="profile-container pt-5" style={{backgroundImage: `url(${backgroundImg})`, paddingBottom: '90px'}}>
            <Container>
                <BackButton label="back to home" url='/' />
                <Row className="justify-content-center">
                    <Card className="col-10 col-md-8 p-0 mb-5" style={{borderRadius: '20px'}}>
                        <Row className="justify-content-center">
                            <h1>{}</h1>
                        </Row>
                    </Card>
                </Row>
            </Container>
        </div>
    )
};

const mapStateToProps = state => {
    return { auth: state.auth }
};

export default connect(mapStateToProps)(UserPage);