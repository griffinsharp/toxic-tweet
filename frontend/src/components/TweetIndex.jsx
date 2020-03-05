import { getUserTweets } from "../util/tweet_api_utl";
import React from "react";

class TweetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: {},
      searchOption: "Tweet",
      searchInput: "",
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  componentDidMount() {}

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    // clear results
    this.setState({ errors: {} });
    this.setState({ tweets: [] });
    this.setState({ tweetText: [] });

    e.preventDefault();
    getUserTweets(this.state.searchInput)
      .then(tweet => {
        let tweetObj = Object.assign({}, this.state.tweetText, tweet.data);
        this.setState({ tweetText: tweetObj }, () =>
          console.log(this.state.tweetText)
        );
      })
      .catch(err => {
        if (!!err.response) this.setState({ errors: err.response.data });
      });
  }

  handleErrors() {
    let errorsArr = Object.values(this.state.errors);
    if (errorsArr.length > 0) {
      return errorsArr.map((error, i) => <div key={`error-${i}`}>{error}</div>);
    }
  }

  render() {

    let keys = Object.keys(this.state.tweetText);
    let values = Array.from(Object.values(this.state.tweetText));
    console.log(values);

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
          <input type="submit" value="search" />
        </form>
        {this.handleErrors()}
        {keys.map((key, i) => (
          <div key={`outer-${i}`}>
            <div className={i} key={`tweet-${i}-key`}>
              {key}
            </div>
            <div className={i} key={`tweet-${i}-value`}>
              {`${values[0]}`}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default TweetIndex;
