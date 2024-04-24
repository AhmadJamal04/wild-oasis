import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    getCabins()
      .then((data) => {
        console.log(data);
        const imageUrl = data[0].image;
        console.log(imageUrl)
        setUrl(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching cabin data:", error);
      });
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src={url} alt="cabin img" />
    </Row>
  );
}

export default Cabins;
