import React from 'react';

function PermissionPanel({ selectedUser, onChangePermission, onClose }) {
  const pages = [
    'Products List', 'Marketing List', 'Order List', 'Media Plans',
    'Offer Pricing SKUs', 'Clients', 'Suppliers', 'Customer Support',
    'Sales Reports', 'Finance & Accounting'
  ];

  const actions = ['View', 'Edit', 'Create', 'Delete'];

  const togglePermission = (page, action) => {
    const perms = selectedUser.permissions[page] || [];
    const updated = perms.includes(action)
      ? perms.filter(p => p !== action)
      : [...perms, action];
    onChangePermission(page, updated);
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Edit Permissions</h2>
      <button onClick={onClose} className="mb-4 bg-red-500 text-white px-3 py-1 rounded">Close</button>
      {pages.map((page) => (
        <div key={page} className="mb-3">
          <h3 className="font-semibold mb-1">{page}</h3>
          <div className="flex gap-2 flex-wrap">
            {actions.map(action => (
              <label key={action} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedUser.permissions[page]?.includes(action) || false}
                  onChange={() => togglePermission(page, action)}
                />
                <span className="text-sm">{action}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PermissionPanel;