export const getNodeStyle = (tool: string) => {
  const baseStyle =
    "px-6 py-4 shadow-xl rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl";

  const styles: { [key: string]: string } = {
    TravelDatesTool: `${baseStyle} bg-gradient-to-br from-blue-50 via-white to-blue-100 border-blue-300`,
    FlightSearchTool: `${baseStyle} bg-gradient-to-br from-indigo-50 via-white to-indigo-100 border-indigo-300`,
    FlightComparatorTool: `${baseStyle} bg-gradient-to-br from-purple-50 via-white to-purple-100 border-purple-300`,
    FlightBookingTool: `${baseStyle} bg-gradient-to-br from-pink-50 via-white to-pink-100 border-pink-300`,
    HotelSearchTool: `${baseStyle} bg-gradient-to-br from-orange-50 via-white to-orange-100 border-orange-300`,
    HotelComparatorTool: `${baseStyle} bg-gradient-to-br from-amber-50 via-white to-amber-100 border-amber-300`,
    HotelBookingTool: `${baseStyle} bg-gradient-to-br from-green-50 via-white to-green-100 border-green-300`,
    EmailConfirmationTool: `${baseStyle} bg-gradient-to-br from-teal-50 via-white to-teal-100 border-teal-300`,
  };

  return styles[tool] || baseStyle;
};
