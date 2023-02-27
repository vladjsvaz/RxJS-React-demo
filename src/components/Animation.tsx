import { useEffect, useState } from "react";

import { animationFrames, map, scan } from "rxjs";

const animation = animationFrames().pipe(
    scan((time) => time + 0.1, 0),
    map((time) => ([Math.sin(time) + 1, Math.cos(time) + 1])),
    map(([x, y]) => ([x * 100, y * 100]))
);


const Animation = () => {
    const [ballPos, setBallPos] = useState<[number, number]>([0, 0]);

    useEffect(() => {
            const subscription =
                animation
                    .subscribe(([x, y]) => setBallPos([x, y]));
            return () => 
                subscription.unsubscribe();
    }, []);

    return (
        <div className="prose h-20">
            <h1>Animation</h1>

            <h3>Explanation</h3>
            <p>This example uses animation frames to control the position of an element.</p>

            <h3>Objective</h3>
            <p>Demonstrate that Observables can be created and transformed from a variety of sources, with different goals in mind.</p>

            <h3>Example</h3>

            <div className="relative h-20">
            <div className="rounded-full w-3 h-3 bg-slate-400" 
                style={{
                    position: "absolute", 
                    top: `${ballPos[1]}px`, 
                    left: `${ballPos[0]}px`
                }}></div></div>
        </div >
    );
};

export default Animation;