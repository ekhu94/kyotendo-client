# Kyotendo

Kyotendo is a social media website for fans of Nintendo games. The site utilizes the RAWG video game API to deliver an expansive collection of information on the latest Nintendo Switch games and brands. Users can click on a game's card to find out more information about its genres, tags, ESRB ratings, critical reviews, and more. Through use of Youtube's Data API v3, each game also contains a separate page that displays videos featuring gameplay, with the option to search for other videos on Youtube. Once a user signs up for an account, they can also save these videos to their profile, as well as post, comment, and rate other users' posts in the forums. These posts come in the form of discussions, photos, or videos from outside sources.

[Live Demo](https://kyotendo.herokuapp.com/)

## Technologies

- React | Redux | Bootstrap | Semantic UI
- Ruby on Rails | PostgreSQL [GitHub link here](https://github.com/ekhu94/kyotendo-server-api/)

## Home Page

![Home Page](/kyotendo-home.png)

## Games List Page

![Games Page](/kyotendo-games.jpg)

## Forum Page

![Forum Page](/kyotendo-forum.jpg)

## Game Show Page

![Game Show Page](/kyotendo-gameShow.jpg)

## Setup and Installation

The easiest way to access the Kyotendo website is through the live demo located in the GitHub description. Alternatively, fork and clone `kyotendo-client` to your local machine. Since the back end API is hosted on Heroku, there is no need to download and install `kyotendo-server-api`.

1. Navigate to the main folder of the application.
2. Run ```npm install``` to install all NPM packages and dependencies.
3. Alternatively, you can also run ```yarn install```
4. Run ```npm start``` to open the application in your browser.
5. Navigate to the games page to browse titles on Nintendo platforms and watch youtube videos. Visit forums to view discussions, images, and videos posted by other users.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Created By

Erik Huang - https://github.com/ekhu94