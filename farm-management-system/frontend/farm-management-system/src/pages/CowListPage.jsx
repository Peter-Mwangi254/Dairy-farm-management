import { useState } from 'react'
import CowForm from '../components/CowForm'
import CowList from '../components/CowList'
import '../App.css';

export default function CowListPage() {
  const [refresh, setRefresh] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 space-y-8">
      <h1 className="text-4xl font-extrabold text-green-800">🐄 Cows</h1>
      <div className="w-full max-w-lg space-y-8">
        <CowForm onSuccess={() => setRefresh(r => !r)} />
        <CowList refresh={refresh} />
      </div>
    </div>
  )
}
