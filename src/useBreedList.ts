// import { QueryStatus, useQuery } from "@tanstack/react-query";
import { Animal } from "./APIResponsesTypes";
// import fetchBreedList from "./fetchBreedList";

import { useGetBreedsQuery } from "./petApiService";

export default function useBreedList(animal: Animal) {
  // const results = useQuery(["breed", animal], fetchBreedList);
  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  if(!animal){
    return [[], "loaded"];
  }

  return [breeds ?? [], isLoading ? "loading" : "loaded"];

  // return [results?.data?.breeds ?? [], results.status] as [
  //   string[],
  //   QueryStatus
  // ];
}