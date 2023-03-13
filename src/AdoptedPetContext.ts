import { createContext } from "react";
import { IPet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[IPet | null, (adoptedPet: IPet) => void | null]>([
    {
        id: 1337,
        name: "Bob",
        animal: "dog",
        breed: "shepperd",
        city: "Rio de Janeiro",
        description: "lipsum",
        images: [],
        state: "Rio de Janeiro"
    },
    () => {},
]);

/* const AdoptedPetContext = createContext<[IPet, (adoptedPet: IPet) => void] | null>(null); */

export default AdoptedPetContext;
