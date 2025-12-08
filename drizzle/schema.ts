import { integer, pgTable, varchar, timestamp,uuid, jsonb, boolean } from "drizzle-orm/pg-core";


export const categoriesTable = pgTable("categories", {

    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name", { length: 255 }).notNull(),

    description: varchar("description"),

});


export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),

  password: varchar("password", { length: 255 }),

  role: varchar("role", { length: 50 }).notNull().default("user"),


  is_verified: boolean("is_verified").notNull().default(false),
  verification_token: varchar("verification_token", { length: 255 }),
  verification_expires: timestamp("verification_expires"),

  
  provider: varchar("provider", { length: 100 }),          
  provider_id: varchar("provider_id", { length: 255 }),    

 
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});


export const productsTable = pgTable("products", {

    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name", { length: 255 }).notNull(),
    
    description: varchar("description",{length : 500}).notNull(),

    price: integer("price").notNull(),

    thumbnail_image: varchar("thumbnail_image", { length: 500 }).notNull(),

    
    stock: integer("stock").notNull().default(0),

    category_id: uuid("category_id")
        .notNull()
        .references(() => categoriesTable.id, { onDelete: "cascade" }),

    available_colors: varchar("available_colors", { length: 100 })
    .array()
    .notNull()
    .default([]),


    
    rating: integer("rating").notNull().default(0),

    reviews: jsonb("reviews")
        .notNull()
        .default([]), 

    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),

});



export const cartTable = pgTable("carts", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});




export const cartItemsTable = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),

  cart_id: uuid("cart_id")
    .notNull()
    .references(() => cartTable.id, { onDelete: "cascade" }),

  product_id: uuid("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "cascade" }),

  quantity: integer("quantity").notNull().default(1),
});


export const ordersTable = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  total_price: integer("total_price").notNull(),

  status: varchar("status", { length: 50 }) 
    .notNull()
    .default("pending"),

  payment_method: varchar("payment_method", { length: 50 }) 
    .notNull()
    .default("cod"),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});


export const orderItemsTable = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),

  order_id: uuid("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),

  product_id: uuid("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "cascade" }),

  quantity: integer("quantity").notNull(),
  price_at_purchase: integer("price_at_purchase").notNull(),
});



export const addressesTable = pgTable("addresses", {
  id: uuid("id").primaryKey().defaultRandom(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  full_name: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  street: varchar("street", { length: 200 }).notNull(),

  postal_code: varchar("postal_code", { length: 20 }),
  
  type: varchar("type", { length: 50 })
    .notNull()
    .default("shipping"),
});



export const wishlistTable = pgTable("wishlist", {
  id: uuid("id").primaryKey().defaultRandom(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  product_id: uuid("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "cascade" }),
});


export const paymentsTable = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),

  order_id: uuid("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),

  amount: integer("amount").notNull(),
  provider: varchar("provider", { length: 100 }), 
  status: varchar("status", { length: 50 }) 
    .notNull()
    .default("pending"),

  created_at: timestamp("created_at").defaultNow(),
});

