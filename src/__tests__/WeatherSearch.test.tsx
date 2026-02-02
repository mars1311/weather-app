import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { useLazyFetchWeatherByCityQuery } from "@/api/weatherApi";
import { WEATHER_ERROR } from "@/constants/WeatherError";

jest.mock("@/utils/validateInput", () => ({
  validateOnChange: jest.fn((val) => (val === "!" ? "Invalid input" : null)),
  validateOnSubmit: jest.fn((val) =>
    val === "" ? "Please, enter the city." : null,
  ),
}));

jest.mock("@/hooks/useApp", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/api/weatherApi", () => ({
  useLazyFetchWeatherByCityQuery: jest.fn(),
}));

describe("WeatherSearch Component", () => {
  const mockDispatch = jest.fn();
  const mockFetchWeather = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue([]);
    (useLazyFetchWeatherByCityQuery as jest.Mock).mockReturnValue([
      mockFetchWeather,
      { isLoading: false },
    ]);
  });

  test("renders input and submit button", () => {
    render(<WeatherSearch />);
    expect(screen.getByPlaceholderText(/enter city name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit form/i }),
    ).toBeInTheDocument();
  });

  test("shows validation error on change", async () => {
    render(<WeatherSearch />);
    const input = screen.getByPlaceholderText(/enter city name/i);

    fireEvent.change(input, { target: { value: "!" } });

    expect(await screen.findByText("Invalid input")).toBeInTheDocument();
  });

  test("submits valid city and fetches weather", async () => {
    mockFetchWeather.mockReturnValue({
      unwrap: () => Promise.resolve({ id: 1, name: "Kyiv" }),
    });

    render(<WeatherSearch />);
    const input = screen.getByPlaceholderText(/enter city name/i);
    const button = screen.getByRole("button", { name: /submit form/i });

    fireEvent.change(input, { target: { value: "Kyiv" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFetchWeather).toHaveBeenCalledWith("Kyiv");
    });
  });

  test("shows error if city already exists", async () => {
    (useAppSelector as jest.Mock).mockReturnValue([{ id: 1, name: "Kyiv" }]);

    render(<WeatherSearch />);
    const input = screen.getByPlaceholderText(/enter city name/i);
    const button = screen.getByRole("button", { name: /submit form/i });

    fireEvent.change(input, { target: { value: "Kyiv" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(WEATHER_ERROR.ALREADY_ADDED),
    ).toBeInTheDocument();
  });
});
