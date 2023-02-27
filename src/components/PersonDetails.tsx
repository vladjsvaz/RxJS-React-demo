import { useEffect } from "react";

export interface PersonDetailsProps {
    id: number;
    name: string;
}

const PersonDetails = ({ id, name }: PersonDetailsProps) => {
    return (
        <div key={`person-detail-${id}`} className="card card-side w-96 text-primary-content bg-base-200 shadow-xl mt-2 mb-2 p-4">
            <div className="avatar">
                <div className="w-24 mask mask-squircle bg-primary">
                    <figure><img src={`https://robohash.org/${name}.png?set=set4&size=100x100`} alt={`${name}-image`} /></figure>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
            </div>
        </div>
    );
};

export default PersonDetails;