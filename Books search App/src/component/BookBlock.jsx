import React from "react";

const Book = ({ data }) => {
    return (
        <a href={data.volumeInfo.infoLink}>
            <div className="book-container">
                <img src={data.volumeInfo.imageLinks.smallThumbnail} alt={data.volumeInfo.title} height="198px" width="128px" />
                <div id="hover-content">
                    <h6>{data.volumeInfo.title}</h6>
                    <h6>{data.volumeInfo.authors[0]}</h6>
                    <h6>PAGE COUNT : {data.volumeInfo.pageCount}</h6>
                    <h6>RATING : {data.volumeInfo.ratingsCount}</h6>
                </div>
                <h5>{data.volumeInfo.title}</h5>
            </div>
        </a>
    )
}

export default Book;