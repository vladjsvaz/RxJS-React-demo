import { concatMap, delay, from, of, take } from "rxjs";

function* fibonacci() {
    let i0 = 1;
    let i1 = 1;
    while (true) {
        yield i1;
        const aux = i1;
        i1 = i0 + i1;
        i0 = aux;
    }
}

export const fibonacciStream = (total: number) =>
    from(fibonacci())
        .pipe(
            take(total),
            concatMap(v => of(v)
                .pipe(delay(200))
            )
        );
