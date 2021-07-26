import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST'){

        const TOKEN = '48e47844eed698c42de1947e9a13c2'

     const client = new SiteClient(TOKEN)
     //validar dados, antes de sair cadastrando
     const registroCriado = await client.items.create({
        
        itemType: "990812",
        ...request.body,
        //title:"Comunidades de Teste",
        //imageUrl: "https://github.com/Ewerson2.png",
       // creatorSlug: "Ewerson"
    })

    console.log(registroCriado)
    response.json({

        dados: 'Algum dado qualquer',
        registroCriado: registroCriado,
    })
    }  

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}