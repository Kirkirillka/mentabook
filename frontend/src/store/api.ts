import axios from 'axios'
import { UserSubmit, User, EventItem, UserSignUp } from './models'
import users from './modules/users'
import router from '@/router'
import events from './modules/events'
import dialogs from './modules/dialogs'

export const axs = axios.create({
    baseURL:  'http://localhost:8000',
    // baseURL: process.env.API_URL + '/',
	headers: {
		'Content-Type': 'application/json',
        'Accept': 'application/json',
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE',
    //     'Access-Control-Allow-Credentials': true
	}
})


// axs.interceptors.request.use(
//     config => {

//         if (!(users.dialogLogin || users.dialogSignUp)) {
//             if (!config.headers['Authorization']) {
//                 const accessToken = users.user?.access  
//                 if (accessToken) {
//                     config.headers['Authorization'] = 'Bearer ' + accessToken
//                 } else {    
//                     delete config.headers['Authorization']
//                     if (!users.dialogLogin) { users.openDialogLogin() }
//                 }
//             } 
//         }

//         return config
//     }
// )

// axs.interceptors.response.use((response) => {
//     return response
// }, function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401
//         // && originalRequest.url ===
//         // 'http://127.0.0.1:8000/api/token/'
//     ) {
//         console.log('401');
        
//         // localStorageService.clearToken();
//         // router.push('/login');
//         return Promise.reject(error);
//     }

//     // const refreshToken = localStorageService.getRefreshToken();
//     // if (error.response.status === 401 && refreshToken && refreshToken !== 'undefined') {
//     //     console.log('retry');
//     //
//     //     return AXIOS.post('/token/refresh/',
//     //         {
//     //             "refresh": refreshToken
//     //         })
//     //         .then(function (res) {
//     //             if (res.status === 201 || res.status === 200) {
//     //                 localStorageService.setToken(res.data);
//     //                 AXIOS.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
//     //                 return AXIOS(originalRequest);
//     //             }
//     //         })
//     //         .catch(function (err) {
//     //             localStorageService.clearToken();
//     //             router.push('/login')
//     //         })
//     // }
//     // localStorageService.clearToken();
//     // router.push('/login');
//     return Promise.reject(error);
// });


export function loginUser(user: UserSubmit) {
    return axs.post('/token/', user)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

export async function loadEvents(params: string) {

    return axs.get('/events/?' + params, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        return response.data
    }).catch(err => {
        return []
    })
}

export async function updateEvent(id: number, ev: object) {
    
    return axs.put(`/events/${id}/`, ev, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        return response.data as EventItem
    }).catch(err => {
        return Promise.reject(err.response.data)
    })
}



export async function createEvent(ev: object) {
    
    return axs.post(`/events/`, ev, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        return response.data
         
    }).catch(err => {
        console.log('err', err);
        return Promise.reject(err.response.data)
    })
}


export async function deleteEvent(id: number) {

    return axs.delete(`/events/${id}/`, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        return response
    })
}


export async function signUp(userSignUp: UserSignUp) {

    return axs.post(`/signup/`, userSignUp).then(response => {
        return response.data
    }).catch(err => {
        return Promise.reject(err.response.data)
    })
}
