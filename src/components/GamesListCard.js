import React from 'react';
import { Badge, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const GamesListCard = ({ game }) => {

    const getThreeTags = () => {
        const filter = game.tags.filter(tag => tag.language === 'eng').slice(0, 3);
        return filter.map(tag => {
            return (
                <Badge pill variant="info">
                    {tag.name}
                </Badge>
            )
        });
    };

    const formatDate = release => {
        const date = release.split('-');
        const year = date[0];
        const month = date[1];
        const day = date[2];
        return `${month}/${day}/${year}`;
    };

    return (
        <Card className="m-2" style={{ width: '18rem', backgroundColor: `${game.dominant_color}`, border: 'none' }}>
            <Card.Img variant="top" src={game.background_image} />
            <Card.Body className="mb-0">
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                {formatDate(game.released)}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>
                    {getThreeTags()}
                </ListGroupItem>
                <ListGroupItem>Metacritic Rating: {game.metacritic}</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default GamesListCard;