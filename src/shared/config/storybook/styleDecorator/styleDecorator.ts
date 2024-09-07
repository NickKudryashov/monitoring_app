import { StoryFn } from "@storybook/react";
import "app/styles/index.scss";

export const styleDecorator = (story:()=>StoryFn)=>story();