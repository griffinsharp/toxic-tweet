import { getUserTweets } from "../util/tweet_api_utl";
import React from "react";
import "../tweet.css";

class TweetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: {},
      searchOption: "@",
      searchInput: "",
      placeHolder: "Enter a Twitter Handle.",
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.flipSym = this.flipSym.bind(this);
  }

  componentDidMount() {}

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  flipSym() {
    if (this.state.searchOption === "@") {
      this.setState({searchOption: "#"});
      this.setState({placeHolder: "Enter a Twitter Hashtag."});
    } else if (this.state.searchOption === "#") {
      this.setState({ searchOption: "@" });
      this.setState({ placeHolder: "Enter a Twitter Handle." });
    } 
  }

  handleSubmit(e) {
    e.preventDefault();

    // clear results
    this.setState({ errors: {} });
    this.setState({ tweets: [] });
    this.setState({ tweetText: [] });

    // don't allow empty inputs
    if (this.state.searchInput === "") return;

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

    return (
      <div className="app-container">
        <div className="form-container">
          <div className="header">Tweet Toxicity Calculator</div>
          <form className="tweet-form" onSubmit={this.handleSubmit}>
            <label onClick={this.flipSym} className="at-hashtag" htmlFor="userInput">
              {this.state.searchOption}
            </label>
            <input
              id="userInput"
              type="text"
              placeholder={this.state.placeHolder}
              value={this.state.searchInput}
              onChange={this.update("searchInput")}
            />
            <input className="input-btn" type="submit" value="Calculate" />
          </form>
        </div>

        <div className="lower-container">
          {this.handleErrors()}
          <div className="outer-header-container">
            <div className="tweet-header">Tweet</div>
            <div className="toxic-header">Toxic?</div>
          </div>
          {keys.map((key, i) => (
            <div className="outer-tweet-container" key={`outer-${i}`}>
              <div className="tweet-body" key={`tweet-${i}-key`}>
                {key}
              </div>
              <div className="model-prediction" key={`tweet-${i}-value`}>
                {`${this.state.tweetText[key]}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TweetIndex;
