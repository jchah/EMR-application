// store/user.js
import AuthService from '@/services/AuthService'; // Assuming AuthService is imported and available

export default {
    state: {
        user: null, // Initial user state
        isLoggedIn: false, // Tracks the login status
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isLoggedIn = !!user;
        },
        clearUser(state) {
            state.user = null;
            state.isLoggedIn = false;
        }
    },
    actions: {
        async loginUser({ commit }, credentials) {
            try {
                // Call AuthService to authenticate the user
                const resp = await AuthService.login(credentials);
                const token = resp.token;
                // Decode the token to extract user information
                const user = AuthService.decodeToken(token);

                // Upon successful authentication, commit the setUser mutation
                commit('setUser', user);

                // Optionally, store the token in local storage or a cookie for persistent login
                localStorage.setItem('token', token);

                console.log('User logged in:', user.email);
            } catch (error) {
                // Handle authentication errors
                console.error('Failed to log in:', error);
                throw error;
            }
        },
        logoutUser({ commit }) {
            // Remove the token from local storage
            localStorage.removeItem('token');
            
            // Commit the clearUser mutation to reset the user state
            commit('clearUser');
        },
        rehydrateAuthenticationState({ commit }) {
            const token = localStorage.getItem('token');
            if (token) {
                // Decode the token to get the user info
                const user = AuthService.decodeToken(token);
                // Update the Vuex state with the decoded user info
                commit('setUser', user);
            } else {
                // If no token is found, clear the user state
                commit('clearUser');
            }
        }
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        currentUser: (state) => state.user,
    }
};
