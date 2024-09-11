import { accounts, categories, transactions } from "@/db/schema"
import { neon } from "@neondatabase/serverless"
import { subDays } from "date-fns"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"
import { format, eachDayOfInterval } from "date-fns"
import { convertAmountToMilliunits } from "@/lib/utils"

config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const SEED_USER_ID = "user_2kkX9waeed6kql62wy5aGkc7yqR"

const SEED_CATEGORIES = [
   {
      id: "category_2kkX9waeed6kql62wy5aGkc7yqR",
      name: "Food",
      userId: SEED_USER_ID,
      plaidId: null,
   },
   {
      id: "category_2kkX9waeed6kql62wy5aGkc7yqS",
      name: "Transport",
      userId: SEED_USER_ID,
      plaidId: null,
   },
   {
      id: "category_2kkX9waeed6kql62wy5aGkc7yqT",
      name: "Shopping",
      userId: SEED_USER_ID,
      plaidId: null,
   },
   {
      id: "category_2kkX9waeed6kql62wy5aGkc7yqU",
      name: "Entertainment",
      userId: SEED_USER_ID,
      plaidId: null,
   },
]
const SEED_ACCOUNTS = [
   {
      id: "account_2kkX9waeed6kql62wy5aGkc7yqV",
      name: "Cash",
      userId: SEED_USER_ID,
      plaidId: null,
   },
   {
      id: "account_2kkX9waeed6kql62wy5aGkc7yqW",
      name: "Bank",
      userId: SEED_USER_ID,
      plaidId: null,
   },
]

const defaultTo = new Date()
const defaultForm = subDays(defaultTo, 90)

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = []

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
   switch (category.name) {
      case "Food":
         return Math.random() * 20 + 10

      case "Transport":
         return Math.random() * 10 + 5

      case "Shopping":
         return Math.random() * 100 + 50

      case "Entertainment":
         return Math.random() * 50 + 20

      default:
         return Math.random() * 50 + 100
   }
}

const generateTransactionsForDays = (day: Date) => {
   const numTransactions = Math.floor(Math.random() * 4) + 1 // 1-4 transactions per day

   for (let i = 0; i < numTransactions; i++) {
      const category =
         SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)]
      const isExpense = Math.random() > 0.6 // 60% chance of being an expense
      const amount = generateRandomAmount(category)
      const formattedAmount = convertAmountToMilliunits(
         isExpense ? -amount : amount
      ) // negative for expenses

      SEED_TRANSACTIONS.push({
         id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
         accountId: SEED_ACCOUNTS[0].id, // always use the first account for simplicity
         categoryId: category.id,
         date: day,
         amount: formattedAmount,
         payee: `Merchant ${i + 1}`,
         notes: `Transaction ${i + 1}`,
      })
   }
}

const generateTransactions = () => {
   const days = eachDayOfInterval({
      start: defaultForm,
      end: defaultTo,
   })

   days.forEach((day) => generateTransactionsForDays(day))
}

generateTransactions()

async function seed() {
   try {
      // ! DELETE ALL DATA
      await db.delete(transactions).execute()
      await db.delete(accounts).execute()
      await db.delete(categories).execute()

      // ! INSERT DATA
      await db.insert(categories).values(SEED_CATEGORIES).execute()
      await db.insert(accounts).values(SEED_ACCOUNTS).execute()
      await db.insert(transactions).values(SEED_TRANSACTIONS).execute()
   } catch (error) {
      console.error("Error seeding database:", error)
      process.exit(1)
   }
}

seed()
