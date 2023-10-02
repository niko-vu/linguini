import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PhraseForm from '../components/PhraseForm';
import PhraseList from '../components/PhraseList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const isOwnProfile = Auth.loggedIn() && Auth.getProfile().data.username === userParam;

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {isOwnProfile ? 'your' : `${user.username}'s`} profile.
        </h2>

        {isOwnProfile && (
          <div className="col-12 col-md-10 mb-3 p-3">
            <PhraseForm />
          </div>
        )}

        <div className="col-12 col-md-10 mb-5">
          <PhraseList
            phrases={user.phrases} // Update to match your data structure
            title={`${user.username}'s phrases...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
