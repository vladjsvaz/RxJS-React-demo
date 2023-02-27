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
        <div className="prose h-20 relative">
            <div className="rounded-full w-3 h-3 bg-slate-400" 
                style={{
                    position: "absolute", 
                    top: `${ballPos[1]}px`, 
                    left: `${ballPos[0]}px`
                }}></div>
        </div >
    );
};

export default Animation;