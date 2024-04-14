import { useState } from "react";
import * as styles from './Counter.module.scss';
// import { button, green } from './Counter.module.scss'; 

function Counter() {
    const [count, setCount] = useState(0);
    console.log('styles', styles);

    const increment = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button className={styles.button} onClick={increment}>increment</button>
        </div>
    )
}

export default Counter;