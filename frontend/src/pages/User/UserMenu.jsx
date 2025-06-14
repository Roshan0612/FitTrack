import React from 'react'

const UserMenu = () => {
  return (
    <>
    <div className="w-64 bg-gray-100 min-h-screen p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">Custom User Profile</h2>
      <ul className="space-y-4">
        <li><Link to="#" className="text-gray-700 hover:text-blue-600">Personal Details</Link></li>
        <li><Link to="#" className="text-gray-700 hover:text-blue-600">Registrations</Link></li>
        <li><Link to="#" className="text-gray-700 hover:text-blue-600">Payment History</Link></li>
        <li><Link to="#" className="text-gray-700 hover:text-blue-600">Inbox (3)</Link></li>
        <li><Link to="#" className="text-gray-700 hover:text-blue-600">Reset Password</Link></li>
        <li><Link to="#" className="text-red-500 hover:text-red-700">Logout</Link></li>
      </ul>
    </div>
    </>
  )
}

export default UserMenu