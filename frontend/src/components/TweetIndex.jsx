import { getUserTweets } from "../util/tweet_api_utl";
import React from "react";

class TweetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      tweetText: [],
      searchOption: "Tweet",
      searchInput: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getText(tweet) {
    let arrText = Object.values(tweet).map(ele => ele.full_text);
    this.setState({ tweetText: arrText });
  }

  componentDidMount() {
    // getUserTweets("gsharpdev")
    //   .then(tweet => {
    //     this.setState({ tweets: tweet.data });
    //     return this.state.tweets;
    //   })
    //   .then(tweet => this.getText(tweet));
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    getUserTweets(this.state.searchInput)
      .then(tweet => {
        this.setState({ tweets: tweet.data });
        return this.state.tweets;
      })
      .then(tweet => this.getText(tweet));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userInput">{this.state.searchOption}</label>
          <input
            id="userInput"
            type="text"
            placeholder="Enter a twitter @user"
            value={this.state.searchInput}
            onChange={this.update("searchInput")}
          />
          <input type="submit" value="search"/>
        </form>
        {this.state.tweetText.map((ele, i) => (
          <div key={`tweet-${i}`}>{ele}</div>
        ))}
      </div>
    );
  }
}

export default TweetIndex;
