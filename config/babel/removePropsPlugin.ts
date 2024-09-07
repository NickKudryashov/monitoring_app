import { PluginItem } from "@babel/core";

export default function():PluginItem {
    return {
      visitor: {
        Program(path) {
          const forbidden = ['data-testid',]
          path.traverse({JSXIdentifier(current){
            const nodeName = current.node.name
            if (forbidden.includes(nodeName)) {
                current.parentPath.remove()
            }
          }})
        },
      },
    };
  }