import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  return (
    <div>
      {" "}
      <Button variation="primary" size="medium" onClick={() => setIsOpenModel((show) => !show)}>
        add new cabin
      </Button>
      {isOpenModel && <Modal onClose={()=>setIsOpenModel(false)}><CreateCabinForm onCloseModel={()=>setIsOpenModel(false)}/></Modal>}
    </div>
  );
}
