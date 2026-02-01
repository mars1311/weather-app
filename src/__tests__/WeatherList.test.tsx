import { render, screen } from "@testing-library/react";
import WeatherList from "@/components/WeatherList/WeatherList";
import { useAppSelector } from "@/hooks/useApp";

jest.mock("@/hooks/useApp", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("@/components/WeatherCard/WeatherCard", () => {
  return function MockCard({ city }: { city: string }) {
    return <div data-testid="weather-card">{city}</div>;
  };
});

describe("WeatherList", () => {
  const mockCities = [
    {
      id: 1,
      name: "New York",
      temp: 10,
      condition: "Rainy",
      lastUpdated: "10:00 AM",
    },
    {
      id: 2,
      name: "Tokyo",
      temp: 18,
      condition: "Clear",
      lastUpdated: "11:00 AM",
    },
  ] as any;

  test("renders Empty component when cities list is empty", () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);
    render(
      <WeatherList cities={[]} onRefresh={jest.fn()} onDelete={jest.fn()} />,
    );

    expect(screen.getByText(/no cities/i)).toBeInTheDocument();
  });

  test("renders the correct number of weather cards", () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);
    render(
      <WeatherList
        cities={mockCities}
        onRefresh={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    const cards = screen.getAllByTestId("weather-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
  });
});
