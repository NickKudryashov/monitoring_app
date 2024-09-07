import { screen } from "@testing-library/react";
import { AllEventsView } from "./AllEventsView";
import { componentRender } from "shared/test/componentRender";

describe("Archive Events", () => {
    test("Empty events", () => {
        componentRender(<AllEventsView />, {
            initialState: {
                archiveEvents: {
                    events: [],
                },
            },
        });
        expect(screen.getByTestId("ArchivesEventEmptyText")).toHaveTextContent(
            "События отсутствуют",
        );
    });
});
