import React, {useState,useCallback} from 'react';
import { BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import Users from './Users/pages/Users'
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from '../src/Users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import UserPlace from './places/pages/UserPlaces';
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const login = useCallback((uid) => {
        setIsLoggedIn(true);
        setUserId(uid);
    }, []);
    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
    }, [])
    let routes;
    if (isLoggedIn) {
        routes = (
            <Switch>
                <Route path='/' exact>
                    <Users />
                </Route>
                <Route path='/:userId/places' exact>
                    <UserPlace />
                </Route>
                <Route path='/places/new' exact>
                    <NewPlace />
                </Route>
                <Route path='/places/:placeId'>
                    <UpdatePlace />
                </Route>
                <Redirect to='/' />
            </Switch>
        );
    }
    else {
        routes = (
            <Switch>
                <Route path='/' exact>
                    <Users />
                </Route>
                <Route path='/:userId/places' exact>
                    <UserPlace />
                </Route>
                <Route path='/auth'>
                    <Auth />
                </Route>
                <Redirect to='/auth'/>
            </Switch>
        );
    }
    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn,userId:userId, login: login, logout: logout}}>
            <Router>
            <MainNavigation />
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
