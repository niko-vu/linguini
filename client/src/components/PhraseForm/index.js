import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { CREATE_NOTE } from '../../utils/mutations';
import { QUERY_NOTES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const NotesForm = () => {
  const [thoughtText, setThoughtText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [createNote, { error }] = useMutation(CREATE_NOTE, {
    update(cache, { data: { createNote } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_NOTES });

        cache.writeQuery({
          query: QUERY_NOTES,
          data: { thoughts: [createNote, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, createNote] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createNote({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
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
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={thoughtText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Thought
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

export default NotesForm;
