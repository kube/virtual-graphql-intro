# Internal Representations of Objects

We cannot return cyclic object, because it would possibly end up with fetching the whole database.

Instead we want to return things lazily, and resolve fields only when they are required (requested????).

That's the purpose of the Field Resolvers, and particularly the Field Resolvers that return other Object Types.

// Store (or Database/Dataloader)
// Resolvers

## Internal Representation

```graphql
type Customer {
  id: ID!
  name: String!
  restaurant: Restaurant!
}

type Restaurant {
  id: ID!
  name: String!
  group: RestaurantGroup!
  customers: [Customer!]!
}
```

Let's say this type is returned by the Store/Database/Dataloader:

```ts
type Customer {
  id: string;
  name: string;
  restaurantId: string;
}

type Restaurant {
  id: string;
  name: string;
  restaurantGroupId: string;
}
```
