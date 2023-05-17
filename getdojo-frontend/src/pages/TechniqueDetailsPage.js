import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../services/api.service";
import EditTechnique from "./EditTechnique";




function TechniqueDetailsPage (props) {
  const [technique, setTechnique] = useState(null);
  const { techniqueId } = useParams();


  
  
  const getTechnique = () => {

    

    service.getTechnique(techniqueId)    
      .then((response) => {
        const oneTechnique = response.data;
        setTechnique(oneTechnique);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getTechnique();
  }, [] );

  
  return (
    <div className="techniqueDetails">
      {technique && (
        <>
          <h1>{technique.title}</h1>
          <p>{technique.description}</p>
        </>
      )}

      
      <EditTechnique refreshTechnique={getTechnique} techniqueId={techniqueId} />          


      <Link to="/techniques">
        <button>Back to Techniques</button>
      </Link>
          
      <Link to={`/techniques/edit/${techniqueId}`}>
        <button>Edit Technique</button>
      </Link>
      
    </div>
  );
}

export default TechniqueDetailsPage;