import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useQueryClient } from '@tanstack/react-query';
import ClubCard from '../components/ClubCard';
import CreateClubModal from '../components/CreateClubModal';

const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  const fetch = async () => {
    try {
      const res = await axiosInstance.get('/clubs');
      setClubs(res.data || []);
    } catch (err) {
      console.error('fetch clubs', err);
    }
  };

  const queryClient = useQueryClient();

  useEffect(() => { fetch(); }, []);
  useEffect(() => {
    const cached = queryClient.getQueryData(['authUser']);
    setCurrentUser(cached || null);
    // subscribe to query cache changes is possible but for simplicity we
    // rely on global invalidation to update components when auth changes.
  }, [queryClient]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Clubs</h1>
        <button onClick={() => setOpenCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-2xl">Create Club</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clubs.map(c => {
          const currentUserId = currentUser?._id || null;
          return <ClubCard key={c._id} club={{ ...c, currentUserId }} onChange={fetch} />
        })}
      </div>
      {openCreate && <CreateClubModal onClose={() => { setOpenCreate(false); fetch(); }} />}
    </div>
  );
};

export default ClubsPage;
