import { render, screen } from "@testing-library/react";
import ForecastPage from "../app/weather/[id]/page";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/hooks/useApp";
import { useLazyGetForecastQuery } from "@/api/weatherApi";
import { FORECAST } from "@/constants/Forecast";
import { NOT_FOUND } from "@/constants/NotFound";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/hooks/useApp", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("@/api/weatherApi", () => ({
  useLazyGetForecastQuery: jest.fn(),
}));

jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  LineChart: () => <div data-testid="line-chart" />,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  CartesianGrid: () => null,
}));

jest.mock("lucide-react", () => ({
  ArrowLeft: () => <div data-testid="back-icon" />,
  Wind: () => <div />,
  Droplets: () => <div />,
  Thermometer: () => <div />,
}));

jest.mock("@/ui/NotFoundUI/NotFound", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="not-found-ui">Page is not found</div>,
  };
});

describe("ForecastPage", () => {
  const mockFetchForecast = jest.fn();

  const mockCity = {
    id: 1,
    name: "Kyiv",
    country: "UA",
    temp: 20,
    feels_like: 18,
    windSpeed: 5,
    humidity: 60,
    condition: "Clear",
    description: "clear sky",
    lat: 50.45,
    lon: 30.52,
    icon: "01d",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useLazyGetForecastQuery as jest.Mock).mockReturnValue([
      mockFetchForecast,
      { data: null, isLoading: false },
    ]);
  });

  test("should display 'city not found' message when city is missing in store", () => {
    (useAppSelector as jest.Mock).mockReturnValue(undefined);
    render(<ForecastPage />);
    expect(screen.getByText(NOT_FOUND.TITLE)).toBeInTheDocument();
  });

  test("should render city details and trigger API call on mount", () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockCity);
    render(<ForecastPage />);

    expect(screen.getByText(/Kyiv, UA/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${mockCity.temp}`, "i")),
    ).toBeInTheDocument();
    expect(mockFetchForecast).toHaveBeenCalledWith({ lat: 50.45, lon: 30.52 });
  });

  test("should render the chart when forecast data is available", () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockCity);

    const mockForecastData = [
      { dt_txt: "2026-02-01 12:00:00", main: { temp: 21 } },
      { dt_txt: "2026-02-01 15:00:00", main: { temp: 19 } },
    ];

    (useLazyGetForecastQuery as jest.Mock).mockReturnValue([
      mockFetchForecast,
      { data: mockForecastData, isLoading: false },
    ]);

    render(<ForecastPage />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  test("should show loading text for chart when data is missing", () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockCity);
    (useLazyGetForecastQuery as jest.Mock).mockReturnValue([
      mockFetchForecast,
      { data: null, isLoading: false },
    ]);

    render(<ForecastPage />);
    expect(screen.getByText(FORECAST.LOAD)).toBeInTheDocument();
  });
});
