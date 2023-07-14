import db from '../src/database/prisma';

const USER_SEEDS = [
  {
    name: 'Alice',
    email: 'alice@gmail.com',
  },
  {
    name: 'Bob',
    email: 'bob@pm.me',
  },
];

const PRODUCT_SEEDS = [
  {
    label: 'Banana',
    price: 2.0,
    unit: 'bag of 5',
    description: 'Fresh bananas from Ecuador',
    category: 'tropical',
  },
  {
    label: 'Apple',
    price: 1.5,
    unit: 'bag of 5',
    description: 'Organic apples from Washington',
    category: 'temperate',
  },
  {
    label: 'Kiwi',
    price: 3.0,
    unit: 'bag of 5',
    description: 'Ready to eat kiwis from New Zealand',
    category: 'tropical',
  },
  {
    label: 'Lemon',
    price: 2.0,
    unit: 'bag of 4',
    description: 'Juicy lemons from Sicily',
    category: 'citrus',
  },
  {
    label: 'Orange',
    price: 2.5,
    unit: 'bag of 4',
    description: 'Juicy oranges from Seville',
    category: 'citrus',
  },
  {
    label: 'Pineapple',
    price: 3.0,
    unit: 'each',
    description: 'Sweet pineapples from Hawaii',
    category: 'tropical',
  },
];

async function main() {
  Promise.all(
    USER_SEEDS.map(seed =>
      db.user.upsert({ where: { email: seed.email }, update: {}, create: seed })
    )
  )
    .then(seed => console.log('seed completed: ', seed))
    .catch(e => console.error(e));

  Promise.all(
    PRODUCT_SEEDS.map(seed =>
      db.product.upsert({ where: { label: seed.label }, update: {}, create: seed })
    )
  )
    .then(seed => console.log('seed completed: ', seed))
    .catch(e => console.error(e));
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
