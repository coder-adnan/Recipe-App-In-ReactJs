import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let params = useParams();
  const [details, setDetails] = useState();
  const [activeTab, setActiveTab] = useState("instruction");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=e9e2fb35b721483086cb426495125c56`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      {details && (
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} alt="" />
        </div>
      )}
      <Info>
        <Buttons>
          <Button
            className={activeTab === "instruction" ? "active" : ""}
            onClick={() => setActiveTab("instruction")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </Buttons>
        {activeTab === "instruction" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details?.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: details?.instructions }}></p>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map(ingredient => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    font-size: 1.5rem;
  }
  li {
    font-size: 1rem;
    line-height: 1.5rem;
  }
  ul {
    margin-top: 1rem;
  }
`;
const Buttons = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
  padding-right: 0;
  div {
    width: 100%;
    p {
      font-size: 0.9rem;
      line-height: 1rem;
      text-align: justify;
      ol {
        margin-top: 1rem;
        li {
          font-size: 0.9rem;
          line-height: 1rem;
        }
      }
    }
  }
`;

export default Recipe;
