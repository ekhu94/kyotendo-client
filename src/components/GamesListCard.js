import React from 'react';
import { Badge, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './GamesListCard.css';

const GamesListCard = ({ game }) => {

    const getThreeTags = () => {
        if (game.tags && game.tags.length) {
            const filter = game.tags.filter(tag => tag.language === 'eng').slice(0, 3);
            return filter.map((tag, i) => {
                return (
                    <Badge pill variant="info" className="mr-2 genre-badge" style={{backgroundColor: `${i % 2 === 0 ? 'var(--red-primary)' : 'var(--blue-primary)'}`}}>
                        {tag.name}
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
        <Link to={`/games/${game.slug}`} exact>
            <Card className="m-2 game-card text-center" style={{ backgroundColor: `${game.dominant_color}` }}>
                <Card.Img className="card-img" variant="top" src={game.background_image} />
                <Card.Body className="p-0" style={{height: 'auto'}}>
                    <Card.Title className="game-card-title py-4">{game.name}</Card.Title>
                    <Card.Text>
                    {formatDate(game.released)}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        {getThreeTags()}
                    </ListGroupItem>
                    <ListGroupItem>Metacritic Rating: {game.metacritic}</ListGroupItem>
                    <ListGroupItem className="mb-0">Available at these stores:</ListGroupItem>
                </ListGroup>
                <Card.Body className="pt-1">
                    {getThreeStores()}
                </Card.Body>
            </Card>
        </Link>
    );
};

export default GamesListCard;