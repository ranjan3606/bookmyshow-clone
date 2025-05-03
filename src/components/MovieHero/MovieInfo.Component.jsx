import React, { useContext, useState } from "react";
import { MovieContext } from "../../context/Movie.context";
import PaymentModel from "../PaymentModel/Payment.Component";
import SeatSelection from "../SeatSelection/SeatSelection.Component";

const MovieInfo = ({ handleBuyClick }) => {
  const { price, setIsOpen, isOpen, rentMoive, movie } =
    useContext(MovieContext);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(null);
  const [ticketType, setTicketType] = useState(""); // "rent" or "buy"

  const genres = movie.genres?.map(({ name }) => name).join(", ");

  const handleRentClick = () => {
    setTicketType("rent");
    setShowSeatSelection(true);
  };

  const handleBuyButtonClick = () => {
    setTicketType("buy");
    setShowSeatSelection(true);
  };

  const handleSeatSelectionClose = () => {
    setShowSeatSelection(false);
  };

  const handleSeatSelectionComplete = (seatData) => {
    setSelectedSeats(seatData);
    setShowSeatSelection(false);
    
    // Show payment modal with the correct price based on ticket type
    if (ticketType === "rent") {
      rentMoive();
    } else {
      // For buy tickets
      setIsOpen(true);
      // setPrice(599);
    }
  };

  return (
    <>
      <PaymentModel setIsOpen={setIsOpen} isOpen={isOpen} price={price} />
      {showSeatSelection && (
        <SeatSelection 
          onClose={handleSeatSelectionClose} 
          onSelectSeats={handleSeatSelectionComplete} 
        />
      )}
      <div className="flex flex-col gap-3 px-4 my-3">
        <h1 className="text-5xl font-bold text-white font-poppins">{movie.original_title}</h1>
        <div className="text-black flex flex-col gap-2 md:px-4">
           <h4 className="font-semibold text-white font-poppins">4.2k rating</h4>
          <h4 className="font-semibold text-white font-poppins">
            Kannada, English, Hindi, Telegu, Tamil
          </h4>
          <h4 className="font-semibold text-white font-poppins">
            {movie.runtime} min | {genres}
          </h4>
        </div>
        <div className="flex items-center gap-3 ">
          <button
            className="bg-red-500 w-full py-3 text-white font-semibold rounded-lg px-2 mx-4 font-poppins"
            onClick={handleRentClick}
          >
            Rent ₹ 149
          </button>
          <button
            className="bg-red-600 w-full py-3 pl-2 text-white font-semibold rounded-lg font-poppins"
            onClick={handleBuyButtonClick}
          >
            Buy ₹ 599
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
