import { render, screen } from "../../utils/test-utils";
import TopBar from "./index";

describe("TopBar", () => {
  it("renders Add Bookmark button", () => {
    render(<TopBar />);
    expect(
      screen.getByRole("button", { name: /Add Bookmark/i })
    ).toBeInTheDocument();
  });

  it("renders Icon", () => {
    render(<TopBar />);
    expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
  });
});
