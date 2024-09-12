const { select, input, checkbox } = require('@inquirer/prompts')
let mensagem = "Bem vindo ao App de Metas";

let meta = {
  value: "Tomar 3L de água por dia",
  checked: false
}


let metas = [ meta ]


//Cadastrar meta
const cadastrarMeta = async () => {
  const meta = await input({ message : "Digite a meta: "})
  
  if(meta.length == 0){
    mensagem = 'A meta não pode ser vazia.'
    return
  }

  metas.push(
    {value: meta, checked: false}
  )
  mensagem = "Meta Cadastrada com Sucesso!"
}

//Listar metas
const listarMetas = async () => {
  const respostas = await checkbox({
    message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
    choices: [...metas],
    instructions: false,
  })

  metas.forEach((m) =>{
    m.checked = false
  })

  if (respostas.length == 0){
    mensagem = "Nenhuma meta selecionada"
    return
  }


  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  mensagem = "Meta(s) marcadas como concluída(s)."
}


//Metas Realizadas
const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if(realizadas.length == 0){
    mensagem = "Não Existem metas realizadas"
    return
  }

  await select({
    message: "Metas Realizadas : " + realizadas.length,
    choices: [...realizadas]
  })
  console.log(realizadas)
}

//Metas Abertas
const metasAbertas = async () =>{
  const abertas = metas.filter((meta) => {
    return meta.checked != true
  })


  if(abertas.length == 0){
    mensagem = "Não Existem metas abertas"
    return
  }


  await select({
    message: "Metas Abertas : " + abertas.length,
    choices: [...abertas]
  })

}

//Apagar metas
const deletarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) =>{
    return {value: meta.value, checked: false}
  })



  const itemsADeletar = await checkbox({
    message: "Selecione os Itens para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  })


  if(itemsADeletar.length == 0){
    mensagem = "Nenhum item para deletar!"
    return
  }

  itemsADeletar.forEach((item) => {
    metas = metas.filter((meta) =>{
      return meta.value != item
    })
  })

  mensagem = "Meta(s) Deletada(s) com sucesso!"
}


//Limpar log
const mostrarMensagem = () => {
  console.clear();

  if(mensagem != ""){
    console.log(mensagem)
    console.log("")
    mensagem = ""
  }
}


//Start
const start = async() => {
  

  
  while(true){

    mostrarMensagem();

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar"
        },
        {
          name: "Listar metas",
          value: "listar"
        },
        {
          name: "Metas Realizadas",
          value: "realizadas"
        },
        {
          name: "Metas Abertas",
          value: "abertas"
        },
        {
          name: "Deletar Metas",
          value: "deletar"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })


    switch(opcao){
      case "cadastrar":
        await cadastrarMeta()
        console.log(metas)
        break
      case "listar":
        await listarMetas()
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "abertas":
        await metasAbertas()
        break
        case "deletar":
          await deletarMetas()
          break
      case "sair":
        console.log("Até a próxima!")
        return
    }
  }
}

start()