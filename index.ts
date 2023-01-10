import { readFileSync } from "fs";
import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

async function main() {
  // Schema
  const stringSchema = readFileSync("./schema.graphql", "utf8");

  // Executable Schema (add Resolvers)
  const schema = makeExecutableSchema({
    typeDefs: stringSchema,
    resolvers: {
      // TYPENAME: {
      //   fieldName: fieldResolver
      //   fieldName: fieldResolver
      //   fieldName: fieldResolver
      //   fieldName: fieldResolver
      // }
      Query: {
        customer: (parent, args, context) => {},
        restaurant: (parent, args, context) => {},
      },

      Customer: {
        restaurant: (parent, args, context) => {},
      },

      Restaurant: {
        customers: (parent, args, context) => {},
      },
    },
  });

  // Query
  const stringQuery = readFileSync(process.argv[2], "utf8");

  // Resolve Query
  const result = await graphql({
    schema,
    source: stringQuery,
  });

  console.log(JSON.stringify(result, null, 2));
}

main();

// For a given type:
// Two kinds of functions/resolvers
// - The ones that RETURN the GivenType
// - The ones that TAKE AS PARENT INPUT the GivenType

// Mapper : { GivenTypeGql: GivenType }

// (parent: unknown) => GivenType
// (parent: GivenType) => unknown

// GivenType here is NOT the GraphQL Type
