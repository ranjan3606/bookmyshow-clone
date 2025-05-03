import React, { useState, useEffect } from "react";

const SeatSelection = ({ onSelectSeats, onClose }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrice] = useState(150); // Base price per seat

  // Create rows A-J with 10 seats each (1-10)
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  
  // Some seats are already booked (randomly selected)
  const [bookedSeats] = useState([
    "A3", "A7", "B5", "B6", "C2", "C9", "D4", "E5", "E6", "E7", 
    "F2", "F9", "G1", "G10", "H5", "H6", "I3", "I7", "J4", "J8"
  ]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // Can't select already booked seats
    
    if (selectedSeats.includes(seatId)) {
      // If already selected, remove it
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      // Add to selection
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatClass = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      return "bg-gray-400 cursor-not-allowed"; // Booked seats
    }
    if (selectedSeats.includes(seatId)) {
      return "bg-red-500 hover:bg-red-600"; // Selected seats
    }
    return "bg-green-500 hover:bg-green-600"; // Available seats
  };

  const handleProceed = () => {
    if (selectedSeats.length > 0) {
      onSelectSeats({
        seats: selectedSeats,
        count: selectedSeats.length,
        total: selectedSeats.length * seatPrice,
      });
    }
  };

  // Close when user clicks escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Select your seats</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        <div className="mb-8 text-center">
          <div className="w-full h-6 bg-gray-300 rounded-t-lg mb-8 flex items-center justify-center">
            <span className="text-sm text-gray-600 font-semibold">SCREEN THIS WAY</span>
          </div>
          
          <div className="flex justify-center mb-5 space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-2"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2"></div>
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 mr-2"></div>
              <span className="text-sm">Booked</span>
            </div>
          </div>

          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row} className="flex justify-center space-x-2">
                <div className="w-6 text-center">{row}</div>
                {[...Array(10)].map((_, index) => {
                  const seatNumber = index + 1;
                  const seatId = `${row}${seatNumber}`;
                  return (
                    <button
                      key={seatId}
                      className={`w-8 h-8 rounded-t-lg text-white text-xs ${getSeatClass(seatId)}`}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={bookedSeats.includes(seatId)}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <div>
              <span className="text-gray-600">Selected Seats: </span>
              <span className="font-semibold">
                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total Price: </span>
              <span className="font-semibold">₹ {selectedSeats.length * seatPrice}</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
              className={`px-4 py-2 rounded-lg text-white ${
                selectedSeats.length > 0
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;