import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {

  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={'https://github.com/${propriedades.githubUser}'} target="_blank">
          @{propriedades.githubUser}

        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
     {propriedades.title} ({propriedades.items.length})
    </h2>
    <ul>
      {/* {seguidores.map((itemAtual) => {
        return (
          <li key={itemAtual}>
            <a href={`https://${itemAtual}.png`}>
              <img src={itemAtual.image} />
              <span>{itemAtual.title}</span>
            </a>
          </li>
        )
      })} */}
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'Ewerson2';
  const [comunidades, setComunidades] = React.useState([{
    id: '123451245865324865416543286537423413',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }, {
    id: '12345124586532486541653413',
    title: 'Eu nunca morri na minha vida',
    image: 'https://thumbs.jusbr.com/imgs.jusbr.com/publications/images/7bdae7b48bd8a4152e980dbd227ed78c'
  }, {
    id: '12345124586532483413',
    title: 'Velhos que parecem velhas',
    image: 'https://img10.orkut.br.com/community/83ff9554cc363be72cc76fe07a7695cd.jpg'
  }, {
    id: '12345124586696332483413',
    title: 'Herrar é o mano',
    image: 'https://i2.wp.com/cinemacao.com/wp-content/uploads/2014/12/Will-Smith-Young.jpg?ssl=1'
  }, {
    id: '1234467775124586696332483413',
    title: 'Tenho medo do zé gotinha',
    image: 'https://i.pinimg.com/736x/49/03/79/490379512b3d5d0fa33365bf1ad11ab8.jpg'
  }, {
    id: '1234467775124552341286696332483413',
    title: 'Vodka connecting people',
    image: 'https://lh3.googleusercontent.com/proxy/IEG_bcenardYDvhdg0POd4HutqJ2zVoit8zvb-WOrwUOSI1_dHbPXmZ5hOt-wv1Ou7Jib9qj3EvgsT0BxNrAZOe4Up0Hve5_Zw0WNkW2vyBXzkQwdQPe8gERppRQV6SHpBUq__56_1bkwI4p'
  }]);
  // const comunidades = ['Eu odeio acordar cedo', 'Alurakut'];
  const pessoasFavoritas = ['juunegreiros',
    'omariosouto',
    'renelcm',
    'vinivilares',
    'GuilhermeMontez',
    'peas']
  const [seguidores , setSeguidores] = React.useState([]);
  //0 - pegar p array de dados do github
    React.useEffect(function(){
       fetch('https://api.github.com/users/Ewerson2/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json()
    })
    .then(function (respostaCompleta) {
    setSeguidores(respostaCompleta)
    })
    }, [])

  return (
    <div>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) {githubUser}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target)

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')

              }

              // comunidades.push('Alura Stars')
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual cai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input placeholder="Coloque uma URl para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URl para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>


          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} >
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

        </div>
      </MainGrid>
    </div>
  )
}