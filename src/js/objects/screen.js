const screen = {
  userProfile: document.querySelector('.profile-data'),

  abreviarNumero(numero) {
    if (numero >= 1_000_000) {
      return (numero / 1_000_000).toFixed(1).replace('.0', '') + 'M';
    } else if (numero >= 1_000) {
      return (numero / 1_000).toFixed(1).replace('.0', '') + 'K';
    } else {
      return numero.toString();
    }
  },

  renderUser(user, events) {
    this.userProfile.innerHTML = `<div class="info">
                                  <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                  <div class="data">
                                    <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                    <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</P><br>
                                    <p>
                                      <i class="fas fa-user-friends"></i> 
                                      ${this.abreviarNumero(user.followers)} followers &nbsp 
                                      ${this.abreviarNumero(user.following)} following
                                    </p>
                                  </div>
                                </div>`

    let repositoriesItens = ''
    user.repositories.forEach(repo => 
      repositoriesItens += `<li>
                              <a href="${repo.html_url}" target="_blank">
                                <strong>${repo.name}</strong>
                                <div class="repo-box">
                                  <div>
                                    🍴 ${this.abreviarNumero(repo.forks_count)}
                                  </div>
                                  <div>
                                    ⭐ ${this.abreviarNumero(repo.stargazers_count)}
                                  </div>
                                  <div>
                                    👀 ${this.abreviarNumero(repo.watchers_count)} 
                                  </div>
                                  <div>
                                    🎆 ${repo.language ?? ''}
                                  </div>
                                </div>
                              </a>
                            </li>`)

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                        <h2>Repositório</h2>
                                        <ul>${repositoriesItens}</ul>
                                     </div>`
    }

     let eventsHtml = '<div class="events"><h2>Eventos</h2><ul>'
     const filteredEvents = events.filter(event => event.type === 'PushEvent' || event.type === 'CreateEvent').slice(0, 10)
 
     filteredEvents.forEach(event => {
       if (event.type === 'PushEvent') {
         eventsHtml += `<li>
                          <span>${event.repo.name}</span>${event.payload.commits.length < 0 ? event.payload.commits[0].message: '  -Update README.md'}
                        </li>`
       } else if (event.type === 'CreateEvent') {
         eventsHtml += `<li>
                          <span>${event.repo.name}</span>
                        </li>`
       }
     })
 
     eventsHtml += '</ul></div>'
 
     this.userProfile.innerHTML += eventsHtml
  },

  renderNotFaound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
  }
  
}

export { screen }