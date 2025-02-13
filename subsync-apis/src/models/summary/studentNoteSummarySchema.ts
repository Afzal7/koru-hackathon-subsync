export const responseSchema = {
  type: "object",
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: ["string"],
          },
          summary: {
            type: "string",
          },
          labels: {
            type: "array",
            items: {
              type: "string",
            },
          },
          severity: {
            type: "string",
            enum: ["Critical", "High", "Medium", "Low"],
          },
        },
        required: ["summary", "labels", "severity"],
      },
    },
  },
  required: ["results"],
};
