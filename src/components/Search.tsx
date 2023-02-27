import { useEffect, useMemo, useState } from "react";
import { BehaviorSubject, concatMap, debounceTime, tap } from "rxjs";
import { mockedServer, Packer } from "../utils/mockedServer";
import PersonDetails from "./PersonDetails";

const Search = () => {
    const [searchParam, setSearchParam] = useState<string>('');
    const [results, setResults] = useState<Packer[]>([]);
    const search$ = useMemo(() => new BehaviorSubject(""), []);

    useEffect(() => {
        const subscription =
            search$
                .pipe(
                    tap(v => console.log('=> ', v)),
                    debounceTime(1000),
                    tap(v => console.log('* => ', v)),
                    concatMap(mockedServer)
                )
                .subscribe(setResults);

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        search$.next(searchParam);
    }, [searchParam]);

    return (
        <div className="prose">
            <h1>Debounced search</h1>

            <h3>Explanation</h3>
            <p>There is a debounce of <code>1000 ms</code>, every time a key is pressed. If after that time no other key is pressed, then a request is made to the server to fetch the results.
            </p>

            <h3>Objective</h3>
            <p>This way, we can reduce the amount of requests made to the server while the user is typing.</p>

            <h3>Example</h3>
            <p>Search for a Packers colleague name in the input field below.</p>
            <input
                type="text"
                placeholder="Search Packers members"
                className="input input-bordered input-md input-accent w-full max-w-xs"
                value={searchParam}
                onChange={evt => setSearchParam(evt.target.value)}
            />

            <ul className="list-none p-0">
                {results.map(r => <li key={r.id}>
                    <PersonDetails id={r.id} name={r.name} />
                </li>)}
            </ul>
        </div >
    );
};

export default Search;