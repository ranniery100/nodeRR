// npm init -y
// npm install express
// npm install nodemon -D
// npm run dev
// npm install prisma -D
// npm install @prisma/client
// npx prisma init
// npx prisma migrate dev
// npx prisma generate

const express = require('express') 
const app = express()
app.use(express.json()) //permite o uso do json no express

//config do prisma
const{PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
app.get("/",(req,res)=>{
    return res.send("Hello World")
})
//npm install nodemon -D reinicia servidor local automaticamente
//install thunder client extension to be able to POST

app.post("/formulario", async(req,res)=> {
    const{nome, email, senha} = req.body
    await prisma.usuario.create({
        data: {
            nome,
            email,
            senha
        }
    })
    return res.status(201).send("Usuario criado com sucesso")
})

//listage usuarios
app.get("/usuarios", async(req,res) =>{
    const usuarios = await prisma.usuario.findMany()
    
    return res.status(200).send(usuarios)
})
app.listen(process.env.NODE_PORT||3030, ()=> {
    console.log("Servidor Rodando")
})
