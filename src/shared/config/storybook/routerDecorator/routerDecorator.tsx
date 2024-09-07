import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

export const routerDecorator = (story: () => StoryFn) => (
    <BrowserRouter>{/* {story()} */}</BrowserRouter>
);
