import { getUserTweets } from "./util/tweet_api_utl";
import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      tweetText: []
    };
  }

  getText(tweet) {
    let arrText = Object.values(tweet).map(ele => ele.full_text);
    this.setState({ tweetText: arrText });
  }

  componentDidMount() {
    getUserTweets("gsharpdev")
      .then(tweet => {
        this.setState({ tweets: tweet.data });
        return this.state.tweets;
      })
      .then(tweet => this.getText(tweet));
  }

  render() {
    return (
      <div>
        {this.state.tweetText.map((ele, i) => (
          <div key={`tweet-${i}`}>{ele}</div>
        ))}
      </div>
    );
  }
}

export default Home;
