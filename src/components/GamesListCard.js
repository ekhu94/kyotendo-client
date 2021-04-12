import React from 'react';
import { Badge, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './GamesListCard.css';

const headerColors = ['var(--red-secondary)', 'var(--lime)', 'var(--blue-secondary)', 'var(--pink)']

const GamesListCard = ({ game, idx }) => {

    const getThreeTags = () => {
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
            const date = release.split('-');
            const year = date[0];
            const month = date[1];
            const day = date[2];
            return `${month}/${day}/${year}`;
        }
    };

    return (
        <Card className="m-2 my-4 my-md-2 game-card text-center" style={{ backgroundColor: `${game.dominant_color}` }}>
            <Link to={`/games/${game.slug}`} exact>
            <Card.Img className="card-img" variant="top" src={game.background_image} />
            <Card.Body className="p-0" style={{height: 'auto'}}>
                <Card.Title className="game-card-title py-4" style={{backgroundColor: `${headerColors[idx % 4]}`}}>{game.name}</Card.Title>
            </Card.Body>
            </Link>
            <Card.Text className="mb-0">
                {formatDate(game.released)}
            </Card.Text>
            <ListGroup className="list-group-flush mt-0">
                <ListGroupItem>
                    {getThreeTags()}
                </ListGroupItem>
                <ListGroupItem>Metacritic Rating: {game.metacritic}</ListGroupItem>
                <ListGroupItem className="mb-0">{game.stores && game.stores.length ? 'Available at these stores:' : 'No stores provided at this time'}</ListGroupItem>
            </ListGroup>
            <Card.Body className="pt-1">
                {getThreeStores()}
            </Card.Body>
        </Card>
    );
};

export default GamesListCard;