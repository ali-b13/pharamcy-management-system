const { PrismaClient } = require('@prisma/client');
const prismaConnection = new PrismaClient();
// seed.js


async function main() {

  

  
  const pricePerUnit = 1000; // Assuming a fixed price per unit for the sake of this example
  
  // const orders = batches.map(batch => {
  //   const quantity = batch.quantity;
  //   return {
  //     batchId: batch._id,
  //     medicineId: batch.medicineId,
  //     quantity: quantity,
  //     totalPrice: pricePerUnit * quantity, // Calculate totalPrice based on quantity and price
  //     orderDate: new Date().toISOString(), // Use current date as order date
  //   };
  // });
  
  // console.log(orders);
  //  await prismaConnection.order.deleteMany()
  //  await prismaConnection.batch.deleteMany()
  //  await prismaConnection.supplier.deleteMany()
  //  await prismaConnection.medicine.deleteMany()
  const medicines = [
    {
      name: "Paracetamol",
      brand: "Tylenol",
      dosageForm: "Tablet",
      basePrice: 0.50,
      price: 1.00,
      image: "https://example.com/images/paracetamol.jpg"
    },
    {
      name: "Ibuprofen",
      brand: "Advil",
      dosageForm: "Capsule",
      basePrice: 0.60,
      price: 1.20,
      image: "https://example.com/images/ibuprofen.jpg"
    },
    {
      name: "Amoxicillin",
      brand: "Amoxil",
      dosageForm: "Syrup",
      basePrice: 2.00,
      price: 4.00,
      image: "https://example.com/images/amoxicillin.jpg"
    },
    {
      name: "Metformin",
      brand: "Glucophage",
      dosageForm: "Tablet",
      basePrice: 0.80,
      price: 1.60,
      image: "https://example.com/images/metformin.jpg"
    },
    {
      name: "Atorvastatin",
      brand: "Lipitor",
      dosageForm: "Tablet",
      basePrice: 1.50,
      price: 3.00,
      image: "https://example.com/images/atorvastatin.jpg"
    },
    {
      name: "Amlodipine",
      brand: "Norvasc",
      dosageForm: "Tablet",
      basePrice: 1.20,
      price: 2.40,
      image: "https://example.com/images/amlodipine.jpg"
    },
    {
      name: "Albuterol",
      brand: "Ventolin",
      dosageForm: "Inhaler",
      basePrice: 5.00,
      price: 10.00,
      image: "https://example.com/images/albuterol.jpg"
    },
    {
      name: "Omeprazole",
      brand: "Prilosec",
      dosageForm: "Capsule",
      basePrice: 0.70,
      price: 1.40,
      image: "https://example.com/images/omeprazole.jpg"
    },
    {
      name: "Losartan",
      brand: "Cozaar",
      dosageForm: "Tablet",
      basePrice: 1.30,
      price: 2.60,
      image: "https://example.com/images/losartan.jpg"
    },
    {
      name: "Simvastatin",
      brand: "Zocor",
      dosageForm: "Tablet",
      basePrice: 1.40,
      price: 2.80,
      image: "https://example.com/images/simvastatin.jpg"
    },
    {
      name: "Lisinopril",
      brand: "Zestril",
      dosageForm: "Tablet",
      basePrice: 0.90,
      price: 1.80,
      image: "https://example.com/images/lisinopril.jpg"
    },
    {
      name: "Levothyroxine",
      brand: "Synthroid",
      dosageForm: "Tablet",
      basePrice: 1.00,
      price: 2.00,
      image: "https://example.com/images/levothyroxine.jpg"
    },
    {
      name: "Azithromycin",
      brand: "Zithromax",
      dosageForm: "Tablet",
      basePrice: 1.10,
      price: 2.20,
      image: "https://example.com/images/azithromycin.jpg"
    },
    {
      name: "Gabapentin",
      brand: "Neurontin",
      dosageForm: "Capsule",
      basePrice: 1.60,
      price: 3.20,
      image: "https://example.com/images/gabapentin.jpg"
    },
    {
      name: "Clopidogrel",
      brand: "Plavix",
      dosageForm: "Tablet",
      basePrice: 1.70,
      price: 3.40,
      image: "https://example.com/images/clopidogrel.jpg"
    },
    {
      name: "Montelukast",
      brand: "Singulair",
      dosageForm: "Tablet",
      basePrice: 1.80,
      price: 3.60,
      image: "https://example.com/images/montelukast.jpg"
    },
    {
      name: "Furosemide",
      brand: "Lasix",
      dosageForm: "Tablet",
      basePrice: 1.90,
      price: 3.80,
      image: "https://example.com/images/furosemide.jpg"
    },
    {
      name: "Sertraline",
      brand: "Zoloft",
      dosageForm: "Tablet",
      basePrice: 2.00,
      price: 4.00,
      image: "https://example.com/images/sertraline.jpg"
    },
    {
      name: "Zolpidem",
      brand: "Ambien",
      dosageForm: "Tablet",
      basePrice: 2.10,
      price: 4.20,
      image: "https://example.com/images/zolpidem.jpg"
    },
    {
      name: "Metoprolol",
      brand: "Lopressor",
      dosageForm: "Tablet",
      basePrice: 2.20,
      price: 4.40,
      image: "https://example.com/images/metoprolol.jpg"
    },
    {
      name: "Pantoprazole",
      brand: "Protonix",
      dosageForm: "Tablet",
      basePrice: 2.30,
      price: 4.60,
      image: "https://example.com/images/pantoprazole.jpg"
    },
    {
      name: "Escitalopram",
      brand: "Lexapro",
      dosageForm: "Tablet",
      basePrice: 2.40,
      price: 4.80,
      image: "https://example.com/images/escitalopram.jpg"
    },
    {
      name: "Pravastatin",
      brand: "Pravachol",
      dosageForm: "Tablet",
      basePrice: 2.50,
      price: 5.00,
      image: "https://example.com/images/pravastatin.jpg"
    },
    {
      name: "Bupropion",
      brand: "Wellbutrin",
      dosageForm: "Tablet",
      basePrice: 2.60,
      price: 5.20,
      image: "https://example.com/images/bupropion.jpg"
    },
    {
      name: "Prednisone",
      brand: "Deltasone",
      dosageForm: "Tablet",
      basePrice: 2.70,
      price: 5.40,
      image: "https://example.com/images/prednisone.jpg"
    },
    {
      name: "Rosuvastatin",
      brand: "Crestor",
      dosageForm: "Tablet",
      basePrice: 2.80,
      price: 5.60,
      image: "https://example.com/images/rosuvastatin.jpg"
    },
    {
      name: "Tamsulosin",
      brand: "Flomax",
      dosageForm: "Capsule",
      basePrice: 2.90,
      price: 5.80,
      image: "https://example.com/images/tamsulosin.jpg"
    },
    {
      name: "Meloxicam",
      brand: "Mobic",
      dosageForm: "Tablet",
      basePrice: 3.00,
      price: 6.00,
      image: "https://example.com/images/meloxicam.jpg"
    },
    {
      name: "Citalopram",
      brand: "Celexa",
      dosageForm: "Tablet",
      basePrice: 3.10,
      price: 6.20,
      image: "https://example.com/images/citalopram.jpg"
    },
    {
      name: "Duloxetine",
      brand: "Cymbalta",
      dosageForm: "Capsule",
      basePrice: 3.20,
      price: 6.40,
      image: "https://example.com/images/duloxetine.jpg"
    },
    {
      name: "Fluticasone",
      brand: "Flonase",
      dosageForm: "Nasal Spray",
      basePrice: 3.30,
      price: 6.60,
      image: "https://example.com/images/fluticasone.jpg"
    },
    {
      name: "Hydrochlorothiazide",
      brand: "Microzide",
      dosageForm: "Tablet",
      basePrice: 3.40,
      price: 6.80,
      image: "https://example.com/images/hydrochlorothiazide.jpg"
    },
    {
      name: "Cyclobenzaprine",
      brand: "Flexeril",
      dosageForm: "Tablet",
      basePrice: 3.50,
      price: 7.00,
      image: "https://example.com/images/cyclobenzaprine.jpg"
    },
    {
      name: "Cetirizine",
      brand: "Zyrtec",
      dosageForm: "Tablet",
      basePrice: 3.60,
      price: 7.20,
      image: "https://example.com/images/cetirizine.jpg"
    },
    {
      name: "Fexofenadine",
      brand: "Allegra",
      dosageForm: "Tablet",
      basePrice: 3.70,
      price: 7.40,
      image: "https://example.com/images/fexofenadine.jpg"
    },
    {
      name: "Tramadol",
      brand: "Ultram",
      dosageForm: "Tablet",
      basePrice: 3.80,
      price: 7.60,
      image: "https://example.com/images/tramadol.jpg"
    },
    {
      name: "Venlafaxine",
      brand: "Effexor",
      dosageForm: "Capsule",
      basePrice: 3.90,
      price: 7.80,
      image: "https://example.com/images/venlafaxine.jpg"
    },
    {
      name: "Alprazolam",
      brand: "Xanax",
      dosageForm: "Tablet",
      basePrice: 4.00,
      price: 8.00,
      image: "https://example.com/images/alprazolam.jpg"
    },
    {
      name: "Ranitidine",
      brand: "Zantac",
      dosageForm: "Tablet",
      basePrice: 4.10,
      price: 8.20,
      image: "https://example.com/images/ranitidine.jpg"
    },
    {
      name: "Loratadine",
      brand: "Claritin",
      dosageForm: "Tablet",
      basePrice: 1100.00,
      price: 1230.00,
      image: "https://example.com/images/loratadine.jpg"
    },
    {
      name: "Ciprofloxacin",
      brand: "Cipro",
      dosageForm: "Tablet",
      basePrice: 1500.00,
      price: 1700.00,
      image: "https://example.com/images/ciprofloxacin.jpg"
    },
    {
      name: "Naproxen",
      brand: "Aleve",
      dosageForm: "Tablet",
      basePrice: 800.00,
      price: 950.00,
      image: "https://example.com/images/naproxen.jpg"
    },
    {
      name: "Methylprednisolone",
      brand: "Medrol",
      dosageForm: "Tablet",
      basePrice: 2400.00,
      price: 2890.00,
      image: "https://example.com/images/methylprednisolone.jpg"
    },
    {
      name: "Aspirin",
      brand: "Bayer",
      dosageForm: "Tablet",
      basePrice: 1800.00,
      price: 1900.00,
      image: "https://example.com/images/aspirin.jpg"
    },
    {
      name: "Lorazepam",
      brand: "Ativan",
      dosageForm: "Tablet",
      basePrice: 4800.00,
      price: 5100.00,
      image: "https://example.com/images/lorazepam.jpg"
    },
    {
      name: "Clonazepam",
      brand: "Klonopin",
      dosageForm: "Tablet",
      basePrice: 800.00,
      price: 1000.00,
      image: "https://example.com/images/clonazepam.jpg"
    },
    {
      name: "Trazodone",
      brand: "Desyrel",
      dosageForm: "Tablet",
      basePrice: 4200.90,
      price: 5000.00,
      image: "https://example.com/images/trazodone.jpg"
    },
    {
      name: "Warfarin",
      brand: "Coumadin",
      dosageForm: "Tablet",
      basePrice: 1200.00,
      price: 1250.00,
      image: "https://example.com/images/warfarin.jpg"
    }
  ];
  const supplierId = "669c2ae014338649fd26de28";

const batches = [
 
  {
    medicineId: "669c2a0152fcaf0aab881106",
    quantity: 150,
    batchNumber: "B2",
    expiryDate: new Date("2025-07-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881107",
    quantity: 200,
    batchNumber: "B3",
    expiryDate: new Date("2025-07-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881108",
    quantity: 300,
    batchNumber: "B4",
    expiryDate: new Date("2025-07-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881109",
    quantity: 400,
    batchNumber: "B5",
    expiryDate: new Date("2025-07-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110a",
    quantity: 250,
    batchNumber: "B6",
    expiryDate: new Date("2025-07-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110b",
    quantity: 120,
    batchNumber: "B7",
    expiryDate: new Date("2025-07-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110c",
    quantity: 350,
    batchNumber: "B8",
    expiryDate: new Date("2025-07-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881105",
    quantity: 150,
    batchNumber: "B9",
    expiryDate: new Date("2025-08-15"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881106",
    quantity: 180,
    batchNumber: "B10",
    expiryDate: new Date("2025-09-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881107",
    quantity: 210,
    batchNumber: "B11",
    expiryDate: new Date("2025-10-25"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881108",
    quantity: 330,
    batchNumber: "B12",
    expiryDate: new Date("2025-11-30"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881109",
    quantity: 420,
    batchNumber: "B13",
    expiryDate: new Date("2025-12-15"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110a",
    quantity: 270,
    batchNumber: "B14",
    expiryDate: new Date("2026-01-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110b",
    quantity: 130,
    batchNumber: "B15",
    expiryDate: new Date("2026-02-25"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110c",
    quantity: 360,
    batchNumber: "B16",
    expiryDate: new Date("2026-03-30"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881105",
    quantity: 160,
    batchNumber: "B17",
    expiryDate: new Date("2026-04-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881106",
    quantity: 190,
    batchNumber: "B18",
    expiryDate: new Date("2026-05-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881107",
    quantity: 220,
    batchNumber: "B19",
    expiryDate: new Date("2026-06-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881108",
    quantity: 340,
    batchNumber: "B20",
    expiryDate: new Date("2026-07-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881109",
    quantity: 430,
    batchNumber: "B21",
    expiryDate: new Date("2026-08-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110a",
    quantity: 280,
    batchNumber: "B22",
    expiryDate: new Date("2026-09-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110b",
    quantity: 140,
    batchNumber: "B23",
    expiryDate: new Date("2026-10-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110c",
    quantity: 370,
    batchNumber: "B24",
    expiryDate: new Date("2026-11-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881105",
    quantity: 170,
    batchNumber: "B25",
    expiryDate: new Date("2026-12-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881106",
    quantity: 200,
    batchNumber: "B26",
    expiryDate: new Date("2027-01-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881107",
    quantity: 230,
    batchNumber: "B27",
    expiryDate: new Date("2027-02-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881108",
    quantity: 350,
    batchNumber: "B28",
    expiryDate: new Date("2027-03-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab881109",
    quantity: 440,
    batchNumber: "B29",
    expiryDate: new Date("2027-04-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },
  {
    medicineId: "669c2a0152fcaf0aab88110a",
    quantity: 290,
    batchNumber: "B30",
    expiryDate: new Date("2027-05-20"),
    createdAt: new Date(),
    supplierId: supplierId
  },]

  // const orders = generateOrdersData();

  // await prismaConnection?.batch.createMany({
  //   data: batches
  // });

  // medicineId String @db.ObjectId
  // batchId    String @db.ObjectId
  // quantity   Int
  // totalPrice Float
  // orderDate  DateTime @default(now())

  // medicine   Medicine @relation(fields: [medicineId], references: [id])
  // batch      
  
  // console.log("created orders")
  const orders =[
    {
      batchId:"669e445014338649fd26de2c",
      medicineId:"669c2a0152fcaf0aab8810ee",
      quantity:3,
      totalPrice:610.00,
      supplierId:"669e442b14338649fd26de2b"
    },
    {
      batchId:"669e44a814338649fd26de2d",
      medicineId:"669c2a0152fcaf0aab8810ea",
      quantity:3,
      totalPrice:200.00,
       supplierId:"669e442b14338649fd26de2b"
    },
   
  ]

  await prismaConnection?.order.createMany({
    data: orders
  });
}


main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaConnection?.$disconnect();
  });