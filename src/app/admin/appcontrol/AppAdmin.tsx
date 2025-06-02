import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [adsCount, setAdsCount] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch users
      const usersSnapshot = await getDocs(collection(db, 'Users'));
      setUsersCount(usersSnapshot.size);

      // Fetch ads
      const adsSnapshot = await getDocs(collection(db, 'Ads'));
      setAdsCount(adsSnapshot.size);

      // Fetch banners
      const bannersSnapshot = await getDocs(collection(db, 'Banners'));
      const bannersData = bannersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBanners(bannersData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-green-700 mt-2">{usersCount}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-700">Total Ads</h2>
          <p className="text-3xl font-bold text-blue-700 mt-2">{adsCount}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-700">Banners</h2>
          <ul className="mt-2 space-y-2">
            {banners.map(banner => (
              <li key={banner.id} className="text-sm text-gray-600">
                {banner.title || 'Untitled Banner'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
