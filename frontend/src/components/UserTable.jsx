import React from 'react';

function UserTable({ users, onEdit }) {
  const pages = [
    'Products List', 'Marketing List', 'Order List', 'Media Plans',
    'Offer Pricing SKUs', 'Clients', 'Suppliers', 'Customer Support',
    'Sales Reports', 'Finance & Accounting'
  ];

  return (
    <table className="w-full table-auto border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Email</th>
          {pages.map((page) => (
            <th key={page} className="p-2 border">{page}</th>
          ))}
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="p-2 border">{user.email}</td>
            {pages.map((page) => (
              <td key={page} className="p-2 border">
                {user.permissions[page]?.join(', ') || 'None'}
              </td>
            ))}
            <td className="p-2 border">
              <button
                onClick={() => onEdit(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;