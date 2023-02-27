import { useEffect, useState } from "react";
import { fibonacciStream } from "../utils/fibonacci";

const MIN = 1;
const MAX = 10;

const sliderMarks = () => {
    let res: JSX.Element[] = [];
    for (let i = MIN; i <= MAX; i++) {
        res = [...res, <span key={`sliderMark${i}`}>{i}</span>];
    }
    return res;
};

const Fibonacci = () => {
    const [amount, setAmount] = useState(1);
    const [values, setValues] = useState<number[]>([]);

    useEffect(() => {
        const subscription =
            fibonacciStream(amount)
                .subscribe({
                    next: v => setValues(values => [...values, v]),
                    error: e => console.error(e),
                    complete: () => console.log('Completed!')
                });
        return () => {
            setValues([]);
            subscription.unsubscribe();
        };
    }, [amount]);

    return (
        <div className="prose">
            <h1>Fibonacci sequence</h1>

            <h3>Explanation</h3>
            <p>An Observable can be described as a stream of data. In this example we generate the Fibonacci sequence as a stream of values emitted in intervals of <code>200 ms</code>.</p>

            <h3>Objective</h3>
            <p>Show how to use RxJS in a React component, using the <code>useEffect</code> and <code>useState</code> hooks.</p>

            <h3>Example</h3>
            <p>Chose how many numbers of the Fibonacci sequence you want to display:</p>
            <input type="range" min={MIN} max={MAX} value={amount} className="range range-xs range-accent" step="1" onChange={(evt) => setAmount(Number(evt.target.value) ?? 1)} />
            <div className="w-full flex justify-between text-xs px-2">
                {sliderMarks()}
            </div>

            <h3>The first {amount} numbers of the Fibonacci sequence are:</h3>
            <div>
                <ul className='steps'>
                    {
                        values.map(v =>
                            <li
                                key={v.toString()}
                                className='step step-primary'
                                data-content='●'>
                                {v}
                            </li>
                        )
                    }
                </ul>
            </div>
        </div >
    );
};

export default Fibonacci;