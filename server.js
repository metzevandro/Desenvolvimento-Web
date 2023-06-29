const express = require("express")
const server = express()

const db = require("./db")

const ideas = [
   {
     img: "https://cdn-icons-png.flaticon.com/128/3195/3195690.png",
     title: "Cursos de Programação",
     category: "Estudo",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
     url: "https://rocketseat.com.br"
   },
   {
     img: "https://cdn-icons-png.flaticon.com/128/1823/1823092.png",
     title: "Exercícios",
     category: "Saúde",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed labore porro a eligendi esse vero",
     url: "https://rocketseat.com.br"
   },
   {
     img: "https://cdn-icons-png.flaticon.com/128/1509/1509542.png",
     title: "Meditação",
     category: "Mentalidade",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
     url: "https://rocketseat.com.br"
   },
   {
     img: "https://cdn-icons-png.flaticon.com/128/2397/2397304.png",
     title: "Karaokê",
     category: "Diversão em Família",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed labore porro a eligendi esse vero",
     url: "https://rocketseat.com.br"
   },
   {
     img: "https://cdn-icons-png.flaticon.com/128/1959/1959689.png",
     title: "Pintura",
     category: "Criatividade",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed labore porro a eligendi esse vero",
     url: "https://rocketseat.com.br"
   },
   {
     img: "https://cdn-icons-png.flaticon.com/128/81/81001.png",
     title: "Recortes",
     category: "Criatividade",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed labore porro a eligendi esse vero",
     url: "https://rocketseat.com.br"
   },
 ]


// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

// Configuração do Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Rotas
server.get("/", function(req, res) {

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
      if(lastIdeas.length < 2) {
        lastIdeas.push(idea)
      }
    }

    return res.render("index.html", { ideas: lastIdeas })
  })

})

server.get("/ideias", function(req, res) {

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse()

    return res.render("ideias.html", { ideas: reversedIdeas })
  })

})

server.post("/", function(req, res) {
  // Inserir dado na tabela
  const query = `
      INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
      ) VALUES (?,?,?,?,?);
    `
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ]

  db.run(query, values, function(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    return res.redirect("/ideias")
  })

})

// Porta do Servidor
server.listen(3000)