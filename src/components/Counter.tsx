import { useState } from "react";
// import './Counter.module.scss';
// import styles from './Counter.module.scss';

function Counter() {
    const [count, setCount] = useState(0);
    // console.log('styles', styles);

    const increment = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            {/* <button className={styles.button} onClick={increment}>increment</button> */}
            <button className='button' onClick={increment}>increment</button>
        </div>
    )
}

export default Counter;