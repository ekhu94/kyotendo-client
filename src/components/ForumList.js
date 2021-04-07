import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../actions';
import { Container, Row, Card, ListGroup } from 'react-bootstrap';

import PageLoader from './PageLoader';
import './ForumList.css';

const ForumList = ({ forums, getForums, getForumShow }) => {

    useEffect(() => {
        getForums();

        return () => {
            getForums([])
        };
    }, []);

    const renderForums = () => {
        return forums.map((forum, i) => {
            const styles = {
                fontSize: '1.3rem',
                letterSpacing: '0.1rem',
                textDecoration: 'none',
                //? joycon red
                color: '#ff4554'
            };
            if (i === forums.length - 1) {
                styles.border = 'none';
                styles.marginTop = '20px';
            } else {
                styles.borderTop = 'none';
                styles.borderLeft = 'none';
                styles.borderRight = 'none';
                styles.marginTop = '20px';
            }
            return (
                <Link
                    key={forum.id}
                    className="forum-link"
                    to={`/forums/${forum.slug}`}
                    onClick={() => getForumShow(forum.id)}
                >
                <ListGroup.Item style={styles}>
                    {forum.name}
                </ListGroup.Item>
                </Link>
            );
        });
    }

    return (
        <div>
            {forums.length ?
            <Container style={{ marginTop: '120px' }}>
                <h1 className="text-center mb-5">Kyotendo Communities</h1>
                <Row className="justify-content-center">
                    <Card className="col-10 p-4" style={{
                        //? joycon grey
                        borderColor: '#989898',
                        borderRadius: '20px'
                    }}>
                        <ListGroup>
                            {renderForums()}
                        </ListGroup>
                    </Card>
                </Row>
            </Container>
            : <PageLoader /> }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        forums: state.forums,
        forumShow: state.forumShow
    }
};

const { getForums, getForumShow } = action.forums;

export default connect(mapStateToProps, { getForums, getForumShow })(ForumList);