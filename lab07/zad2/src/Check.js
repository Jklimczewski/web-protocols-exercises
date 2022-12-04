import Cookies from './js-cookie/js.cookie.mjs'
import Form from './Form.js';

const Check = () => {
    const cookie = Cookies.get();
    
    if ( JSON.stringify(cookie) !== '{}') {
        const name = Object.keys(cookie);
        const value = cookie[name];
        const incr = parseInt(value) + 1;
        Cookies.set(name, incr.toString());
        const handleReset = () => {
            Cookies.remove(name);
            window.location.reload();
        }
        return (
            <div>
                <h2>Witaj {name}, odwiedziłeś naszą stronę {value} razy.</h2>
                <button type='reset' onClick={handleReset} >Reset</button>
            </div>
            
        );
    }
    else {
        return (
            <div>
                <Form/>
            </div>
        );
    }
}

export default Check;