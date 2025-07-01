import React from 'react';
import './BuyModal.css';
import { User } from 'lucide-react'; // Import the User icon

interface BuyModalProps {
  onClose: () => void;
}

const BuyModal: React.FC<BuyModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="buy-modal">
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Updated modal-tab structure */}
        <div className="modal-tab-container"> {/* New wrapper for the tab */}
          <div className="modal-tab">
            <div className="modal-tab-icon-wrapper"> {/* New wrapper for the icon background */}
              <User size={18} className="modal-tab-icon" /> {/* Using Lucide React User icon */}
            </div>
            <span>Informations</span>
          </div>
          {/* This is the thin grey bar next to 'Informations' as seen in the image */}
          <div className="modal-tab-separator"></div>
          {/* Placeholder for other tabs if they existed, indicated by '...' */}
          <div className="modal-other-tabs">...</div>
        </div>


        <form className="modal-form">
          <label>
            Full Name
            <input type="text" placeholder="abcd..." />
          </label>

          <label>
            E-mail
            <input type="email" placeholder="Example@gmail.com" />
          </label>

          <div className="modal-row">
            <label>
              Country
              <select>
                <option>Algeria</option>
                <option>France</option>
                <option>USA</option>
              </select>
            </label>

            <label>
              Postal code
              <input type="text" placeholder="90210" />
            </label>
          </div>

          <label>
            Address
            <input type="text" placeholder="abcd..." />
          </label>

          <button type="submit" className="modal-send">Send</button>
        </form>
      </div>
    </div>
  );
};

export default BuyModal;