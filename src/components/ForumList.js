import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../actions';
import { Container, Row, Card, ListGroup, Button } from 'react-bootstrap';

import PageLoader from './PageLoader';
import backgroundImg from '../assets/Splatoon-wallpaper-2.jpg';
import './ForumList.css';

const ForumList = ({ auth, forums, getForums, resetForums, getForumShow }) => {
    const [changeCreateText, setChangeCreateText] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const renderAllForums = async () => {
            await getForums();
            if (forums) {
                setLoaded(true);
            }
        }
        const handleResize = () => {
            if (window.innerWidth < 700) {
                setChangeCreateText(true);
            } else {
                setChangeCreateText(false);
            }
        }

        if (window.innerWidth < 700) setChangeCreateText(true);
        renderAllForums();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            resetForums();
            setLoaded(false);
        }

    }, []);

    const renderForums = () => {
        return forums.map((forum, i) => {
            const styles = {
                fontSize: '1.3rem',
                letterSpacing: '0.1rem',
                textDecoration: 'none',
                //? joycon red
                color: 'var(--dark)'
            };
            if (i === forums.length - 1) {
                styles.border = 'none';
                styles.paddingTop = '20px';
            } else {
                styles.borderTop = 'none';
                styles.borderLeft = 'none';
                styles.borderRight = 'none';
                styles.paddingTop = '20px';
                styles.paddingBottom = '20px';
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
        <div
            id="forumsList-container"
            style={{backgroundImage: `url(${backgroundImg})`}}
        >
            {loaded ?
            <Container id="forums-inner-container">
                <Row className="justify-content-center">
                    <Card className="col-10 px-0" style={{
                        //? joycon grey
                        borderColor: '#989898',
                        borderRadius: '20px',
                    }}>
                        <h1
                            className="text-center py-4 mb-0"
                            style={{
                                color: '#fff',
                                backgroundColor: 'var(--dark)',
                                textShadow: "5px 4px 6px rgba(0,0,0,0.67)",
                                letterSpacing: "0.3em",
                                fontSize: '1.6rem',
                                lineHeight: '1.5',
                                borderTopLeftRadius: '20px',
                                borderTopRightRadius: '20px',
                                fontWeight: "500"
                            }}
                        >
                            Kyotendo Communities
                        </h1>
                        <ListGroup className="p-4">
                            {renderForums()}
                        </ListGroup>
                        {auth.user.id ?
                            <Link id="new-forum-btn" to="/new/forum" exact>
                                <Button
                                    block
                                    size="lg"
                                    variant="info"
                                    className="py-4"
                                >
                                    {changeCreateText ? 
                                        "Create a new forum!"
                                    :
                                        "Don't see the right place for you? Create a new forum!"
                                    }
                                </Button>
                            </Link>
                        : null }
                    </Card>
                </Row>
            </Container>
            : <PageLoader /> }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        forums: state.forums,
        forumShow: state.forumShow
    }
};

const { getForums, resetForums, getForumShow } = action.forums;

export default connect(mapStateToProps, { getForums, resetForums, getForumShow })(ForumList);