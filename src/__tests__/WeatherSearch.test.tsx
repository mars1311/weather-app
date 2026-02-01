import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";
import { WEATHER_ERROR } from "@/constants/WeatherError";

// mocks
const mockDispatch = jest.fn();
const mockFetchWeather = jest.fn();

jest.mock("@/hooks/useApp", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

jest.mock("@/api/weatherApi", () => ({
  useLazyFetchWeatherByCityQuery: () => [
    mockFetchWeather,
    { isLoading: false },
  ],
}));

jest.mock("@/utils/validateInput", () => ({
  validateInput: jest.fn(),
}));

import { useAppSelector } from "@/hooks/useApp";
import { validateInput } from "@/utils/validateInput";

describe("WeatherSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and submit button", () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    render(<WeatherSearch />);

    expect(screen.getByPlaceholderText(/enter city name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit form/i }),
    ).toBeInTheDocument();
  });

  test("shows validation error", async () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);
    (validateInput as jest.Mock).mockReturnValue("Invalid input");

    render(<WeatherSearch />);

    const input = screen.getByPlaceholderText(/enter city name/i);
    fireEvent.change(input, { target: { value: "!" } });

    expect(await screen.findByText("Invalid input")).toBeInTheDocument();
  });

  test("submits valid city and fetches weather", async () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);
    (validateInput as jest.Mock).mockReturnValue(null);

    mockFetchWeather.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          id: 1,
          name: "Kyiv",
        }),
    });

    render(<WeatherSearch />);

    fireEvent.change(screen.getByPlaceholderText(/enter city name/i), {
      target: { value: "Kyiv" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit form/i }));

    await waitFor(() => {
      expect(mockFetchWeather).toHaveBeenCalledWith("Kyiv");
    });
  });

  test("shows error if city already exists", async () => {
    (useAppSelector as jest.Mock).mockReturnValue([{ id: 1, name: "Kyiv" }]);
    (validateInput as jest.Mock).mockReturnValue(null);

    render(<WeatherSearch />);

    fireEvent.change(screen.getByPlaceholderText(/enter city name/i), {
      target: { value: "Kyiv" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit form/i }));

    expect(
      await screen.findByText(WEATHER_ERROR.ALREADY_ADDED),
    ).toBeInTheDocument();
  });
});
