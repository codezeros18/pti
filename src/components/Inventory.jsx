import React from 'react'
import { usePlayerStatus } from '../PlayerStatusContext'

const Inventory = () => {
  const { inventory, updateStatus, removeItem } = usePlayerStatus();

  return (
    <div>
      <h3>Inventory</h3>
      {inventory.length === 0 && <p>No items.</p>}
      <ul>
        {inventory.map((item, idx) => (
          <li key={idx} className="flex gap-2 items-center my-2">
            {item.icon && <img src={item.icon} className="w-4 h-4" alt={item.name} />}
            <span>{item.name}</span>
            <button
              className="ml-2 px-2 py-1 bg-green-200 rounded"
              onClick={() => {
                updateStatus({ ...item.effect, money: 0 }); // Don't apply money again
                removeItem(item.name);
              }}
            >
              Use
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Inventory