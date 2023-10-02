import React from 'react';
import { Link } from 'react-router-dom';

const PhraseList = ({
  phrases,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!phrases.length) {
    return <h3>No Phrases Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {phrases &&
        phrases.map((phrase) => (
          <div key={phrase._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${phrase.phraseAuthor}`}
                >
                  {phrase.phraseAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    added this phrase on {phrase.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You added this phrase on {phrase.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{phrase.phraseText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/phrases/${phrase._id}`}
            >
              Practice and Learn More
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PhraseList;
