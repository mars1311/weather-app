import { render, screen, fireEvent } from "@testing-library/react";
import WeatherCard from "@/components/WeatherCard/WeatherCard";


jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  useParams: () => ({ id: "1" }),
}));
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("WeatherCard", () => {
  const props = {
    id: 1,
    city: "Prague",
    temperature: 5,
    description: "Cloudy",
    updatedAt: new Date().toISOString(),
    isHighlighted: false,
    onRefresh: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders city, temperature, description and updated time", () => {
    render(<WeatherCard {...props} />);

    expect(screen.getByText(/Prague/i)).toBeInTheDocument();
    expect(screen.getByText(/5°/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloudy/i)).toBeInTheDocument();

    const formatted = new Date(props.updatedAt).toLocaleTimeString();
    expect(screen.getByText(formatted)).toBeInTheDocument();
  });

  test("calls onRefresh when refresh button is clicked", () => {
    render(<WeatherCard {...props} />);

    const refreshBtn = screen.getByRole("button", { name: /refresh city/i });
    fireEvent.click(refreshBtn);

    expect(props.onRefresh).toHaveBeenCalledWith(props.id);
  });

  test("calls onDelete when remove button is clicked", () => {
    render(<WeatherCard {...props} />);

    const removeBtn = screen.getByRole("button", { name: /remove city/i });
    fireEvent.click(removeBtn);

    expect(props.onDelete).toHaveBeenCalledWith(props.id);
  });

  test("navigates to city details when card is clicked", () => {
    render(<WeatherCard {...props} />);

    const card = screen.getByRole("link");
    fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith(`/weather/${props.id}`);
  });

  test("clicking buttons does not trigger navigation", () => {
    render(<WeatherCard {...props} />);

    const card = screen.getByRole("link");
    const refreshBtn = screen.getByRole("button", { name: /refresh city/i });
    const removeBtn = screen.getByRole("button", { name: /remove city/i });

    fireEvent.click(refreshBtn);
    fireEvent.click(removeBtn);

    expect(mockPush).not.toHaveBeenCalled();
  });
});