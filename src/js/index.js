import { getUser } from './services/user.js'
import { getRepositories } from './services/repositories.js'
import { getEvents } from './services/events.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
  const userName = document.getElementById('input-search').value
  if (validateEmptyInput(userName)) return
  getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
  const userName = e.target.value
  const key = e.which || e.keyCode
  const isEnterKeyPressed = key === 13
  if (isEnterKeyPressed) {
    if (validateEmptyInput(userName)) return
    getUserData(userName)
  }
})

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert('Preencha o campo com nome de usuário do GitHub')
    return true
  }
}

async function getUserData(userName) {

  const userResponse = await getUser(userName)

  if(userResponse.message === "Not Found"){
    screen.renderNotFaound()
    return
  }
  const repositoriesResponse = await getRepositories(userName)
  const eventsReponse = await getEvents(userName)

  user.setInfo(userResponse)
  user.setRepositories(repositoriesResponse)

  screen.renderUser(user, eventsReponse)
}