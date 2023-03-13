import { useNavigate, useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import { useState, lazy } from "react";
import { useDispatch } from "react-redux";
import { adopt } from "./adoptedPetSlice";
// import AdoptedPetContext from "./AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary"; 
// import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import { useGetPetQuery } from "./petApiService";

const Modal = lazy(() => import('./Modal'));

const Details = () => {
  const { id } = useParams();

  if(!id){
    throw new Error('Why did you not give me and id? I wanted an id.');
  }

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { isLoading, data: pet } = useGetPetQuery(id);
  // const results = useQuery(["details", id], fetchPet);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const dispatch = useDispatch();

  // if (results.isLoading) {
  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  // const pet = results?.data?.pets[0];


  if(!pet){
    throw new Error('No pet found.');
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(adopt(pet));
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      {/* <Details {...props} /> */}
      <Details />
    </ErrorBoundary>
  );
}
