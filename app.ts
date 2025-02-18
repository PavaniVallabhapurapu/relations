import express from 'express'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Company } from './entities/Company'
import { Product } from './entities/Product'

const app = express()
app.use(express.json())
const PORT = 3000

app.get('/',async function(req,res) {
    // insert
 const companyRepo = AppDataSource.getRepository(Company)

    let products : Product[] = []

    let iphone = new Product()
    iphone.name = 'Iphone'
    iphone.description = 'Smart Phone'
    iphone.price = 250000

    let ipad = new Product()
    ipad.name = 'Ipad'
    ipad.description = 'Smart Tablet'
    ipad.price = 350000

    let airpods = new Product()
    airpods.name = 'Ear Phones'
    airpods.description = 'Smart Sound'
    airpods.price = 150000

    products.push(iphone, ipad, airpods)


    let company : Company = new Company()
    company.name = 'Apple'
    company.description = 'Tech Company California'
    company.products = products

    const dataInserted = await companyRepo.save(company)
    res.json(dataInserted)
    
})

const AppDataSource = new DataSource({
    type: 'postgres',
    host:'localhost',
    port:8080,
    username:'postgres',
    password:'pavani',
    database:'relations',
    logging: true,
    synchronize: true,
    entities:['src/entities/*.ts']
})

AppDataSource.initialize().then(() =>{
    console.log("Database connected successfully")
}).catch((error) => console.log("Failed to connect" , error))

app.listen(PORT , ()=>{
    console.log(`server running on ${PORT}`)
})