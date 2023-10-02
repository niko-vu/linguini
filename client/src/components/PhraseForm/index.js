import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { CREATE_PHRASE } from '../../utils/mutations';
import { QUERY_PHRASES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PhraseForm = () => {
  const [text, setText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [createPhrase, { error }] = useMutation(CREATE_PHRASE, {
    update(cache, { data: { createPhrase } }) {
      try {
        const { phrases } = cache.readQuery({ query: QUERY_PHRASES });

        cache.writeQuery({
          query: QUERY_PHRASES,
          data: { phrases: [createPhrase, ...phrases] },
        });
      } catch (e) {
        console.error(e);
      }

      // Update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, phrases: [...me.phrases, createPhrase] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createPhrase({
        variables: {
          text,
          translation: 'Your translation goes here', // You can replace this with your translation logic
          language: 'Language Name', // Replace with the selected language
        },
      });

      setText('');
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'text' && value.length <= 280) {
      setText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's the language and phrase you're trying to learn?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="text"
                placeholder="Enter the phrase you want to learn..."
                value={text}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Phrase
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to translate and save phrases. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PhraseForm;
