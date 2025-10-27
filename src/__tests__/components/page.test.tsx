import { render, screen } from "../utils";
import Home from "../../app/page";

describe("Home Page", () => {
  describe("Rendering and Functionality", () => {
    it("should render the main heading", () => {
      render(<Home />);

      const heading = screen.getByText("Next.js CI/CD with Docker");
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H1");
    });

    it("should render the description paragraph", () => {
      render(<Home />);

      const description = screen.getByText(
        /This is a simple example of a Next.js application/
      );
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe("P");
    });

    it("should have correct CSS classes for styling", () => {
      render(<Home />);

      const heading = screen.getByText("Next.js CI/CD with Docker");
      const container = heading.parentElement;
      expect(container).toHaveClass(
        "flex",
        "min-h-screen",
        "items-center",
        "justify-center"
      );
    });

    it("should have proper semantic structure", () => {
      render(<Home />, { skipProviders: true });

      // Use getByText instead of getByRole to avoid CSS-related issues
      const heading = screen.getByText("Next.js CI/CD with Docker");
      expect(heading.tagName).toBe("H1");

      // Check that the description is properly associated
      const description = screen.getByText(/This is a simple example/);
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe("P");
    });

    it("should have accessible text content", () => {
      render(<Home />, { skipProviders: true });

      // Test accessibility by checking for heading element
      const heading = screen.getByText("Next.js CI/CD with Docker");
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H1");

      // Ensure text is readable and not empty
      expect(heading.textContent?.trim()).toBeTruthy();
      expect(heading.textContent?.length).toBeGreaterThan(0);
    });
  });

  describe("Provider Integration", () => {
    it("should render with providers (testing custom render)", () => {
      render(<Home />, {
        providerProps: {
          authProps: { isAuthenticated: true },
        },
      });

      // Verify the component renders correctly with providers
      expect(screen.getByText("Next.js CI/CD with Docker")).toBeInTheDocument();
    });

    it("should render without providers when skipProviders is true", () => {
      render(<Home />, { skipProviders: true });

      // Verify the component renders correctly without providers
      expect(screen.getByText("Next.js CI/CD with Docker")).toBeInTheDocument();
    });
  });

  describe("Snapshot Tests", () => {
    it("should match snapshot", () => {
      const { container } = render(<Home />, { skipProviders: true });
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with providers", () => {
      const { container } = render(<Home />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
