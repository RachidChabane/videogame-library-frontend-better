import type {Handle} from "@sveltejs/kit";
import type {User} from "$lib/types/user/user";
import {parseFormData} from 'parse-nested-form-data'

// Middleware pour vérifier si l'utilisateur est connecté
// TODO : compléter/corriger
const auth: Handle = async ({event, resolve})=> {
    // récupérer les cookies du navigateur
    const session = event.cookies.get('session')

    if (!session) {
        // si pas de session, charger la page sans user
        return resolve(event)
    }

    // TODO : get l'utilisateur connecté via le bon service
    const user : User = {
        username: 'user',
        email: '',
        roles: ['ROLE_USER']
    }

    // Si "user" existe, on set "event.locals" avec les infos de l'utilisateur
    // Par ailleurs, on a ajouté un type global "Locals" qui contient un user dans app.d.ts
    if (user) {
        event.locals.user = user
    }
    return resolve(event);
}

const parseForm: Handle = async ({event, resolve})=> {
    // listen to "POST" and "PUT" requests
    if (event.request.method === 'POST' || event.request.method === 'PUT') {
        // get the form data from the request
        const formData = await event.request.formData()

        // parse the form data into a JSON object
        // make it available inside `actions`
        event.locals.formData = parseFormData(formData)
    }

    return resolve(event)
}

export const handle = {auth, parseForm}