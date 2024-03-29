import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, desc, imgUrl,newsurl,publishDate,author,source} = this.props;
    return (
      <div>
       <div className="card h-10" style={{width: "20rem",
      borderRadius:10,
       }}>
       <h6 className='p-1 mb-1 bg-danger text-white text-end' style={{fontSize:"12px"}}>{source}</h6>
  <img src={!imgUrl?"https://nypost.com/wp-content/uploads/sites/2/2024/01/comp-2-1.jpg?quality=75&strip=all&w=1024":imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body d-flex flex-column">
    <h5 className="card-title">{title}....</h5>
    <p className="card-text">{desc}...</p>
    <p className='font-weight-bold'>Date-{publishDate.slice(2,10)}
   <p >Author-{!author?"unknown":author}</p></p>

    <a href={newsurl} target="_blank"className="btn btn-success btn-sm mt-auto ">Read more</a>
  </div>
</div>

      </div>
      
    )
  }
}

export default NewsItem
