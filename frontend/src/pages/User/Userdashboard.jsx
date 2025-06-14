import React from 'react'

const Userdashboard = () => {
  return (
    <>
    <div className="flex">
      <UserMenu />
      <div className="flex-1 p-8">
        <div className="flex items-center mb-6">
          <img src="/user.jpg" alt="Profile" className="w-20 h-20 rounded-full object-cover mr-6" />
          <div>
            <h1 className="text-3xl font-semibold">
              Welcome, <span className="text-red-500">Admin</span>
            </h1>
            <p className="text-sm text-gray-500">9 Inbox.</p>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded-lg w-full max-w-lg">
          <p><strong>First Name:</strong> Ida</p>
          <p><strong>Last Name:</strong> Miller</p>
          <p><strong>Email:</strong> ida.miller@example.com</p>
          <p><strong>Nick Name:</strong> admin</p>
          <p><strong>Club Name:</strong> Magic Club</p>
          <p><strong>Product:</strong> Sling ($15) × 1</p>
          <div className="mt-4">
            <a href="#" className="text-blue-500 hover:underline">Edit Your Submissions</a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Userdashboard