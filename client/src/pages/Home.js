import React from 'react';
import { useQuery } from '@apollo/client';

import PhraseList from '../components/PhraseList'; 
import PhraseForm from '../components/PhraseForm'; 

import { QUERY_PHRASES } from '../utils/queries'; 

const Home = () => {
  const { loading, data } = useQuery(QUERY_PHRASES); 
  const phrases = data?.phrases || []; 
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a', borderRadius: '2px' }}
        >
          <PhraseForm /> 
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PhraseList
              phrases={phrases} 
              title="Language Learning Phrases" 
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
