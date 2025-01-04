interface StepParameters {
  start_date?: string;
  end_date?: string;
  duration?: string;
  origin?: string;
  destination?: string;
  date?: string;
  flights?: unknown;
  preferences?: object;
  departure_airport?: string;
  arrival_airport?: string;
  passenger_details?: object;
  num_guests?: number;
  room_type?: string;
  max_price?: number;
  refundable_only?: boolean;
  hotel_options?: unknown;
  personal_preferences?: object;
  action?: string;
  booking_data?: object;
  template_path?: string;
  to_email?: string;
  from_email?: string;
  from_name?: string;
  reply_to_email?: string;
  reply_to_name?: string;
}

export interface Step {
  description: string;
  tool: string;
  parameters: StepParameters;
  dependencies: string[];
}

export interface PlanData {
  goal: string;
  steps: Step[];
}

export interface NodeData extends Step {
  icon: JSX.Element;
}
