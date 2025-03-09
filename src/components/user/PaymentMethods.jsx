import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PaymentMethods = ({ isDarkMode }) => {
  const [cards, setCards] = useState([
    { id: 1, type: 'visa', number: '•••• •••• •••• 4242', expiry: '09/25', default: true },
    { id: 2, type: 'mastercard', number: '•••• •••• •••• 5555', expiry: '12/24', default: false }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({ type: 'visa', number: '', expiry: '', cvv: '' });

  const handleSetDefault = (id) => {
    setCards(cards.map(card => ({
      ...card,
      default: card.id === id
    })));
  };

  const handleRemoveCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleAddCard = () => {
    if (newCard.number && newCard.expiry && newCard.cvv) {
      const maskedNumber = '•••• •••• •••• ' + newCard.number.slice(-4);
      setCards([...cards, {
        id: Date.now(),
        type: newCard.type,
        number: maskedNumber,
        expiry: newCard.expiry,
        default: cards.length === 0
      }]);
      setNewCard({ type: 'visa', number: '', expiry: '', cvv: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
      
      <div className="space-y-4 mb-8">
        {cards.map(card => (
          <div key={card.id} className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm flex justify-between items-center`}>
            <div className="flex items-center space-x-4">
              <i className={`ri-${card.type}-fill text-2xl ${card.type === 'visa' ? 'text-blue-600' : 'text-red-500'}`}></i>
              <div>
                <p className="font-medium">{card.number}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expires {card.expiry}</p>
                {card.default && <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded">Default</span>}
              </div>
            </div>
            <div className="flex space-x-2">
              {!card.default && (
                <>
                  <button 
                    onClick={() => handleSetDefault(card.id)} 
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Set Default
                  </button>
                  <button 
                    onClick={() => handleRemoveCard(card.id)} 
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {!showAddForm ? (
        <button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <i className="ri-add-line mr-2"></i> Add Payment Method
        </button>
      ) : (
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-4`}>
          <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Card Type</label>
              <select 
                value={newCard.type}
                onChange={(e) => setNewCard({...newCard, type: e.target.value})}
                className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Card Number</label>
              <input 
                type="text" 
                placeholder="Card number"
                value={newCard.number}
                onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                  className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">CVV</label>
                <input 
                  type="text" 
                  placeholder="CVV"
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                  className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
              </div>
            </div>
            <div className="flex space-x-2 pt-2">
              <button 
                onClick={handleAddCard}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save Card
              </button>
              <button 
                onClick={() => setShowAddForm(false)}
                className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;