import {
  FaPlaneDeparture,
  FaHotel,
  FaCalendarAlt,
  FaSearch,
  FaBalanceScale,
  FaBookmark,
  FaEnvelope,
} from "react-icons/fa";
import { MarkerType } from "reactflow";

export const TOOL_ICONS = {
  TravelDatesTool: <FaCalendarAlt className="w-6 h-6 text-blue-600" />,
  FlightSearchTool: <FaPlaneDeparture className="w-6 h-6 text-indigo-600" />,
  FlightComparatorTool: <FaBalanceScale className="w-6 h-6 text-purple-600" />,
  FlightBookingTool: <FaBookmark className="w-6 h-6 text-pink-600" />,
  HotelSearchTool: <FaSearch className="w-6 h-6 text-orange-600" />,
  HotelComparatorTool: <FaBalanceScale className="w-6 h-6 text-amber-600" />,
  HotelBookingTool: <FaHotel className="w-6 h-6 text-green-600" />,
  EmailConfirmationTool: <FaEnvelope className="w-6 h-6 text-teal-600" />,
};

export const DEFAULT_EDGE_OPTIONS = {
  style: {
    strokeWidth: 3,
    stroke: "#94a3b8",
  },
  type: "smoothstep",
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#94a3b8",
  },
};

export const PLAN_DATA = {
  goal: "Book a flight and hotel for a trip to Paris",
  steps: [
    {
      description: "Check calendar availability for the trip",
      tool: "TravelDatesTool",
      parameters: {
        start_date: "2024-01-01T00:00:00",
        end_date: "2024-03-31T00:00:00",
        duration: "3 days, 0:00:00",
      },
      dependencies: [],
    },
    {
      description: "Search for available flights to Paris",
      tool: "FlightSearchTool",
      parameters: {
        origin: "CUC",
        destination: "CDG",
        date: "{TravelDatesTool.available_slots[0]}",
      },
      dependencies: ["TravelDatesTool"],
    },
    {
      description: "Compare and rank flight options",
      tool: "FlightComparatorTool",
      parameters: {
        flights: "{FlightSearchTool.flights}",
        preferences: {
          scoring_weights: {
            price: 0.5,
            duration: 0.3,
            comfort: 0.2,
          },
          constraints: {
            max_budget: 1000,
            max_duration: 8,
            preferred_carriers: ["AF"],
          },
        },
      },
      dependencies: ["FlightSearchTool"],
    },
    {
      description: "Book the selected flight",
      tool: "FlightBookingTool",
      parameters: {
        departure_airport: "CUC",
        arrival_airport: "CDG",
        start_date:
          "{FlightComparatorTool.comparison_results[0].departure.time}",
        passenger_details: {
          first_name: "Fermin",
          last_name: "Blanco",
          type: "ADULT",
        },
      },
      dependencies: ["FlightComparatorTool"],
    },
    {
      description: "Search for available hotels in Paris",
      tool: "HotelSearchTool",
      parameters: {
        num_guests: 1,
        room_type: "SNG",
        max_price: 200.0,
        refundable_only: true,
      },
      dependencies: [],
    },
    {
      description: "Compare and rank hotel options",
      tool: "HotelComparatorTool",
      parameters: {
        hotel_options: "{HotelSearchTool.hotel_options}",
        personal_preferences: {
          preferred_activities: ["sightseeing", "dining"],
        },
      },
      dependencies: ["HotelSearchTool"],
    },
    {
      description: "Book the selected hotel",
      tool: "HotelBookingTool",
      parameters: {
        action: "get_booking_details",
        booking_data: {
          hotel_name: "{HotelComparatorTool.comparison_results[0].hotel.name}",
          check_in_date: "{TravelDatesTool.available_slots[0]}",
          check_out_date: "{TravelDatesTool.available_slots[2]}",
          room_type: "SNG",
          total_price:
            "{HotelComparatorTool.comparison_results[0].price.total}",
          currency: "EUR",
        },
      },
      dependencies: ["HotelComparatorTool", "TravelDatesTool"],
    },
    {
      description: "Send email confirmation for the flight booking",
      tool: "EmailConfirmationTool",
      parameters: {
        booking_data: {
          customer_name: "Fermin Blanco",
          booking_id: "{FlightBookingTool.booking_id}",
          hotel_name: "{HotelBookingTool.booking_data.hotel_name}",
          check_in_date: "{HotelBookingTool.booking_data.check_in_date}",
          check_out_date: "{HotelBookingTool.booking_data.check_out_date}",
          total_price: "{HotelBookingTool.booking_data.total_price}",
        },
        template_path: "flight_booking_template.html",
        to_email: "fermin.blanco@example.com",
        from_email: "bookings@travel.com",
        from_name: "Travel Bookings",
        reply_to_email: "support@travel.com",
        reply_to_name: "Travel Support",
      },
      dependencies: ["FlightBookingTool", "HotelBookingTool"],
    },
  ],
};
