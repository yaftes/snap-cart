import { integer, pgTable, varchar, timestamp,uuid } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {

    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 50 }).notNull().default('user'),
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

    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),


});



export const categoriesTable = pgTable("categories", {

    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name", { length: 255 }).notNull(),

    description: varchar("description"),

});

