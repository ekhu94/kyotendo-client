import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

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

const UserPage = ({ username }) => {

    const renderImgs = () => {
        return nintendoCharacters.map(n => {
            return <img src={n} className="col-3 mx-1" style={{borderRadius: '50%'}} />
        });
    }

    return (
        <Container>
            <Row className="justify-content-center">
                {renderImgs()}
            </Row>
        </Container>
    )
};

export default UserPage;