import React from 'react';
import { Badge, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProfileGameCard.css';

const headerColors = ['var(--red-secondary)', 'var(--lime)', 'var(--blue-secondary)', 'var(--pink)']

const ProfileGameCard = ({ game, idx, imgUrl }) => {

    const getThreeGenres = () => {
        if (game.genres && game.genres.length) {
            return game.genres.map(genre => {
                return (
                    <Badge pill variant="info" className="mr-2 genre-badge" style={{backgroundColor: 'var(--red-primary)'}}>
                        {genre.name}
                    </Badge>
                )
            });
        }
    };

    const getThreeStores = () => {
        if (game.stores && game.stores.length) {
            const stores = game.stores.filter(s => !s.store.name.includes('PlayStation') && !s.store.name.includes('Xbox')).slice(0, 3);
            return stores.map(s => {
                return (
                    <Button className="store-link-btn" variant="link" onClick={e => e.stopPropagation()}>
                        {s.store.name}
                    </Button>
                );
            });
        }
    }

    const formatDate = release => {
        if (release) {
            const date = release.split('T')[0].split('-');
            const year = date[0];
            const month = date[1];
            const day = date[2];
            return `${month}/${day}/${year}`;
        }
    };

    return (
        <Card className="p-0 mx-3 my-4 my-md-2 game-card text-center" style={{ backgroundColor: `${game.dominant_color}` }}>
            <Link to={`/games/${game.slug}`} exact>
            <Card.Img className="profile-card-img" variant="top" src={imgUrl} />
            <Card.Body className="p-0" style={{height: 'auto'}}>
                <Card.Title className="game-card-title py-4 mb-0" style={{backgroundColor: `${headerColors[idx % 4]}`}}>{game.name}</Card.Title>
            </Card.Body>
            </Link>
            <Card.Body>
                <Card.Text className="mt-2 mb-0">
                    {formatDate(game.release_date)}
                </Card.Text>
                <ListGroup className="list-group-flush mt-0">
                <ListGroupItem>
                    {getThreeGenres()}
                </ListGroupItem>
                <ListGroupItem>Metacritic Score: {game.rating}</ListGroupItem>
                {/* <ListGroupItem className="mb-0">{game.videos.length} videos</ListGroupItem> */}
            </ListGroup>
            </Card.Body>
            
        </Card>
    );
};

export default ProfileGameCard;