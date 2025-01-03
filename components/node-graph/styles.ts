export const getNodeStyle = (tool: string) => {
  const baseStyle =
    "px-4 py-3 shadow-lg rounded-lg border transition-all duration-300 hover:shadow-xl";

  const styles: { [key: string]: string } = {
    TravelDatesTool: `${baseStyle} bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200`,
    FlightSearchTool: `${baseStyle} bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200`,
    FlightComparatorTool: `${baseStyle} bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200`,
    FlightBookingTool: `${baseStyle} bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200`,
    HotelSearchTool: `${baseStyle} bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200`,
    HotelComparatorTool: `${baseStyle} bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200`,
    HotelBookingTool: `${baseStyle} bg-gradient-to-br from-green-50 to-green-100 border-green-200`,
    EmailConfirmationTool: `${baseStyle} bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200`,
  };

  return styles[tool] || baseStyle;
};
