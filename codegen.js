"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    overwrite: true,
    schema: "src/prisma/schema.prisma",
    generates: {
        "src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-resolvers"]
        },
        "./graphql.schema.json": {
            plugins: ["introspection"]
        }
    }
};
exports.default = config;
