import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "science",
  };
  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };
  articles = [];
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `News-${this.capitalizeFirstLetter(this.props.category)}`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  async componentDidMount() {
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=968ead0144934b008903ca94009347ad&page=1&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
    let jsonData = await data.json();
     document.body.style.backgroundColor = "#53a8b6";
    this.setState({
      loading: false,
      articles: jsonData.articles,
      totalResults: jsonData.totalResults,
    });
  }

  handleprev = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=968ead0144934b008903ca94009347ad&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let jsonData = await data.json();
    this.setState({
      loading: false,
      articles: jsonData.articles,
      page: this.state.page - 1,
    });
  };
  handlenext = async () => {
    console.log("next");
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=968ead0144934b008903ca94009347ad&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      });
      let data = await fetch(url);
      let jsonData = await data.json();

      this.setState({
        loading: false,
        articles: jsonData.articles,
        page: this.state.page + 1,
      });
    }
  };

 fetchMoreData = async () => {
    this.setState({page: this.state.page + 1 });
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=968ead0144934b008903ca94009347ad&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
  let jsonData = await data.json();
   document.body.style.backgroundColor = "#53a8b6";
  this.setState({
    loading: false,
    articles: this.state.articles.concat(jsonData.articles),
    totalResults: jsonData.totalResults,
  });
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">
            Top-Headlines {this.capitalizeFirstLetter(this.props.category)}
          </h1>
          {/* { this.state.loading&&<Spinner/>} */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
            <div className="row">
              {this.state.articles.map((element) => {
                console.log(element);
                return (
                  <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem
                      title={element.title}
                      desc={element.description}
                      imgUrl={element.urlToImage}
                      newsurl={element.url}
                      publishDate={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
          <div className="d-flex justify-content-evenly"></div>
        </div>
      </>
    );
  }
}

export default News;
