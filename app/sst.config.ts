import { SSTConfig } from "sst";
import { NextjsSite, StackContext } from "sst/constructs";

export default {
  config(_input: any) {
    return {
      name: "app",
      region: "us-east-1",
    };
  },
  stacks(app: any) {
    app.stack(function Site({ stack }: StackContext) {
      const site = new NextjsSite(stack, "site");
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
