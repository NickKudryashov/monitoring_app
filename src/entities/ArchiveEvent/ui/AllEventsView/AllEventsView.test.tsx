import { screen } from "@testing-library/react";
import { AllEventsView } from "./AllEventsView";
import { componentRender } from "@/shared/test/componentRender";
window.IntersectionObserver = jest.fn(() => ({
    takeRecords: jest.fn(),
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
    root: null,
    rootMargin: "",
    thresholds: [],
}));
describe("Archive Events", () => {
    test("Empty events", async () => {
        componentRender(<AllEventsView />, {
            initialState: {
                archiveEvents: {
                    events: [],
                },
            },
        });
        expect(
            await screen.findByTestId("ArchiveAllEventsView"),
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId("ArchivesEventEmptyText"),
        ).toHaveTextContent("События отсутствуют");
    });
});
