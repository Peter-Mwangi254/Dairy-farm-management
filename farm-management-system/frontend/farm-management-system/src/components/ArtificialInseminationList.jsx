import { useEffect, useState } from 'react';
import API from '../api/api';

export default function ArtificialInseminationList({ cowId, refresh }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get(`artificial-insemination/?cow=${cowId}`)
       .then(res => setRecords(res.data))
       .catch(console.error);
  }, [cowId, refresh]);

  if (!records.length) return <p className="no-cows-message">No AI records.</p>;

  return (
    <div className="table-container">
      <table className="cow-table">
        <thead>
          <tr>
            <th className="table-header">Date</th>
            <th className="table-header">Bull</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id} className="table-row">
              <td className="table-cell">{r.date}</td>
              <td className="table-cell">{r.bull}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
